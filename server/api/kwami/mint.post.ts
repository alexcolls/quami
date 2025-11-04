import { defineEventHandler, readBody, createError } from 'h3';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { calculateKwamiDNA, type KwamiDNAConfig } from '~/app/utils/kwami/calculateKwamiDNA';
import { prepareKwamiMetadata, type PrepareKwamiMetadataInput } from '~/app/utils/kwami/prepareKwamiMetadata';
import { uploadCompleteKwamiNFT, initializeMetaplex } from '~/solana/metaplex/utils/uploadToArweave';
import type { MindConfig, SoulConfig } from '@kwami';

/**
 * Request body for minting a Kwami NFT
 */
interface MintKwamiRequest {
  walletAddress: string;
  body: KwamiDNAConfig;
  mind?: Partial<MindConfig>;
  soul?: Partial<SoulConfig>;
  name: string;
  description?: string;
  glbData: string; // Base64 encoded GLB
  thumbnailData: string; // Base64 encoded thumbnail
}

/**
 * Response from mint endpoint
 */
interface MintKwamiResponse {
  success: boolean;
  mint?: string;
  dna?: string;
  metadataUri?: string;
  transaction?: string;
  error?: string;
}

/**
 * POST /api/kwami/mint
 * 
 * Mint a new Kwami NFT with DNA validation and Arweave storage
 */
export default defineEventHandler(async (event): Promise<MintKwamiResponse> => {
  try {
    const config = useRuntimeConfig();
    const body = await readBody<MintKwamiRequest>(event);

    // Validate request
    if (!body.walletAddress || !body.body || !body.name) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: walletAddress, body, name',
      });
    }

    if (!body.glbData || !body.thumbnailData) {
      throw createError({
        statusCode: 400,
        message: 'Missing asset data: glbData, thumbnailData',
      });
    }

    console.log('🚀 Starting Kwami NFT mint process...');
    console.log(`   Wallet: ${body.walletAddress}`);
    console.log(`   Name: ${body.name}`);

    // Step 1: Calculate DNA
    console.log('🧬 Calculating DNA...');
    const dna = calculateKwamiDNA(body.body);
    console.log(`   DNA: ${dna.substring(0, 16)}...`);

    // Step 2: Check DNA uniqueness
    console.log('🔍 Checking DNA uniqueness...');
    const connection = new Connection(config.public.RPC_URL);
    
    // Load program
    const programId = new PublicKey(config.public.KWAMI_NFT_PROGRAM_ID);
    const serverWallet = Keypair.fromSecretKey(
      Buffer.from(JSON.parse(config.SOLANA_WALLET_PRIVATE_KEY))
    );
    
    const provider = new AnchorProvider(
      connection,
      new Wallet(serverWallet),
      { commitment: 'confirmed' }
    );

    // Load IDL (you'll need to import this)
    const idlPath = process.cwd() + '/solana/anchor/kwami-nft/target/idl/kwami_nft.json';
    const idl = await import(idlPath);
    const program = new Program(idl.default, programId, provider);

    // Find DNA registry PDA
    const collectionMint = new PublicKey(config.public.KWAMI_COLLECTION_MINT);
    const [dnaRegistry] = await PublicKey.findProgramAddress(
      [Buffer.from('dna-registry'), collectionMint.toBuffer()],
      programId
    );

    // Check if DNA exists
    const dnaHashBytes = Buffer.from(dna, 'hex');
    const dnaExists = await program.methods
      .checkDnaExists(Array.from(dnaHashBytes))
      .accounts({ dnaRegistry })
      .view();

    if (dnaExists) {
      throw createError({
        statusCode: 409,
        message: 'DNA already exists. This Kwami configuration is already minted.',
      });
    }

    console.log('✅ DNA is unique');

    // Step 3: Upload to Arweave
    console.log('📤 Uploading assets to Arweave...');
    
    const glbBuffer = Buffer.from(body.glbData, 'base64');
    const thumbnailBuffer = Buffer.from(body.thumbnailData, 'base64');

    // Prepare metadata (without URIs yet)
    const metadataInput: PrepareKwamiMetadataInput = {
      name: body.name,
      description: body.description,
      creatorWallet: body.walletAddress,
      dna,
      body: body.body,
      mind: body.mind,
      soul: body.soul,
      imageUri: '', // Will be filled by upload
      glbUri: '',   // Will be filled by upload
    };

    const metadata = prepareKwamiMetadata(metadataInput);

    // Upload to Arweave
    const arweaveWallet = Keypair.fromSecretKey(
      Buffer.from(JSON.parse(config.ARWEAVE_WALLET || config.SOLANA_WALLET_PRIVATE_KEY))
    );

    const uploadResult = await uploadCompleteKwamiNFT(
      {
        rpcUrl: config.public.RPC_URL,
        walletKeypair: arweaveWallet,
      },
      glbBuffer,
      thumbnailBuffer,
      metadata
    );

    if (!uploadResult.success || !uploadResult.uri) {
      throw createError({
        statusCode: 500,
        message: `Arweave upload failed: ${uploadResult.error}`,
      });
    }

    console.log(`✅ Uploaded to Arweave: ${uploadResult.uri}`);

    // Step 4: Create mint transaction
    console.log('💎 Creating NFT mint transaction...');
    
    const mintKeypair = Keypair.generate();
    const userWallet = new PublicKey(body.walletAddress);

    // Find PDAs
    const [collectionAuthority] = await PublicKey.findProgramAddress(
      [Buffer.from('collection-authority'), collectionMint.toBuffer()],
      programId
    );

    const [kwamiNft] = await PublicKey.findProgramAddress(
      [Buffer.from('kwami-nft'), mintKeypair.publicKey.toBuffer()],
      programId
    );

    // Find Metaplex metadata PDA
    const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    const [metadata] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        METADATA_PROGRAM_ID.toBuffer(),
        mintKeypair.publicKey.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );

    // Create mint instruction
    const tx = await program.methods
      .mintKwami(
        Array.from(dnaHashBytes),
        body.name,
        'KWAMI',
        uploadResult.uri
      )
      .accounts({
        mint: mintKeypair.publicKey,
        kwamiNft,
        collectionAuthority,
        dnaRegistry,
        metadata,
        owner: userWallet,
        metadataProgram: METADATA_PROGRAM_ID,
        systemProgram: PublicKey.default,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: PublicKey.default,
      })
      .signers([mintKeypair])
      .transaction();

    // Serialize transaction for client signing
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    console.log('✅ Mint transaction created');

    // Step 5: Store in database
    console.log('💾 Storing NFT data...');
    
    // TODO: Store in Supabase
    // const { data, error } = await supabase
    //   .from('kwami_nfts')
    //   .insert({
    //     mint: mintKeypair.publicKey.toBase58(),
    //     owner: body.walletAddress,
    //     dna,
    //     name: body.name,
    //     metadata_uri: uploadResult.uri,
    //     body_config: body.body,
    //     mind_config: body.mind,
    //     soul_config: body.soul,
    //   });

    return {
      success: true,
      mint: mintKeypair.publicKey.toBase58(),
      dna,
      metadataUri: uploadResult.uri,
      transaction: serializedTx.toString('base64'),
    };
  } catch (error: any) {
    console.error('❌ Mint failed:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to mint Kwami NFT',
    };
  }
});

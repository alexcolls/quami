import { defineEventHandler, readBody, createError } from 'h3';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { calculateKwamiDNA, type KwamiDNAConfig } from '~/app/utils/kwami/calculateKwamiDNA';
import { prepareKwamiMetadata } from '~/app/utils/kwami/prepareKwamiMetadata';
import { uploadJsonToArweave, initializeMetaplex } from '~/solana/metaplex/utils/uploadToArweave';
import type { MindConfig, SoulConfig } from '@kwami';

/**
 * Request body for updating Kwami NFT
 */
interface UpdateKwamiRequest {
  mint: string;
  walletAddress: string;
  body: KwamiDNAConfig;
  mind?: Partial<MindConfig>;
  soul?: Partial<SoulConfig>;
  name?: string;
  description?: string;
}

/**
 * Response from update endpoint
 */
interface UpdateKwamiResponse {
  success: boolean;
  needsBurnRemint: boolean;
  metadataUri?: string;
  transaction?: string;
  error?: string;
  message?: string;
}

/**
 * POST /api/kwami/update
 * 
 * Update Kwami NFT metadata
 * - If body changes (DNA different): requires burn-and-remint
 * - If only mind/soul changes: just update metadata
 */
export default defineEventHandler(async (event): Promise<UpdateKwamiResponse> => {
  try {
    const config = useRuntimeConfig();
    const body = await readBody<UpdateKwamiRequest>(event);

    // Validate request
    if (!body.mint || !body.walletAddress || !body.body) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: mint, walletAddress, body',
      });
    }

    console.log('🔄 Starting Kwami NFT update process...');
    console.log(`   Mint: ${body.mint}`);
    console.log(`   Wallet: ${body.walletAddress}`);

    const connection = new Connection(config.public.RPC_URL);
    const programId = new PublicKey(config.public.KWAMI_NFT_PROGRAM_ID);
    
    // Load program
    const serverWallet = Keypair.fromSecretKey(
      Buffer.from(JSON.parse(config.SOLANA_WALLET_PRIVATE_KEY))
    );
    
    const provider = new AnchorProvider(
      connection,
      new Wallet(serverWallet),
      { commitment: 'confirmed' }
    );

    const idlPath = process.cwd() + '/solana/anchor/kwami-nft/target/idl/kwami_nft.json';
    const idl = await import(idlPath);
    const program = new Program(idl.default, programId, provider);

    // Get current NFT data
    const mintPubkey = new PublicKey(body.mint);
    const [kwamiNft] = await PublicKey.findProgramAddress(
      [Buffer.from('kwami-nft'), mintPubkey.toBuffer()],
      programId
    );

    const nftAccount = await program.account.kwamiNft.fetch(kwamiNft);
    
    // Verify ownership
    if (nftAccount.owner.toBase58() !== body.walletAddress) {
      throw createError({
        statusCode: 403,
        message: 'You do not own this Kwami NFT',
      });
    }

    // Step 1: Calculate new DNA
    console.log('🧬 Calculating new DNA...');
    const newDna = calculateKwamiDNA(body.body);
    const currentDna = Buffer.from(nftAccount.dnaHash).toString('hex');

    console.log(`   Current DNA: ${currentDna.substring(0, 16)}...`);
    console.log(`   New DNA:     ${newDna.substring(0, 16)}...`);

    // Step 2: Check if DNA changed
    const dnaChanged = newDna !== currentDna;

    if (dnaChanged) {
      console.log('⚠️  DNA changed - burn-and-remint required');
      
      // Check if new DNA is unique
      const collectionMint = new PublicKey(config.public.KWAMI_COLLECTION_MINT);
      const [dnaRegistry] = await PublicKey.findProgramAddress(
        [Buffer.from('dna-registry'), collectionMint.toBuffer()],
        programId
      );

      const dnaHashBytes = Buffer.from(newDna, 'hex');
      const dnaExists = await program.methods
        .checkDnaExists(Array.from(dnaHashBytes))
        .accounts({ dnaRegistry })
        .view();

      if (dnaExists) {
        throw createError({
          statusCode: 409,
          message: 'New DNA already exists. Cannot change to this configuration.',
        });
      }

      return {
        success: true,
        needsBurnRemint: true,
        message: 'Body configuration changed. Please burn and remint with new DNA.',
      };
    }

    // Step 3: Only mind/soul changed - update metadata
    console.log('✅ DNA unchanged - updating metadata only');

    // Prepare new metadata
    const metadataInput = {
      name: body.name || nftAccount.mint.toBase58(),
      description: body.description,
      creatorWallet: body.walletAddress,
      dna: currentDna,
      body: body.body,
      mind: body.mind,
      soul: body.soul,
      imageUri: '', // Preserve existing
      glbUri: '',   // Preserve existing
    };

    const metadata = prepareKwamiMetadata(metadataInput);

    // Upload new metadata to Arweave
    console.log('📤 Uploading new metadata to Arweave...');
    
    const arweaveWallet = Keypair.fromSecretKey(
      Buffer.from(JSON.parse(config.ARWEAVE_WALLET || config.SOLANA_WALLET_PRIVATE_KEY))
    );

    const metaplex = initializeMetaplex({
      rpcUrl: config.public.RPC_URL,
      walletKeypair: arweaveWallet,
    });

    const uploadResult = await uploadJsonToArweave(metaplex, metadata);

    if (!uploadResult.success || !uploadResult.uri) {
      throw createError({
        statusCode: 500,
        message: `Metadata upload failed: ${uploadResult.error}`,
      });
    }

    console.log(`✅ New metadata URI: ${uploadResult.uri}`);

    // Step 4: Create update transaction
    console.log('📝 Creating update transaction...');
    
    const userWallet = new PublicKey(body.walletAddress);

    const tx = await program.methods
      .updateMetadata(uploadResult.uri)
      .accounts({
        kwamiNft,
        owner: userWallet,
      })
      .transaction();

    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    console.log('✅ Update transaction created');

    // Step 5: Update database
    console.log('💾 Updating NFT data...');
    
    // TODO: Update in Supabase
    // const { error } = await supabase
    //   .from('kwami_nfts')
    //   .update({
    //     metadata_uri: uploadResult.uri,
    //     mind_config: body.mind,
    //     soul_config: body.soul,
    //     updated_at: new Date().toISOString(),
    //   })
    //   .eq('mint', body.mint);

    return {
      success: true,
      needsBurnRemint: false,
      metadataUri: uploadResult.uri,
      transaction: serializedTx.toString('base64'),
      message: 'Metadata updated successfully',
    };
  } catch (error: any) {
    console.error('❌ Update failed:', error);
    
    return {
      success: false,
      needsBurnRemint: false,
      error: error.message || 'Failed to update Kwami NFT',
    };
  }
});

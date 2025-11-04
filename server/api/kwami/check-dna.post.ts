import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@coral-xyz/anchor';
import { createHash } from 'crypto';

/**
 * API endpoint to check if a DNA hash exists in the on-chain registry
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { dna } = body;

    if (!dna) {
      return {
        success: false,
        error: 'DNA hash is required',
      };
    }

    const config = useRuntimeConfig();
    const rpcUrl = config.public.RPC_URL;
    const programId = config.public.KWAMI_NFT_PROGRAM_ID;

    if (!rpcUrl || !programId) {
      return {
        success: false,
        error: 'Solana configuration missing',
      };
    }

    // Create connection
    const connection = new Connection(rpcUrl, 'confirmed');

    // Derive DNA registry PDA
    const [dnaRegistryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('dna_registry')],
      new PublicKey(programId),
    );

    // Fetch DNA registry account
    const registryAccount = await connection.getAccountInfo(dnaRegistryPda);

    if (!registryAccount) {
      // Registry doesn't exist yet - DNA is unique
      return {
        success: true,
        exists: false,
        message: 'DNA registry not initialized yet',
      };
    }

    // Parse the account data
    // Account structure (from Anchor program):
    // - discriminator: 8 bytes
    // - authority: 32 bytes
    // - dna_count: 4 bytes (u32)
    // - dnas: array of [u8; 32] hashes (up to 1000)
    
    const data = registryAccount.data;
    
    // Skip discriminator (8 bytes) and authority (32 bytes)
    const countOffset = 8 + 32;
    const dnaCount = data.readUInt32LE(countOffset);

    // DNAs start after count (4 bytes)
    const dnasOffset = countOffset + 4;

    // Convert input DNA hash to buffer for comparison
    const dnaBuffer = Buffer.from(dna, 'hex');

    if (dnaBuffer.length !== 32) {
      return {
        success: false,
        error: 'Invalid DNA hash format (must be 32 bytes hex)',
      };
    }

    // Check if DNA exists in the registry
    for (let i = 0; i < dnaCount; i++) {
      const offset = dnasOffset + (i * 32);
      const registeredDna = data.slice(offset, offset + 32);

      if (dnaBuffer.equals(registeredDna)) {
        return {
          success: true,
          exists: true,
          message: 'DNA already exists in registry',
          index: i,
        };
      }
    }

    return {
      success: true,
      exists: false,
      message: 'DNA is unique',
      registeredCount: dnaCount,
    };
  } catch (error: any) {
    console.error('Error checking DNA:', error);
    return {
      success: false,
      error: error.message || 'Failed to check DNA',
    };
  }
});

import { defineEventHandler, getQuery, createError } from 'h3';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';

/**
 * Response from balance endpoint
 */
interface BalanceResponse {
  success: boolean;
  balance?: string; // In tokens (not lamports)
  balanceRaw?: string; // In smallest units
  decimals?: number;
  error?: string;
}

/**
 * GET /api/qwami/balance?wallet=<address>
 * 
 * Get QWAMI token balance for a wallet
 */
export default defineEventHandler(async (event): Promise<BalanceResponse> => {
  try {
    const config = useRuntimeConfig();
    const query = getQuery(event);
    
    const walletAddress = query.wallet as string;

    if (!walletAddress) {
      throw createError({
        statusCode: 400,
        message: 'Missing required parameter: wallet',
      });
    }

    console.log(`💰 Checking QWAMI balance for ${walletAddress}`);

    const connection = new Connection(config.public.RPC_URL);
    const wallet = new PublicKey(walletAddress);
    const tokenMint = new PublicKey(config.public.QWAMI_TOKEN_MINT);

    // Get associated token account
    const tokenAccount = await getAssociatedTokenAddress(
      tokenMint,
      wallet
    );

    try {
      // Get account info
      const accountInfo = await getAccount(connection, tokenAccount);
      
      // QWAMI has 9 decimals
      const decimals = 9;
      const balanceRaw = accountInfo.amount.toString();
      const balance = (Number(balanceRaw) / Math.pow(10, decimals)).toString();

      console.log(`✅ Balance: ${balance} QWAMI`);

      return {
        success: true,
        balance,
        balanceRaw,
        decimals,
      };
    } catch (error: any) {
      // Account doesn't exist - balance is 0
      if (error.name === 'TokenAccountNotFoundError') {
        console.log('ℹ️  No token account found - balance is 0');
        
        return {
          success: true,
          balance: '0',
          balanceRaw: '0',
          decimals: 9,
        };
      }
      
      throw error;
    }
  } catch (error: any) {
    console.error('❌ Balance check failed:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to check QWAMI balance',
    };
  }
});

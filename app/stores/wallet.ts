import { Buffer } from 'buffer';
import { defineStore } from 'pinia';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

window.Buffer = window.Buffer || Buffer;

interface Account {
  publicKey: string;
  balance: number;
  tokens: {
    mint: string;
    balance: number;
    decimals: number;
    symbol?: string;
  }[];
}

export const useWalletStore = defineStore('wallet', {
  persist: true,
  state: () => ({
    isConnected: false,
    publicKey: '', // Primary account
    accounts: [] as Account[],
    balances: {
      SOL: 0,
      USDC: 0,
      USDT: 0,
      BTC: 0,
      ETH: 0,
    },
    tokens: {
      USDC: 'CyfUTbeYbpnjvUfE31jAvBM1MEfcm85UfEnEgRay3MjN',
    },
    rpcUrl: '',
    phantomStatus: 'unknown' as 'unknown' | 'not_installed' | 'locked' | 'ready' | 'connected',
  }),
  actions: {
    // Initialize Phantom listeners
    initPhantomListeners() {
      if (typeof window === 'undefined' || !('solana' in window)) {
        return;
      }

      const provider = (window as any).solana;

      if (!provider?.isPhantom) {
        return;
      }

      // Listen for account changes
      provider.on('accountChanged', (publicKey: any) => {
        if (publicKey) {
          console.log('Account changed:', publicKey.toString());
          this.publicKey = publicKey.toString();
          // Refresh balances
          if (this.rpcUrl) {
            const connection = new Connection(this.rpcUrl);
            this.fetchSolBalance(connection);
            this.fetchAllAccounts(connection);
          }
        } else {
          console.log('Account disconnected');
          this.isConnected = false;
          this.publicKey = '';
          this.accounts = [];
        }
      });

      // Listen for disconnect events
      provider.on('disconnect', () => {
        console.log('Phantom disconnected');
        this.isConnected = false;
        this.publicKey = '';
        this.accounts = [];
      });

      console.log('Phantom event listeners initialized');
    },

    // Check Phantom status
    checkPhantomStatus() {
      if (typeof window === 'undefined') {
        this.phantomStatus = 'unknown';
        return {
          status: 'unknown',
          message: 'Running in server-side context',
        };
      }

      if (!('solana' in window)) {
        this.phantomStatus = 'not_installed';
        return {
          status: 'not_installed',
          message: 'Phantom Wallet is not installed',
          action: 'Please install Phantom from https://phantom.app',
        };
      }

      const provider = (window as any).solana;

      if (!provider?.isPhantom) {
        this.phantomStatus = 'not_installed';
        return {
          status: 'not_installed',
          message: 'Phantom Wallet extension not detected',
          action: 'Please ensure Phantom is installed and enabled',
        };
      }

      if (provider.isConnected && provider.publicKey) {
        this.phantomStatus = 'connected';
        return {
          status: 'connected',
          message: 'Phantom is connected',
          publicKey: provider.publicKey.toString(),
        };
      }

      this.phantomStatus = 'ready';
      return {
        status: 'ready',
        message: 'Phantom is ready to connect',
      };
    },
    async connectWallet() {
      try {
        const config = useRuntimeConfig();

        // Check if window.solana exists
        if (!('solana' in window)) {
          throw new Error('Please install Phantom Wallet extension');
        }

        const provider = (window as any).solana;

        // Check if it's Phantom
        if (!provider?.isPhantom) {
          throw new Error('Phantom Wallet extension not detected');
        }

        console.log('Phantom detected, attempting connection...');

        // Check if already connected
        if (provider.isConnected && provider.publicKey) {
          console.log('Wallet already connected, using existing connection');
          this.publicKey = provider.publicKey.toString();
          this.isConnected = true;
          this.rpcUrl = config.public.RPC_URL;
        } else {
          // Try to connect with specific options
          try {
            const response = await provider.connect({ onlyIfTrusted: false });
            this.publicKey = response.publicKey.toString();
            this.isConnected = true;
            this.rpcUrl = config.public.RPC_URL;
            console.log('Connected to Phantom Wallet:', this.publicKey);
          } catch (connectError: any) {
            // Handle specific Phantom errors
            if (connectError.code === 4001) {
              throw new Error('Connection request rejected. Please approve the connection in Phantom.');
            } else if (connectError.message?.includes('User rejected')) {
              throw new Error('You rejected the connection request. Please try again.');
            } else {
              console.error('Phantom connect error:', connectError);
              throw new Error('Failed to connect to Phantom. Try refreshing the page or restarting Phantom.');
            }
          }
        }

        // Create connection
        const connection = new Connection(this.rpcUrl);

        // Fetch balances in parallel for better performance
        console.log('Fetching wallet data...');
        await Promise.allSettled([
          this.fetchSolBalance(connection),
          this.fetchAllAccounts(connection),
        ]);

        console.log('Wallet data fetched successfully');
      } catch (error: any) {
        console.error('Connection to Phantom Wallet failed:', error);
        // Reset connection state on error
        this.isConnected = false;
        this.publicKey = '';
        this.accounts = [];

        // Re-throw with a user-friendly message
        throw new Error(error.message || 'Failed to connect to Phantom Wallet');
      }
    },

    async fetchSolBalance(connection: Connection) {
      try {
        if (this.publicKey) {
          const balanceInLamports = await connection.getBalance(
            new PublicKey(this.publicKey));
          this.balances.SOL = balanceInLamports / 1_000_000_000;
          console.log('SOL Balance:', this.balances.SOL);
        } else {
          console.error('Wallet not connected');
        }
      } catch (error) {
        console.error('Failed to fetch SOL balance:', error);
      }
    },

    async fetchUsdcBalance(connection: Connection) {
      try {
        if (this.publicKey) {
          console.log('Fetching USDC balance...');
          const usdc = await connection.getTokenAccountBalance(
            new PublicKey(this.publicKey!),
          );
          console.log('Balance (using Solana-Web3.js): ', usdc);
          this.balances.USDC = usdc.value.uiAmount || 0;
        } else {
          console.error('Wallet not connected');
        }
      } catch (error) {
        console.error('Failed to fetch USDC balance:', error);
      }
    },

    async signMessage() {
      try {
        if (this.publicKey) {
          const provider = (window as any).solana;
          const message = 'I accept the terms and conditions of this website.';
          const encodedMessage = new TextEncoder().encode(message);
          const signedMessage = await provider.signMessage(
            encodedMessage, 'utf8');
          console.log('Signed message:', signedMessage);
        } else {
          console.error('Wallet not connected');
        }
      } catch (error) {
        console.error('Message signing failed:', error);
      }
    },

    async sendTransaction() {
      try {
        if (this.publicKey) {
          const connection = new Connection(this.rpcUrl);
          const provider = (window as any).solana;
          const fromPubkey = new PublicKey(this.publicKey);
          const toPubkey = new PublicKey(this.tokens.USDC);
          const {
            blockhash,
            lastValidBlockHeight,
          } = await connection.getLatestBlockhash();

          // Create a transaction
          const transaction = new Transaction({
            blockhash,
            lastValidBlockHeight,
            feePayer: fromPubkey,
          }).add(
            SystemProgram.transfer({
              fromPubkey,
              toPubkey,
              lamports: 0.0111 * 1_000_000_000,
            }),
          );
          const signedTransaction = await provider.signTransaction(transaction);
          console.log('Transaction signed:', signedTransaction);
          const signature = await connection.sendRawTransaction(
            signedTransaction.serialize());
          console.log('Transaction sent with signature:', signature);
          const confirmation = await connection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight,
          });
          console.log('Transaction confirmed:', confirmation);
        } else {
          console.error('Wallet not connected');
        }
      } catch (error) {
        console.error('Transaction failed:', error);
      }
    },

    async fetchAllAccounts(connection: Connection) {
      try {
        if (!this.publicKey) {
          console.warn('Wallet not connected, skipping account fetch');
          return;
        }

        console.log('Fetching accounts for:', this.publicKey);

        // Reset accounts array
        this.accounts = [];

        // For now, Phantom only provides access to the primary connected account
        // We'll fetch the primary account and all its token accounts
        const primaryPubkey = new PublicKey(this.publicKey);

        // Fetch SOL balance for primary account
        const solBalance = await connection.getBalance(primaryPubkey);
        console.log('SOL Balance fetched:', solBalance / 1_000_000_000);

        // Fetch all token accounts for this wallet
        let tokens: any[] = [];
        try {
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            primaryPubkey,
            { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') },
          );

          tokens = tokenAccounts.value.map((accountInfo) => {
            const parsedInfo = accountInfo.account.data.parsed.info;
            return {
              mint: parsedInfo.mint,
              balance: parsedInfo.tokenAmount.uiAmount || 0,
              decimals: parsedInfo.tokenAmount.decimals,
              symbol: undefined, // We could fetch token metadata here
            };
          }).filter(token => token.balance > 0); // Only show tokens with balance

          console.log('Token accounts fetched:', tokens.length);
        } catch (tokenError) {
          console.warn('Failed to fetch token accounts:', tokenError);
          // Continue without tokens if there's an error
        }

        // Add primary account
        this.accounts.push({
          publicKey: this.publicKey,
          balance: solBalance / 1_000_000_000,
          tokens,
        });

        console.log('Total accounts loaded:', this.accounts.length);
      } catch (error) {
        console.error('Failed to fetch all accounts:', error);
        // Add a basic account entry even if there's an error
        if (this.publicKey) {
          this.accounts = [{
            publicKey: this.publicKey,
            balance: 0,
            tokens: [],
          }];
        }
      }
    },

    async disconnectWallet() {
      console.log('Attempting to disconnect from Phantom Wallet...');
      try {
        if ('solana' in window) {
          const provider = (window as any).solana;

          if (provider.isPhantom && this.publicKey) {
            await provider.disconnect();
            this.publicKey = '';
            this.isConnected = false;
            this.accounts = [];
            this.balances = { SOL: 0, USDC: 0, USDT: 0, BTC: 0, ETH: 0 };
            console.log('Disconnected from Phantom Wallet');
          } else {
            console.error('Phantom Wallet not connected');
          }
        } else {
          console.error('Solana object not found. Install Phantom Wallet');
        }
      } catch (error) {
        console.error('Disconnection from Phantom Wallet failed:', error);
      }
    },
  },
});

export default useWalletStore;

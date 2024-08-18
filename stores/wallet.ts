import { Buffer } from 'buffer';
import { defineStore } from 'pinia';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js';

window.Buffer = window.Buffer || Buffer;

export const useWalletStore = defineStore('wallet', {
  persist: true,
  state: () => ({
    isConnected: false,
    publicKey: '',
    balances: {
      SOL: 0,
      USDC: 0,
      USDT: 0,
      BTC: 0,
      ETH: 0
    },
    tokens: {
      USDC: 'CyfUTbeYbpnjvUfE31jAvBM1MEfcm85UfEnEgRay3MjN'
    },
    rpcUrl: ''
  }),
  actions: {
    async connectWallet () {
      try {
        const config = useRuntimeConfig();
        if ('solana' in window) {
          const provider = (window as any).solana;
          if (provider.isPhantom) {
            const response = await provider.connect();
            await this.signMessage();
            this.publicKey = response.publicKey.toString();
            this.isConnected = true;
            this.rpcUrl = config.public.RPC_URL;
            const connection = new Connection(this.rpcUrl);
            await this.fetchSolBalance(connection);
            await this.fetchUsdcBalance(connection);
          } else {
            console.error('Phantom Wallet not found');
          }
        } else {
          console.error('Solana object not found. Install Phantom Wallet');
        }
      } catch (error) {
        console.error('Connection to Phantom Wallet failed:', error);
      }
    },

    async fetchSolBalance (connection: Connection) {
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

    async fetchUsdcBalance (connection: Connection) {
      try {
        if (this.publicKey) {
          console.log('Fetching USDC balance...');
          const usdc = await connection.getTokenAccountBalance(
            new PublicKey(this.publicKey!)
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

    async signMessage () {
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

    async sendTransaction () {
      try {
        if (this.publicKey) {
          const connection = new Connection(this.rpcUrl);
          const provider = (window as any).solana;
          const fromPubkey = new PublicKey(this.publicKey);
          const toPubkey = new PublicKey(this.tokens.USDC);
          const {
            blockhash,
            lastValidBlockHeight
          } = await connection.getLatestBlockhash();

          // Create a transaction
          const transaction = new Transaction({
            blockhash,
            lastValidBlockHeight,
            feePayer: fromPubkey
          }).add(
            SystemProgram.transfer({
              fromPubkey,
              toPubkey,
              lamports: 0.0111 * 1_000_000_000
            })
          );
          const signedTransaction = await provider.signTransaction(transaction);
          console.log('Transaction signed:', signedTransaction);
          const signature = await connection.sendRawTransaction(
            signedTransaction.serialize());
          console.log('Transaction sent with signature:', signature);
          const confirmation = await connection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight
          });
          console.log('Transaction confirmed:', confirmation);
        } else {
          console.error('Wallet not connected');
        }
      } catch (error) {
        console.error('Transaction failed:', error);
      }
    },

    async disconnectWallet () {
      console.log('Attempting to disconnect from Phantom Wallet...');
      try {
        if ('solana' in window) {
          const provider = (window as any).solana;

          if (provider.isPhantom && this.publicKey) {
            await provider.disconnect();
            this.publicKey = '';
            this.isConnected = false;
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
    }
  }
});

export default useWalletStore;

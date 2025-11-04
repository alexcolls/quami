import { defineStore } from 'pinia';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { calculateKwamiDNA, type KwamiDNAConfig } from '~/app/utils/kwami/calculateKwamiDNA';
import { prepareKwamiMetadata, type KwamiNFTMetadata } from '~/app/utils/kwami/prepareKwamiMetadata';
import type { BlobConfig, MindConfig, SoulConfig } from '@kwami';

/**
 * Minting flow states
 */
export type MintingStatus = 
  | 'idle'
  | 'calculating-dna'
  | 'checking-uniqueness'
  | 'preparing-assets'
  | 'uploading'
  | 'creating-transaction'
  | 'awaiting-signature'
  | 'confirming'
  | 'success'
  | 'error';

/**
 * Kwami NFT with owner info
 */
export interface OwnedKwamiNFT extends KwamiNFTMetadata {
  mint: string;
  owner: string;
  isOwned: boolean;
}

export const useKwamiNftStore = defineStore('kwami-nft', {
  persist: true,

  state: () => ({
    // Owned NFTs
    ownedNfts: [] as OwnedKwamiNFT[],
    selectedNft: null as OwnedKwamiNFT | null,
    
    // Minting flow
    mintingStatus: 'idle' as MintingStatus,
    mintingProgress: 0, // 0-100
    mintingError: null as string | null,
    
    // Current minting data
    currentMint: {
      dna: '',
      name: '',
      description: '',
      bodyConfig: null as KwamiDNAConfig | null,
      mindConfig: null as Partial<MindConfig> | null,
      soulConfig: null as Partial<SoulConfig> | null,
      glbData: '',
      thumbnailData: '',
    },
    
    // Transaction
    pendingTransaction: null as string | null,
    lastMintedNft: null as string | null,
    
    // Update flow
    updateStatus: 'idle' as 'idle' | 'checking' | 'uploading' | 'updating' | 'success' | 'error',
    needsBurnRemint: false,
  }),

  getters: {
    /**
     * Check if user has any Kwami NFTs
     */
    hasKwamis(): boolean {
      return this.ownedNfts.length > 0;
    },

    /**
     * Get Kwami count
     */
    kwamiCount(): number {
      return this.ownedNfts.length;
    },

    /**
     * Check if currently minting
     */
    isMinting(): boolean {
      return this.mintingStatus !== 'idle' && 
             this.mintingStatus !== 'success' && 
             this.mintingStatus !== 'error';
    },

    /**
     * Check if DNA is calculated
     */
    hasDna(): boolean {
      return !!this.currentMint.dna;
    },

    /**
     * Get minting status message
     */
    mintingMessage(): string {
      switch (this.mintingStatus) {
        case 'idle':
          return 'Ready to mint';
        case 'calculating-dna':
          return 'Calculating DNA...';
        case 'checking-uniqueness':
          return 'Checking DNA uniqueness...';
        case 'preparing-assets':
          return 'Preparing assets...';
        case 'uploading':
          return 'Uploading to Arweave...';
        case 'creating-transaction':
          return 'Creating transaction...';
        case 'awaiting-signature':
          return 'Awaiting wallet signature...';
        case 'confirming':
          return 'Confirming on blockchain...';
        case 'success':
          return 'Kwami minted successfully!';
        case 'error':
          return this.mintingError || 'Minting failed';
        default:
          return '';
      }
    },
  },

  actions: {
    /**
     * Calculate DNA for current body configuration
     */
    calculateDna(bodyConfig: KwamiDNAConfig): string {
      this.mintingStatus = 'calculating-dna';
      this.mintingProgress = 10;
      
      try {
        const dna = calculateKwamiDNA(bodyConfig);
        this.currentMint.dna = dna;
        this.currentMint.bodyConfig = bodyConfig;
        
        this.mintingStatus = 'idle';
        this.mintingProgress = 20;
        
        return dna;
      } catch (error: any) {
        this.mintingStatus = 'error';
        this.mintingError = `DNA calculation failed: ${error.message}`;
        throw error;
      }
    },

    /**
     * Check if DNA is unique on-chain
     */
    async checkDnaUniqueness(dna?: string): Promise<boolean> {
      const dnaToCheck = dna || this.currentMint.dna;
      
      if (!dnaToCheck) {
        throw new Error('No DNA to check');
      }

      this.mintingStatus = 'checking-uniqueness';
      this.mintingProgress = 30;

      try {
        // TODO: Call on-chain check or backend API
        const response = await $fetch('/api/kwami/check-dna', {
          method: 'POST',
          body: { dna: dnaToCheck },
        });

        this.mintingStatus = 'idle';
        return !response.exists;
      } catch (error: any) {
        this.mintingStatus = 'error';
        this.mintingError = `DNA check failed: ${error.message}`;
        throw error;
      }
    },

    /**
     * Start minting process
     */
    async mintKwami(params: {
      name: string;
      description?: string;
      bodyConfig: KwamiDNAConfig;
      mindConfig?: Partial<MindConfig>;
      soulConfig?: Partial<SoulConfig>;
      glbData: string;
      thumbnailData: string;
      walletAddress: string;
    }): Promise<{ mint: string; transaction: string }> {
      try {
        // Reset state
        this.mintingError = null;
        this.mintingStatus = 'calculating-dna';
        this.mintingProgress = 10;

        // Calculate DNA
        const dna = this.calculateDna(params.bodyConfig);

        // Store minting data
        this.currentMint = {
          dna,
          name: params.name,
          description: params.description || '',
          bodyConfig: params.bodyConfig,
          mindConfig: params.mindConfig,
          soulConfig: params.soulConfig,
          glbData: params.glbData,
          thumbnailData: params.thumbnailData,
        };

        // Call backend API
        this.mintingStatus = 'uploading';
        this.mintingProgress = 40;

        const response = await $fetch('/api/kwami/mint', {
          method: 'POST',
          body: {
            walletAddress: params.walletAddress,
            body: params.bodyConfig,
            mind: params.mindConfig,
            soul: params.soulConfig,
            name: params.name,
            description: params.description,
            glbData: params.glbData,
            thumbnailData: params.thumbnailData,
          },
        });

        if (!response.success) {
          throw new Error(response.error || 'Minting failed');
        }

        this.mintingStatus = 'creating-transaction';
        this.mintingProgress = 80;

        this.pendingTransaction = response.transaction;
        this.lastMintedNft = response.mint;

        return {
          mint: response.mint!,
          transaction: response.transaction!,
        };
      } catch (error: any) {
        this.mintingStatus = 'error';
        this.mintingError = error.message;
        throw error;
      }
    },

    /**
     * Sign and send minting transaction
     */
    async confirmMint(signedTransaction: string): Promise<string> {
      try {
        this.mintingStatus = 'confirming';
        this.mintingProgress = 90;

        const config = useRuntimeConfig();
        const connection = new Connection(config.public.RPC_URL);

        // Deserialize and send transaction
        const txBuffer = Buffer.from(signedTransaction, 'base64');
        const signature = await connection.sendRawTransaction(txBuffer);

        // Wait for confirmation
        await connection.confirmTransaction(signature, 'confirmed');

        this.mintingStatus = 'success';
        this.mintingProgress = 100;

        return signature;
      } catch (error: any) {
        this.mintingStatus = 'error';
        this.mintingError = `Transaction failed: ${error.message}`;
        throw error;
      }
    },

    /**
     * Update Kwami NFT metadata
     */
    async updateKwami(params: {
      mint: string;
      walletAddress: string;
      bodyConfig: KwamiDNAConfig;
      mindConfig?: Partial<MindConfig>;
      soulConfig?: Partial<SoulConfig>;
      name?: string;
      description?: string;
    }): Promise<{ needsBurnRemint: boolean; transaction?: string }> {
      try {
        this.updateStatus = 'checking';

        const response = await $fetch('/api/kwami/update', {
          method: 'POST',
          body: params,
        });

        if (!response.success) {
          throw new Error(response.error || 'Update failed');
        }

        if (response.needsBurnRemint) {
          this.needsBurnRemint = true;
          this.updateStatus = 'idle';
          return { needsBurnRemint: true };
        }

        this.updateStatus = 'updating';
        return {
          needsBurnRemint: false,
          transaction: response.transaction,
        };
      } catch (error: any) {
        this.updateStatus = 'error';
        throw error;
      }
    },

    /**
     * Fetch owned Kwami NFTs
     */
    async fetchOwnedKwamis(walletAddress: string): Promise<void> {
      try {
        // TODO: Implement fetching from Solana/Metaplex
        // For now, placeholder
        console.log('Fetching Kwamis for', walletAddress);
        
        // Would call Metaplex to get NFTs by owner
        // Filter for Kwami collection
        // Parse metadata from Arweave
        
        this.ownedNfts = [];
      } catch (error) {
        console.error('Failed to fetch owned Kwamis:', error);
      }
    },

    /**
     * Select a Kwami NFT
     */
    selectKwami(mint: string): void {
      const nft = this.ownedNfts.find(n => n.mint === mint);
      if (nft) {
        this.selectedNft = nft;
      }
    },

    /**
     * Reset minting flow
     */
    resetMinting(): void {
      this.mintingStatus = 'idle';
      this.mintingProgress = 0;
      this.mintingError = null;
      this.pendingTransaction = null;
      this.currentMint = {
        dna: '',
        name: '',
        description: '',
        bodyConfig: null,
        mindConfig: null,
        soulConfig: null,
        glbData: '',
        thumbnailData: '',
      };
    },

    /**
     * Reset update flow
     */
    resetUpdate(): void {
      this.updateStatus = 'idle';
      this.needsBurnRemint = false;
    },
  },
});

export default useKwamiNftStore;

<template>
  <div class="flex flex-col gap-4 p-4">
    <!-- Wallet Connection Check -->
    <div v-if="!walletStore.isConnected" class="flex flex-col items-center gap-4 py-8">
      <div class="text-lg opacity-70">
        {{ $t('Connect your wallet to mint Kwami NFT') }}
      </div>
      <QuamiAccountAuthConnectWallet />
    </div>

    <!-- Minting Interface -->
    <div v-else class="flex flex-col gap-6">
      <!-- DNA Preview -->
      <QuamiKwamiMintDNAPreview 
        v-if="kwamiNftStore.hasDna"
        :dna="kwamiNftStore.currentMint.dna"
      />

      <!-- Metadata Form -->
      <QuamiKwamiMintMetadataForm 
        v-model:name="mintName"
        v-model:description="mintDescription"
      />

      <!-- Minting Status -->
      <div 
        v-if="kwamiNftStore.isMinting || kwamiNftStore.mintingStatus === 'success'"
        class="flex flex-col gap-2 p-4 rounded-lg bg-white/5"
      >
        <div class="flex items-center gap-2">
          <div 
            v-if="kwamiNftStore.isMinting"
            class="i-eos-icons-loading text-xl"
          />
          <div 
            v-else-if="kwamiNftStore.mintingStatus === 'success'"
            class="i-mdi-check-circle text-xl text-green-500"
          />
          <span>{{ kwamiNftStore.mintingMessage }}</span>
        </div>
        
        <div 
          v-if="kwamiNftStore.isMinting"
          class="w-full bg-white/10 rounded-full h-2 overflow-hidden"
        >
          <div 
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
            :style="{ width: `${kwamiNftStore.mintingProgress}%` }"
          />
        </div>

        <div 
          v-if="kwamiNftStore.mintingStatus === 'success' && kwamiNftStore.lastMintedNft"
          class="text-sm opacity-70 mt-2"
        >
          <div>Mint: {{ shortenAddress(kwamiNftStore.lastMintedNft) }}</div>
        </div>
      </div>

      <!-- Error Display -->
      <div 
        v-if="kwamiNftStore.mintingStatus === 'error'"
        class="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
      >
        <div class="flex items-start gap-2">
          <div class="i-mdi-alert-circle text-xl flex-shrink-0" />
          <div class="flex flex-col gap-1">
            <div class="font-semibold">{{ $t('Minting Failed') }}</div>
            <div class="text-sm opacity-80">{{ kwamiNftStore.mintingError }}</div>
          </div>
        </div>
      </div>

      <!-- Mint Button -->
      <QuamiKwamiMintButton 
        :disabled="!canMint"
        :loading="kwamiNftStore.isMinting"
        @mint="handleMint"
      />

      <!-- Info -->
      <div class="text-xs opacity-50 space-y-1">
        <div>• {{ $t('Each Kwami has unique DNA based on its configuration') }}</div>
        <div>• {{ $t('NFT and assets will be stored permanently on Arweave') }}</div>
        <div>• {{ $t('Minting will be done on Solana') }} {{ config.public.SOLANA_NETWORK }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWalletStore } from '~/app/stores/wallet';
import { useKwamiNftStore } from '~/app/stores/kwami-nft';
import type { KwamiDNAConfig } from '~/app/utils/kwami/calculateKwamiDNA';

const config = useRuntimeConfig();
const walletStore = useWalletStore();
const kwamiNftStore = useKwamiNftStore();

// Form data
const mintName = ref('');
const mintDescription = ref('');

// Computed
const canMint = computed(() => {
  return walletStore.isConnected &&
         mintName.value.trim().length > 0 &&
         kwamiNftStore.hasDna &&
         !kwamiNftStore.isMinting;
});

// Shorten address helper
const shortenAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

// Handle mint
const handleMint = async () => {
  if (!canMint.value) return;

  try {
    // Get current body config from Kwami store
    // TODO: Get actual body config, mind config, soul config from Kwami component
    // For now, use placeholder
    const bodyConfig = kwamiNftStore.currentMint.bodyConfig as KwamiDNAConfig;
    
    if (!bodyConfig) {
      throw new Error('Body configuration is missing');
    }

    // TODO: Get GLB and thumbnail data from Kwami 3D renderer
    const glbData = ''; // Base64 encoded GLB
    const thumbnailData = ''; // Base64 encoded PNG

    if (!glbData || !thumbnailData) {
      throw new Error('Please render your Kwami first');
    }

    const result = await kwamiNftStore.mintKwami({
      name: mintName.value,
      description: mintDescription.value,
      bodyConfig,
      mindConfig: kwamiNftStore.currentMint.mindConfig || undefined,
      soulConfig: kwamiNftStore.currentMint.soulConfig || undefined,
      glbData,
      thumbnailData,
      walletAddress: walletStore.publicKey,
    });

    // Sign transaction with Phantom
    const provider = (window as any).solana;
    const txBuffer = Buffer.from(result.transaction, 'base64');
    const transaction = Transaction.from(txBuffer);
    
    const signedTx = await provider.signTransaction(transaction);
    const signedTxBase64 = Buffer.from(signedTx.serialize()).toString('base64');

    // Confirm mint
    const signature = await kwamiNftStore.confirmMint(signedTxBase64);

    console.log('Kwami minted successfully!', signature);

    // Refresh wallet data to show new NFT
    await walletStore.refreshWalletData();
  } catch (error: any) {
    console.error('Minting error:', error);
  }
};

// Watch for body config changes to recalculate DNA
// TODO: Connect to Kwami body/mind/soul stores
</script>

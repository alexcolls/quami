<template>
  <CommonMagicWindow
    icon="i-mdi-candy"
    :title="$t('Candy Machine')"
    class="h-fit"
    :menu-to-left="8"
    :default-position="{ x: 50, y: 70 }"
  >
    <div class="flex flex-col gap-6 p-6 max-w-md">
      <!-- Header -->
      <div class="text-center">
        <div class="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          🍬 Kwami Candy Machine
        </div>
        <p class="text-sm opacity-70 mt-2">
          {{ $t('Randomize your Kwami and mint it to the blockchain') }}
        </p>
      </div>

      <!-- Randomization Controls -->
      <div class="flex flex-col gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold">{{ $t('Randomization') }}</span>
          <div class="text-xs opacity-50">{{ randomCount }} {{ $t('rolls') }}</div>
        </div>

        <!-- Randomize Button -->
        <button
          class="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transform hover:scale-105"
          :disabled="isRandomizing"
          @click="randomizeKwami"
        >
          <div :class="isRandomizing ? 'i-eos-icons-loading text-xl' : 'i-mdi-dice-multiple text-xl'" />
          <span>{{ isRandomizing ? $t('Rolling...') : $t('🎲 Randomize Kwami') }}</span>
        </button>

        <!-- Random Seed Info -->
        <div v-if="currentSeed" class="text-xs opacity-50 font-mono text-center">
          {{ $t('Seed') }}: {{ currentSeed.substring(0, 16) }}...
        </div>
      </div>

      <!-- Current Configuration Preview -->
      <div v-if="currentConfig" class="flex flex-col gap-2 p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10">
        <div class="text-sm font-semibold flex items-center gap-2">
          <div class="i-mdi-eye text-lg" />
          <span>{{ $t('Current Configuration') }}</span>
        </div>
        
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span class="opacity-70">{{ $t('Spikes') }}:</span>
            <span class="ml-1 font-mono">{{ formatValue(currentConfig.spikes.x) }}</span>
          </div>
          <div>
            <span class="opacity-70">{{ $t('Resolution') }}:</span>
            <span class="ml-1 font-mono">{{ currentConfig.resolution }}</span>
          </div>
          <div>
            <span class="opacity-70">{{ $t('Shininess') }}:</span>
            <span class="ml-1 font-mono">{{ formatValue(currentConfig.shininess) }}</span>
          </div>
          <div>
            <span class="opacity-70">{{ $t('Skin') }}:</span>
            <span class="ml-1">{{ currentConfig.skin }}</span>
          </div>
        </div>

        <!-- DNA Preview -->
        <div v-if="currentDna" class="mt-2 pt-2 border-t border-white/10">
          <div class="text-xs opacity-70 mb-1">{{ $t('DNA') }}:</div>
          <div class="font-mono text-xs break-all opacity-80 bg-black/20 p-2 rounded">
            {{ currentDna }}
          </div>
        </div>
      </div>

      <!-- Wallet Check -->
      <div v-if="!walletStore.isConnected" class="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
        <div class="flex items-start gap-2 text-sm">
          <div class="i-mdi-alert text-lg flex-shrink-0" />
          <div>
            {{ $t('Connect your wallet to mint') }}
          </div>
        </div>
      </div>

      <!-- Mint Button -->
      <div v-else class="flex flex-col gap-3">
        <!-- Name Input -->
        <input
          v-model="kwamiName"
          type="text"
          :placeholder="$t('Name your Kwami (optional)')"
          class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-colors"
          maxlength="50"
        >

        <!-- Mint Button -->
        <button
          class="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          :class="canMint 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transform hover:scale-105 cursor-pointer'
            : 'bg-white/5 text-white/30 cursor-not-allowed'"
          :disabled="!canMint"
          @click="mintKwami"
        >
          <div v-if="kwamiNftStore.isMinting" class="i-eos-icons-loading text-xl" />
          <div v-else class="i-mdi-Creation text-xl" />
          <span>{{ kwamiNftStore.isMinting ? $t('Minting...') : $t('🎨 Mint This Kwami') }}</span>
        </button>

        <!-- Minting Progress -->
        <div v-if="kwamiNftStore.isMinting" class="space-y-2">
          <div class="flex items-center gap-2 text-sm">
            <div class="i-eos-icons-loading" />
            <span>{{ kwamiNftStore.mintingMessage }}</span>
          </div>
          <div class="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300"
              :style="{ width: `${kwamiNftStore.mintingProgress}%` }"
            />
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="kwamiNftStore.mintingStatus === 'success'" class="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
          <div class="flex items-start gap-2 text-sm">
            <div class="i-mdi-check-circle text-lg flex-shrink-0" />
            <div>
              {{ $t('Kwami minted successfully!') }}
              <div class="text-xs opacity-70 mt-1 font-mono">
                {{ shortenAddress(kwamiNftStore.lastMintedNft || '') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="kwamiNftStore.mintingStatus === 'error'" class="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          <div class="flex items-start gap-2 text-sm">
            <div class="i-mdi-alert-circle text-lg flex-shrink-0" />
            <div>
              {{ kwamiNftStore.mintingError }}
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="text-xs opacity-50 text-center space-y-1">
        <div>{{ $t('Total Randomizations') }}: {{ randomCount }}</div>
        <div v-if="walletStore.isConnected">
          {{ $t('Your Kwamis') }}: {{ walletStore.kwamiNfts.length }}
        </div>
      </div>
    </div>
  </CommonMagicWindow>
</template>

<script setup lang="ts">
import { useWalletStore } from '~/app/stores/wallet';
import { useKwamiNftStore } from '~/app/stores/kwami-nft';
import type { KwamiDNAConfig } from '~/app/utils/kwami/calculateKwamiDNA';

const walletStore = useWalletStore();
const kwamiNftStore = useKwamiNftStore();

// State
const isRandomizing = ref(false);
const randomCount = ref(0);
const currentConfig = ref<KwamiDNAConfig | null>(null);
const currentDna = ref('');
const currentSeed = ref('');
const kwamiName = ref('');

// Computed
const canMint = computed(() => {
  return walletStore.isConnected &&
         currentConfig.value !== null &&
         currentDna.value !== '' &&
         !kwamiNftStore.isMinting;
});

// Generate random configuration
const generateRandomConfig = (): KwamiDNAConfig => {
  const seed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  currentSeed.value = seed;

  // Random ranges for each parameter
  const config: KwamiDNAConfig = {
    spikes: {
      x: Math.random() * 8 + 0.5,  // 0.5 to 8.5
      y: Math.random() * 8 + 0.5,
      z: Math.random() * 8 + 0.5,
    },
    time: {
      x: Math.random() * 5 + 0.1,  // 0.1 to 5.1
      y: Math.random() * 5 + 0.1,
      z: Math.random() * 5 + 0.1,
    },
    rotation: {
      x: Math.random() * 2 - 1,  // -1 to 1
      y: Math.random() * 2 - 1,
      z: Math.random() * 2 - 1,
    },
    colors: {
      x: Math.random(),  // 0 to 1
      y: Math.random(),
      z: Math.random(),
    },
    resolution: Math.floor(Math.random() * 56) + 8,  // 8 to 64
    skin: Math.random() > 0.5 ? 'normal' : 'metallic',
    shininess: Math.random(),  // 0 to 1
    wireframe: Math.random() > 0.8,  // 20% chance
    baseScale: Math.random() * 2 + 0.5,  // 0.5 to 2.5
    opacity: Math.random() * 0.5 + 0.5,  // 0.5 to 1.0
  };

  return config;
};

// Randomize Kwami
const randomizeKwami = async () => {
  isRandomizing.value = true;
  randomCount.value++;

  // Animate the randomization
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    // Generate random configuration
    const config = generateRandomConfig();
    currentConfig.value = config;

    // Calculate DNA
    currentDna.value = kwamiNftStore.calculateDna(config);

    // Generate default name if empty
    if (!kwamiName.value) {
      const adjectives = ['Cosmic', 'Neon', 'Crystal', 'Shadow', 'Electric', 'Mystic', 'Cyber', 'Quantum'];
      const nouns = ['Dancer', 'Guardian', 'Walker', 'Dreamer', 'Spirit', 'Being', 'Entity', 'Form'];
      kwamiName.value = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
    }

    // TODO: Apply configuration to Kwami 3D viewer
    // This would update the actual Kwami rendering in the Kwami window
    console.log('Generated random Kwami config:', config);
  } catch (error) {
    console.error('Randomization failed:', error);
  } finally {
    isRandomizing.value = false;
  }
};

// Mint Kwami
const mintKwami = async () => {
  if (!canMint.value || !currentConfig.value) return;

  try {
    // TODO: Get actual GLB and thumbnail data from Kwami renderer
    // For now, using placeholders
    const glbData = '';  // Base64 encoded GLB
    const thumbnailData = '';  // Base64 encoded PNG

    if (!glbData || !thumbnailData) {
      throw new Error('Cannot mint without rendered assets. Please render your Kwami first.');
    }

    const result = await kwamiNftStore.mintKwami({
      name: kwamiName.value || 'Random Kwami',
      description: `A randomly generated Kwami from the Candy Machine. Seed: ${currentSeed.value}`,
      bodyConfig: currentConfig.value,
      glbData,
      thumbnailData,
      walletAddress: walletStore.publicKey,
    });

    // Sign transaction with Phantom
    const provider = (window as any).solana;
    const txBuffer = Buffer.from(result.transaction, 'base64');
    const { Transaction } = await import('@solana/web3.js');
    const transaction = Transaction.from(txBuffer);
    
    const signedTx = await provider.signTransaction(transaction);
    const signedTxBase64 = Buffer.from(signedTx.serialize()).toString('base64');

    // Confirm mint
    await kwamiNftStore.confirmMint(signedTxBase64);

    // Refresh wallet data
    await walletStore.refreshWalletData();

    // Generate new random for next mint
    setTimeout(() => {
      randomizeKwami();
    }, 2000);
  } catch (error: any) {
    console.error('Minting error:', error);
  }
};

// Helper functions
const formatValue = (value: number): string => {
  return value.toFixed(2);
};

const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

// Initialize with a random Kwami on mount
onMounted(() => {
  randomizeKwami();
});
</script>

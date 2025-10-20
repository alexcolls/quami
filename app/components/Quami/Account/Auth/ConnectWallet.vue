<template>
  <div class="space-y-4 p-4">
    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="bg-red-500/10 border border-red-500/30 rounded-lg p-3 space-y-2"
    >
      <p class="text-sm text-red-400">
        {{ errorMessage }}
      </p>
      <button
        v-if="showDiagnostics"
        class="text-xs text-blue-400 hover:text-blue-300 underline"
        @click="runDiagnostics"
      >
        Run Diagnostics
      </button>
    </div>

    <div class="flex flex-col gap-3">
      <CommonBtnGradient
        v-if="!wallet.isConnected"
        class="z-50 w-full"
        :disabled="isConnecting"
        @click="handleConnect"
      >
        {{ isConnecting ? 'Connecting...' : 'Connect to Phantom Wallet' }}
      </CommonBtnGradient>

      <template v-else>
        <CommonBtnGradient
          class="z-50 w-full"
          :disabled="!wallet.isConnected"
          @click="handleDisconnect"
        >
          Disconnect Wallet
        </CommonBtnGradient>

        <UButton
          class="z-50 w-full"
          :disabled="!wallet.isConnected"
          @click="handleTransaction"
        >
          Send 0.0111 SOL to My Wallet
        </UButton>
      </template>
    </div>

    <!-- Connection Status -->
    <div
      v-if="wallet.isConnected"
      class="bg-gray-800/50 rounded-lg p-4 space-y-3"
    >
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span class="text-sm text-gray-300">Connected</span>
      </div>

      <div>
        <p class="text-xs text-gray-500 mb-1">
          Primary Account
        </p>
        <p class="text-xs font-mono text-gray-300 break-all">
          {{ wallet.publicKey }}
        </p>
      </div>

      <!-- Summary Statistics -->
      <div
        v-if="wallet.accounts.length > 0"
        class="grid grid-cols-2 gap-3 pt-3 border-t border-gray-700"
      >
        <div>
          <p class="text-xs text-gray-500">
            Total Accounts
          </p>
          <p class="text-lg font-semibold text-white">
            {{ wallet.accounts.length }}
          </p>
        </div>
        <div>
          <p class="text-xs text-gray-500">
            Total SOL
          </p>
          <p class="text-lg font-semibold text-white">
            {{ totalSolBalance.toFixed(4) }}
          </p>
        </div>
        <div class="col-span-2">
          <p class="text-xs text-gray-500">
            Total Tokens
          </p>
          <p class="text-lg font-semibold text-white">
            {{ totalTokens }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { wallet } = useStore();

const isConnecting = ref(false);
const errorMessage = ref('');
const showDiagnostics = ref(false);

// Initialize Phantom listeners on mount
onMounted(() => {
  wallet.initPhantomListeners();

  // Check initial status
  const status = wallet.checkPhantomStatus();
  console.log('Phantom status:', status);
});

const handleConnect = async () => {
  isConnecting.value = true;
  errorMessage.value = '';

  try {
    // Check status first
    const status = wallet.checkPhantomStatus();
    console.log('Pre-connect Phantom status:', status);

    if (status.status === 'not_installed') {
      throw new Error(status.message);
    }

    await wallet.connectWallet();
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to connect to Phantom Wallet. Please try again.';
    console.error('Connection error:', error);

    // Show diagnostics on error
    showDiagnostics.value = true;
  } finally {
    isConnecting.value = false;
  }
};

const handleDisconnect = async () => {
  errorMessage.value = '';
  try {
    await wallet.disconnectWallet();
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to disconnect wallet';
    console.error('Disconnection error:', error);
  }
};

const handleTransaction = async () => {
  errorMessage.value = '';
  try {
    await wallet.sendTransaction();
  } catch (error: any) {
    errorMessage.value = error.message || 'Transaction failed';
    console.error('Transaction error:', error);
  }
};

const runDiagnostics = () => {
  const status = wallet.checkPhantomStatus();
  console.log('=== Phantom Diagnostics ===');
  console.log('Status:', status);
  console.log('Window.solana exists:', 'solana' in window);
  console.log('Is Phantom:', (window as any).solana?.isPhantom);
  console.log('Provider connected:', (window as any).solana?.isConnected);
  console.log('Store state:', {
    isConnected: wallet.isConnected,
    publicKey: wallet.publicKey,
    accounts: wallet.accounts.length,
  });
  console.log('=========================');
  alert('Diagnostics logged to console (F12)');
};

const totalSolBalance = computed(() => {
  return wallet.accounts.reduce((sum, account) => sum + account.balance, 0);
});

const totalTokens = computed(() => {
  return wallet.accounts.reduce((sum, account) => sum + account.tokens.length, 0);
});

// Clear error message after 5 seconds
watch(errorMessage, (newError) => {
  if (newError) {
    setTimeout(() => {
      errorMessage.value = '';
    }, 5000);
  }
});
</script>

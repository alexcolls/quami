<template>
  <div class="space-y-4 p-4">
    <div
      v-if="!wallet.isConnected"
      class="text-center text-gray-500 py-8"
    >
      <p class="text-lg">
        Connect your wallet to view accounts and balances
      </p>
    </div>

    <div
      v-else-if="wallet.accounts.length === 0"
      class="text-center text-gray-500 py-8"
    >
      <p class="text-lg">
        Loading accounts...
      </p>
    </div>

    <div
      v-else
      class="space-y-6"
    >
      <div
        v-for="(account, index) in wallet.accounts"
        :key="account.publicKey"
        class="border border-gray-700 rounded-lg p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-all"
      >
        <!-- Account Header -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              {{ index + 1 }}
            </div>
            <div>
              <p class="text-sm text-gray-400">
                Account {{ index + 1 }}
              </p>
              <p class="text-xs font-mono text-gray-500 truncate max-w-[200px]">
                {{ account.publicKey }}
              </p>
            </div>
          </div>
          <button
            class="text-xs text-blue-400 hover:text-blue-300"
            @click="copyToClipboard(account.publicKey)"
          >
            Copy
          </button>
        </div>

        <!-- SOL Balance -->
        <div class="mb-4 p-3 bg-gray-900/50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                SOL
              </div>
              <span class="text-sm text-gray-300">Solana</span>
            </div>
            <div class="text-right">
              <p class="text-lg font-semibold text-white">
                {{ account.balance.toFixed(4) }}
              </p>
              <p class="text-xs text-gray-500">
                SOL
              </p>
            </div>
          </div>
        </div>

        <!-- Token Balances -->
        <div
          v-if="account.tokens.length > 0"
          class="space-y-2"
        >
          <p class="text-xs text-gray-400 mb-2">
            Token Accounts
          </p>
          <div
            v-for="token in account.tokens"
            :key="token.mint"
            class="p-3 bg-gray-900/30 rounded-lg"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm text-gray-300">
                  {{ token.symbol || 'Token' }}
                </p>
                <p class="text-xs font-mono text-gray-600 truncate max-w-[180px]">
                  {{ token.mint }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-white">
                  {{ token.balance.toFixed(token.decimals) }}
                </p>
                <p class="text-xs text-gray-500">
                  Decimals: {{ token.decimals }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="text-center text-gray-500 text-xs py-2"
        >
          No token accounts found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { wallet } = useStore();

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
    // You could add a toast notification here
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
  }
};
</script>

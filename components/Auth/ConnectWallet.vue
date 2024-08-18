<template>
  <div>
    <CommonBtnGradient
      v-if="!wallet.isConnected"
      class="z-50"
      :disabled="wallet.isConnected"
      @click="wallet.connectWallet"
    >
      {{ wallet.isConnected ? 'Connected' : 'Connect to Phantom Wallet' }}
    </CommonBtnGradient>
    <CommonBtnGradient
      v-else
      class="z-50"
      :disabled="!wallet.isConnected"
      @click="wallet.disconnectWallet"
    >
      Disconnect Wallet
    </CommonBtnGradient>
    <UButton
      class="z-50"
      :disabled="!wallet.isConnected"
      @click="wallet.sendTransaction"
    >
      Send 0.0111 SOL to My Wallet
    </UButton>
    <p v-if="wallet.isConnected">
      Wallet is connected with public key: {{ wallet.publicKey }}
    </p>
    <p>
      SOL Balance: {{ wallet.balances.SOL }} SOL
    </p>
    <p>
      USDC Balance: {{ wallet.balances.USDC }} USDC
    </p>
    <!-- Add USDC Balance if needed -->
    <!-- <p v-if="usdcBalance !== null">
      USDC Balance: {{ usdcBalance }} USDC
    </p> -->
  </div>
</template>

<script setup lang="ts">

const { wallet } = useStore();

</script>

<template>
  <div>
    <UButton class="z-50" :disabled="isWalletConnected" @click="connectWallet">
      {{ isWalletConnected ? 'Connected' : 'Connect to Phantom Wallet' }}
    </UButton>
    <UButton class="z-50" :disabled="!isWalletConnected" @click="signMessage">
      Accept Terms
    </UButton>
    <UButton class="z-50" :disabled="!isWalletConnected" @click="disconnectWallet">
      Disconnect Wallet
    </UButton>
    <p v-if="isWalletConnected">
      Wallet is connected with public key: {{ publicKey }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Buffer } from 'buffer'; // Import Buffer polyfill
import { ref } from 'vue';

// Polyfill Buffer globally
window.Buffer = window.Buffer || Buffer;

const publicKey = ref<string | null>(null);
const isWalletConnected = ref<boolean>(false);

// Function to connect to Phantom Wallet
const connectWallet = async () => {
  console.log('Attempting to connect to Phantom Wallet...');
  try {
    if ('solana' in window) {
      const provider = (window as any).solana;

      if (provider.isPhantom) {
        const response = await provider.connect();
        publicKey.value = response.publicKey.toString();
        isWalletConnected.value = true; // Update connection status
        console.log('Connected Public Key:', publicKey.value);
      } else {
        console.error('Phantom Wallet not found');
      }
    } else {
      console.error('Solana object not found. Install Phantom Wallet');
    }
  } catch (error) {
    console.error('Connection to Phantom Wallet failed:', error);
  }
};

// Function to sign a message (accept terms)
const signMessage = async () => {
  try {
    if (publicKey.value) {
      const provider = (window as any).solana;
      const message = 'I accept the terms and conditions of this website.';
      const encodedMessage = new TextEncoder().encode(message);

      // Request the user to sign the message
      const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
      console.log('Signed message:', signedMessage);

      // You can now verify the signed message on the server or use it as proof of acceptance
    } else {
      console.error('Wallet not connected');
    }
  } catch (error) {
    console.error('Message signing failed:', error);
  }
};

// Function to disconnect from Phantom Wallet
const disconnectWallet = async () => {
  console.log('Attempting to disconnect from Phantom Wallet...');
  try {
    if ('solana' in window) {
      const provider = (window as any).solana;

      if (provider.isPhantom && publicKey.value) {
        await provider.disconnect();
        publicKey.value = null;
        isWalletConnected.value = false; // Update connection status
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
};
</script>

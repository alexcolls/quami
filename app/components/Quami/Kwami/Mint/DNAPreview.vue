<template>
  <div class="flex flex-col gap-2 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
    <div class="flex items-center gap-2 text-sm font-semibold">
      <div class="i-mdi-dna text-lg" />
      <span>{{ $t('DNA Fingerprint') }}</span>
    </div>
    
    <div class="font-mono text-xs break-all opacity-80 bg-black/20 p-2 rounded">
      {{ dna }}
    </div>

    <div v-if="isChecking" class="flex items-center gap-2 text-xs opacity-70">
      <div class="i-eos-icons-loading" />
      <span>{{ $t('Checking uniqueness...') }}</span>
    </div>

    <div v-else-if="isUnique === true" class="flex items-center gap-2 text-xs text-green-400">
      <div class="i-mdi-check-circle" />
      <span>{{ $t('DNA is unique!') }}</span>
    </div>

    <div v-else-if="isUnique === false" class="flex items-center gap-2 text-xs text-red-400">
      <div class="i-mdi-alert-circle" />
      <span>{{ $t('This DNA already exists') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKwamiNftStore } from '~/app/stores/kwami-nft';

const props = defineProps<{
  dna: string;
}>();

const kwamiNftStore = useKwamiNftStore();
const isChecking = ref(false);
const isUnique = ref<boolean | null>(null);

// Check uniqueness when DNA changes
watch(() => props.dna, async (newDna) => {
  if (!newDna) {
    isUnique.value = null;
    return;
  }

  try {
    isChecking.value = true;
    const unique = await kwamiNftStore.checkDnaUniqueness(newDna);
    isUnique.value = unique;
  } catch (error) {
    console.error('Error checking DNA:', error);
    isUnique.value = null;
  } finally {
    isChecking.value = false;
  }
}, { immediate: true });
</script>

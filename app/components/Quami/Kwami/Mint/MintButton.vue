<template>
  <button
    class="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('mint')"
  >
    <div v-if="loading" class="i-eos-icons-loading text-xl" />
    <div v-else class="i-mdi-Creation text-xl" />
    <span>{{ loading ? $t('Minting...') : $t('Mint Kwami NFT') }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
  loading?: boolean;
}>();

defineEmits<{
  mint: [];
}>();

const buttonClasses = computed(() => {
  if (props.disabled || props.loading) {
    return 'bg-white/5 text-white/30 cursor-not-allowed';
  }
  return 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white cursor-pointer transform hover:scale-105';
});
</script>

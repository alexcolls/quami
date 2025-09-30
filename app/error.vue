<template>
  <div class="h-screen w-screen flex justify-center align-middle items-center">
    <div class="text-center">
      <CommonTxtGradient class="text-9xl">
        404
      </CommonTxtGradient>
      <div class="mt-4 text-xl font-semibold">
        {{ `${$t('error.404.title')}: ${error.message.split(': ')[1]}` }}
      </div>
      <div class="mt-4">
        {{ $t('error.404.desc') }}
      </div>
      <CommonBtnGradient
        icon="i-heroicons-home"
        class="my-8 px-4 py-2"
        to="/"
      >
        {{ $t('error.back') }}
      </CommonBtnGradient>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
});

</script>

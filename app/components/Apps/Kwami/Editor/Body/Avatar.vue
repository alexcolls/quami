<template>
  <div>
    <div
      class="w-full flex cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <div class="font-extrabold pl-2">
        AVATAR
      </div>
      <UIcon
        name="i-heroicons-chevron-up"
        class="mt-[1px] w-5 h-5 ml-auto mr-2 transition-transform"
        :class="isOpen ? 'transform rotate-180' : ''"
      />
    </div>
    <div
      v-if="isOpen"
      class="mt-2 h-28 w-full border border-gray-600/30 dark:border-gray-400/30
        rounded-lg shadow-inner flex"
    >
      <div
        class="text-center font-bold m-1 mt-1.5 p-1 w-fit hover:bg-gray-500/50
          rounded-lg border-primary-500 border shadow-lg cursor-pointer
          active:shadow-xl active:bg-primary-500/50"
      >
        <img class="h-16 w-16 rounded-lg opacity-70" :src="blobBlack">
        BLOB
      </div>
      <div
        class="text-center font-bold m-1 mt-1.5 p-1 w-fit hover:bg-gray-500/50
          rounded-lg border-gray-500/50 border shadow-lg cursor-not-allowed"
      >
        <div class="h-16 w-16 text-xs rounded-lg opacity-70" :src="blobBlack">
          COMMING SOON
        </div>
        META
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import blobBlack from '~/@kwami/assets/avatars/blob.png';

const isOpen = ref(false);

</script>

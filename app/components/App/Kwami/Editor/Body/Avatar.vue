<template>
  <CommonAccordion title="AVATAR" subtitle="" :is-open="false">
    <div
      class="mt-2 h-28 w-full border border-gray-600/30
          dark:border-gray-400/30 rounded-lg shadow-inner flex"
    >
      <div
        class="text-center font-bold m-1 mt-1.5 p-1 w-fit
            hover:bg-gray-500/50 rounded-lg border-primary-500
            border-2 shadow-lg cursor-pointer active:shadow-xl
            active:bg-primary-500/50"
      >
        <img class="h-16 w-16 rounded-lg" :src="blobBlack">
        <div class="mt-1 text-black dark:text-white">
          BLOB
        </div>
      </div>
      <div
        class="text-center font-bold m-1 mt-1.5 p-1 w-fit
            hover:bg-gray-500/50 rounded-lg border-gray-500/50 border
            shadow-lg cursor-not-allowed"
      >
        <div class="h-16 w-16 text-xs rounded-lg opacity-70">
          COMMING SOON
        </div>
        <div class="mt-1">
          META
        </div>
      </div>
    </div>
  </CommonAccordion>
</template>

<script setup lang="ts">
import blobBlack from '~/@kwami/assets/avatars/blob.png';
</script>

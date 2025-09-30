<template>
  <div
    class="cursor-pointer mr-8"
    @click="navigateTo(ui.logoURL, {
      open: {
        target: '_blank',
        windowFeatures: {
          width: 500,
          height: 500
        }
      }
    })"
  >
    <img
      v-if="ui.isDark"
      src="/logo-white.svg"
      alt="logo"
      class="h-14 -ml-[10px] p-[2px]"
    >
    <img
      v-else
      src="/logo-black.svg"
      alt="logo"
      class="h-14 -ml-3"
    >
  </div>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

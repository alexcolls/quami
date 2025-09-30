<template>
  <UApp class="transition-all duration-500 ease-in-out">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">

const theme = useAppConfig();
const { ui } = useStore();

// theme.ui.primary = ui.primary;
// theme.ui.gray = ui.gray;

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.6s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

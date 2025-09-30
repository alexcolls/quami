<template>
  <body
    class="transition-all duration-500 ease-in-out
      bg-gray-300 dark:bg-gray-900"
  >
    <div class="transition-colors duration-300 ease-in-out">
      <NuxtLayout>
        <UNotifications
          :ui="{
            position: 'bottom-12'
          }"
        />
        <NuxtPage />
      </NuxtLayout>
    </div>
  </body>
</template>

<script setup lang="ts">

const theme = useAppConfig();
const { ui } = useStore();

theme.ui.primary = ui.primary;
theme.ui.gray = ui.gray;

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

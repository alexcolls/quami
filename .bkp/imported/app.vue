<template>
  <UApp
    class="transition-all duration-500 ease-in-out
      relative overflow-hidden min-h-screen"
  >
    <CommonCursorLight
      :color="ui.color[ui.isDark ? 'dark' : 'light'].secondary"
      :turn-light="ui.flashlight"
    />
    <div class="transition-colors duration-300 ease-in-out" :class="`bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} dark:bg-${ui.color[ui.isDark ? 'dark' : 'light'].background}`">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<script setup>

const { ui } = useStore();

</script>

<style>
/* body {
  font-family: 'Orbitron', sans-serif;
} */
.page-enter-active,
.page-leave-active {
  transition: all 0.6s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

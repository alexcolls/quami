<template>
  <div class="fixed bottom-14 w-full flex items-center justify-center">
    <div
      class="z-50 h-10 flex justify-center items-center p-2 hover:border rounded-full"
      :class="`bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} border-${ui.color[ui.isDark ? 'dark' : 'light'].primary} hover:border-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`"
    >
      <LayoutTheme />
      <div v-if="auth.isAuth" class="ml-4">
        <UButton
          icon="i-heroicons-arrow-right-on-rectangle"
          variant="ghost"
          size="sm"
          class="text-gray-500 dark:text-gray-400 rounded-full"
          @click="auth.logout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { ui, auth } = useStore();

</script>

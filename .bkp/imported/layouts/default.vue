<template>
  <div class="min-h-screen" :class="`bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} dark:bg-${ui.color[ui.isDark ? 'dark' : 'light'].background}`">
    <UContainer>
      <LayoutBgVideoGrid>
        <slot />
      </LayoutBgVideoGrid>
    </UContainer>
    <LayoutConfig />
    <LayoutFooter v-if="!auth.isAuth" />
  </div>
</template>

<script setup lang="ts">

const { ui, auth } = useStore();

</script>
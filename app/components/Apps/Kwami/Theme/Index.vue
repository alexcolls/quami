<template>
    <CommonMagicWindow
    icon="i-heroicons-paint-brush-solid"
    :title="$t('theme')"
    class="h-fit"
    :menu-to-left="8"
    :default-position="{ x: 10, y: 150 }"
  >
  <div class="flex w-full space-x-4">
    <AppsKwamiThemeBtnLight />
    <AppsKwamiThemeBtnColors />
    <AppsKwamiThemeBtnLangs />
    <AppsKwamiThemeBtnVideo />
    <UToggle
      v-model="ui.showVideo"
    />
  </div>
</CommonMagicWindow>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

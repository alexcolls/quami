<template>
  <CommonMagicWindow
    icon="i-heroicons-paint-brush-solid"
    :title="$t('theme')"
    class="h-fit"
    :menu-to-left="4"
    :default-position="{ x: 900, y: 600 }"
    :is-modal-open="true"
  >
    <AppsAccountThemeBtnLight />
    <AppsAccountThemeBtnColors />
    <UToggle
      v-model="ui.showVideo"
      class="mt-2 mx-2"
    />
    <AppsAccountThemeBtnLangs />
  </CommonMagicWindow>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

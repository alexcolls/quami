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
    <AppsAccountThemeBtnLangs />
    <AppsAccountThemeBtnLangs />
  </CommonMagicWindow>
</template>

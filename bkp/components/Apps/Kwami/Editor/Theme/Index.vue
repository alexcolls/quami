<template>
  <div class="flex w-full space-x-4">
    <AppsKwamiEditorThemeBtnLight />
    <AppsKwamiEditorBtnColors />
    <AppsKwamiEditorBtnLangs />
    <AppsKwamiEditorBtnVideo />
    <UToggle
      v-model="ui.showVideo"
    />
  </div>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

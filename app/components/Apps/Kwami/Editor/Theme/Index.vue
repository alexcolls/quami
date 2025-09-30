<template>
  <div class="flex w-full space-x-4">
    <AppsKwamiEditorThemeBtnLight />
    <AppsKwamiEditorThemeBtnColors />
    <AppsKwamiEditorThemeBtnLangs />
    <AppsKwamiEditorThemeBtnVideo />
    <UToggle
      v-model="ui.showVideo"
    />
  </div>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

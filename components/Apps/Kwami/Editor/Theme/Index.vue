<template>
  <div class="flex !min-w-96">
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

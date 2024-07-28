<template>
  <div class="flex !min-w-96">
    <LayoutBtnTheme />
    <LayoutBtnLight />
    <LayoutBtnVideo />
    <UToggle
      v-model="ui.showVideo"
    />
  </div>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

<template>
  <div class="flex !min-w-96">
    <AppsAccountThemeBtnLight />
    <AppsAccountThemeBtnColors />
    <AppsAccountThemeBtnVideo />
    <UToggle
      v-model="ui.showVideo"
    />
  </div>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

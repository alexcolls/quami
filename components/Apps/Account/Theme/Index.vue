<template>
  <div class="flex !min-w-96">
    <AppsAccountThemeBtnLight />
    <AppsAccountThemeBtnColors />
    <UToggle
      v-model="ui.showVideo"
      class="mt-2 mx-2"
    />
  </div>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

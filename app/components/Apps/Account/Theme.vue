<template>
  <CommonMagicModalBtn
    title="Theme"
    icon="i-icon-park-solid-eyes"
  >
    <div class="flex">
      <LayoutBtnTheme />
      <LayoutBtnLight />
      <LayoutBtnVideo />
      <UToggle
        v-model="ui.showVideo"
      />
    </div>
  </CommonMagicModalBtn>
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

<template>
  <UDivider
    :class="ui.showVideo ? 'opacity-30' : 'opacity-30'"
    :ui="{
      border: {
        base: 'border-gray-600 dark:border-gray-400'
      }
    }"
  />
</template>

<script setup lang="ts">

const { ui } = useStore();

</script>

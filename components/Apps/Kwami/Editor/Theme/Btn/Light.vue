<template>
  <UFormGroup label="Light" class="p-2">
    <UToggle
      v-model="isDark"
      variant="ghost"
      on-color="gray"
      off-color="yellow"
      on-icon="i-heroicons-moon-20-solid"
      off-icon="i-heroicons-sun-20-solid"
      @click="isDark = !isDark"
    />
  </UFormGroup>
</template>

<script setup lang="ts">

const { ui } = useStore();
const colorMode = useColorMode();

watch(colorMode, () => {
  ui.isDark = colorMode.value === 'dark';
});

const isDark = computed({
  get () {
    return colorMode.value === 'dark';
  },
  set (v) {
    colorMode.preference = v ? 'dark' : 'light';
  }
});

</script>

<template>
  <UButton
    variant="ghost"
    color="black"
    class="mx-2 h-[31px] w-[31px] hover:bg-white dark:hover:bg-gray-900 p-1.5
      hover:border border-gray-300 dark:border-gray-700 flex justify-center
      text-gray-900 dark:text-gray-100 !z-50"
    @click="isDark = !isDark"
  >
    <UIcon
      :name="ui.isDark ?
        'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      class="h-5 w-5 text-primary-950 dark:text-primary-50"
    />
  </UButton>
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

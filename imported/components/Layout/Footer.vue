<template>
  <footer class="bg-transparent fixed bottom-0 w-full h-12 flex items-center justify-center">
    <div 
      class="text-sm opacity-70 mx-2 flex text-black dark:text-white font-semibold hover:dark:text-white
        hover:text-black"
    >
      <span class="sm:block hidden">
        {{ year }} {{ $t('footer.copyright') }}
      </span>
      <span class="sm:block hidden">
        &nbsp;v.{{ version }}
      </span>
      <UTooltip
        :text="`${$t('footer.copyright')}`"
        class="sm:hidden block cursor-pointer"
      >
        <span>
          © {{ year }} v.{{ version }}
        </span>
      </UTooltip>
    </div>
  </footer>
</template>
<script setup lang="ts">

const config = useRuntimeConfig();
const version = config.public.VERSION ?? '0.0.1';
const date = new Date();
const YEAR = 2024;
const year = YEAR ?? date.getFullYear();

</script>
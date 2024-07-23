<template>
  <footer
    class="z-50 fixed h-[60px] w-full bg-gray-100/80 dark:bg-gray-900/80
      bottom-0"
    :class="[
      auth.isAuth ? '' : 'shadow-md shadow-gray-500/30',
      auth.isAuth ? '' : 'bg-opacity-10 backdrop-blur-md backdrop-filter',
      auth.isAuth ? '' : '!bg-gray-100/40 dark:!bg-gray-900/40'
    ]"
  >
    <CommonContainer class="flex justify-between items-center h-full">
      <div class="text-sm opacity-70 mx-2 flex">
        <span class="sm:block hidden">
          {{ date.getFullYear() }} {{ $t('footer.copyright') }}
        </span>
        <span class="sm:block hidden">
          &nbsp;v.{{ version }}
        </span>
        <UTooltip
          :text="`${$t('footer.copyright')}`"
          :ui="{ base: '[@media(pointer:coarse)]:!block' }"
          class="sm:hidden block cursor-pointer"
        >
          <span>
            © {{ date.getFullYear() }} v.{{ version }}
          </span>
        </UTooltip>
      </div>
      <div class="flex">
        <LayoutBtnLang />
        <LayoutBtnLight />
        <LayoutBtnTheme />
        <LayoutBtnLogout />
      </div>
    </CommonContainer>
  </footer>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const version = config.public.VERSION ?? '0.0.1';
const { auth } = useStore();
const date = new Date();

</script>

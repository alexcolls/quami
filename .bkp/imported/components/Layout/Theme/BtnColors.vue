<template>
  <UPopover 
    class="z-50"
    :ui="{
      content: `!bg-${ui.color[ui.isDark ? 'dark' : 'light'].background}dark:!bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} rounded-lg`
    }"
  >
    <CommonBtnIcon icon="i-heroicons-paint-brush-solid" class="rounded-full" />
    <template #content>
      <UCard
        variant="subtle"
        :ui="{
          header: `bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} dark:bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} rounded-t-lg`,
          body: `bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} dark:bg-${ui.color[ui.isDark ? 'dark' : 'light'].background}`,
          footer: `bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} dark:bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} rounded-b-lg`,
          root: `border border-${ui.color[ui.isDark ? 'dark' : 'light'].primary} dark:border-${ui.color[ui.isDark ? 'dark' : 'light'].primary} divide-${ui.color[ui.isDark ? 'dark' : 'light'].primary} dark:divide-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`,
        }"
      >
        <template #header>
          <div class="w-full text-sm mb-2">
            <UIcon name="i-heroicons-paint-brush-solid" class="w-3 h-3" />
            <span class="ml-2">Theme Colors</span>
          </div>
          <div class="grid grid-cols-3 h-10">
              <div class="h-5 w-10" />
              <div class="text-center flex justify-center items-center">
                <UButton variant="ghost" :icon="iconSun" class="rounded-full text-black dark:text-white" @click="setTheme('light')" />
              </div>
              <div class="text-center flex justify-center items-center">
                <UButton variant="ghost" :icon="iconMoon" class="rounded-full text-black dark:text-white" @click="setTheme('dark')" />
              </div>
          </div>
          <div class="grid grid-cols-3">
              <div class="text-xs text-left" >
                Primary
              </div>
              <div class="text-center flex justify-center items-center">
                <LayoutThemeBtnColorPrimary theme="light" />
              </div>
              <div class="text-center flex justify-center items-center">
                <LayoutThemeBtnColorPrimary theme="dark" />
              </div>
          </div>
          <div class="grid grid-cols-3">
            <div class="text-xs text-left" >
              Secondary
            </div>
            <div class="text-center flex justify-center items-center">
              <LayoutThemeBtnColorSecondary theme="light" />
            </div>
            <div class="text-center flex justify-center items-center">
              <LayoutThemeBtnColorSecondary theme="dark" />
            </div>
          </div>
          <div class="grid grid-cols-3">
            <div class="text-xs text-left" >
              Background
            </div>
            <div class="text-center flex justify-center items-center">
              <LayoutThemeBtnColorBg theme="light" />
            </div>
            <div class="text-center flex justify-center items-center">
              <LayoutThemeBtnColorBg theme="dark" />
            </div>
          </div>

        </template>

        <template #footer>

          <div class="flex justify-between items-center p-2">
            <span class="text-sm text-neutral-700 dark:text-neutral-300">
              <span class="text-red-500">R</span>
              <span class="text-green-500">G</span>
              <span class="text-blue-500">B</span>
              <span class="pl-8">
                {{ ui.trunOnRGB ? 'ON' : 'OFF' }}
              </span>
            </span>
            <USwitch v-model="ui.trunOnRGB" />
          </div>
          <div class="flex justify-between items-center p-2">
            <span class="text-sm text-neutral-700 dark:text-neutral-300 mr-2">
              {{ $t('flashlight') }}
              <span class="pl-[9px]">{{ ui.flashlight ? 'ON' : 'OFF' }}</span>
            </span>
            <USwitch v-model="ui.flashlight" class="" />
          </div>
        </template>
      </UCard>
    </template>
  </UPopover>
</template>

<script setup lang="ts">

const { ui } = useStore();
const colorMode = useColorMode();

const iconSun = 'i-line-md-sun-rising-twotone-loop';
const iconMoon = 'i-line-md-sunny-filled-loop-to-moon-filled-loop-transition';

const setTheme = (theme: string) => {
  colorMode.preference = theme;
  ui.isDark = theme === 'dark';
};

</script>
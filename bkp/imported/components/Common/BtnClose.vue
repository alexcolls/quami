<template>
  <UButton
    color="neutral"
    variant="ghost"
    icon="i-heroicons-x-mark-20-solid"
    class="hover:shadow-sm !shadow-neutral-400/80 dark:hover:bg-neutral-800/80
      active:shadow-inner transition-all duration-300 ease-in-out border
      active:duration-500 active:!opacity-80 !ring-0 focus-visible:!ring-0
      border-transparent hover:border-neutral-200 hover:dark:border-neutral-600
      active:bg-white dark:active:bg-neutral-900 dark:shadow-neutral-800"
    :ui="{
      color: {
        neutral: {
          ghost: '!ring-0 focus-visible:!ring-0'
        }
      }
    }"
  />
</template>

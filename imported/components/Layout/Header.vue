<template>
  <header
    class="z-50 fixed h-14 w-full bg-neutral-100/60 dark:bg-neutral-900/60 top-0
      border-primary-500/70"
  >
    <CommonContainer class="flex justify-between align-middle items-center">
      <div class="mx-2 w-6 h-6" />
      <LayoutLogo />
      <div v-if="auth.isAuth">
        <UButton
          color="neutral"
          variant="ghost"
          class="mr-4 px-2 hover:shadow-sm !shadow-primary-300 border
            dark:hover:bg-neutral-800 hover:!text-primary-500 dark:border-neutral-600
            active:shadow-inner transition-all duration-300 ease-in-out
            active:duration-500 active:opacity-80 dark:!shadow-primary-700
            border-neutral-400 hover:!border-primary-400
            hover:dark:!border-primary-600 h-9"
          :ui="{
            color: {
              neutral: {
                ghost: '!ring-0 focus-visible:!ring-0'
              }
            }
          }"
          @click="app.isMenuOpen = !app.isMenuOpen"
        >
          <UIcon
            name="i-heroicons-bars-3-16-solid"
            class="w-6 h-6"
          />
        </UButton>
      </div>
      <div v-else class="mx-2 w-6 h-6" />
    </CommonContainer>
  </header>
</template>

<script setup lang="ts">

const { auth, app } = useStore();

</script>

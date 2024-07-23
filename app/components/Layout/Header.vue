<template>
  <header
    class="z-50 fixed h-[60px] w-full bg-gray-100/80 dark:bg-gray-900/80 top-0
      shadow-lg shadow-primary-500"
    :class="[
      auth.isAuth ? '' : 'shadow-md shadow-gray-500/30',
      auth.isAuth ? '' : 'bg-opacity-10 backdrop-blur-md backdrop-filter',
      auth.isAuth ? '' : '!bg-gray-100/40 dark:!bg-gray-900/40'
    ]"
  >
    <CommonContainer class="flex justify-between align-middle items-center">
      <div v-if="auth.isAuth">
        <UButton
          color="gray"
          variant="ghost"
          class="mt-1 mr-4 px-2 hover:shadow-sm !shadow-primary-300 border
            dark:hover:bg-gray-800 hover:!text-primary-500 dark:border-gray-600
            active:shadow-inner transition-all duration-300 ease-in-out
            active:duration-500 active:opacity-80 dark:!shadow-primary-700
            border-gray-400 hover:!border-primary-400
            hover:dark:!border-primary-600"
          :ui="{
            color: {
              gray: {
                ghost: '!ring-0 focus-visible:!ring-0'
              }
            }
          }"
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

const { auth } = useStore();

</script>

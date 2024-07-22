<template>
  <body
    class="transition-all duration-500 ease-in-out
      bg-gray-200 dark:bg-gray-800"
  >
    <div class="transition-colors duration-300 ease-in-out">
      <NuxtLayout>
        <UNotifications
          :ui="{
            position: 'bottom-12'
          }"
        />
        <NuxtPage />
      </NuxtLayout>
    </div>
  </body>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.6s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

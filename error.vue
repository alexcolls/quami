<template>
  <div
    class="flex flex-col items-center justify-center w-screen h-screen
    bg-white dark:bg-black text-black dark:text-white"
  >
    <LayoutLogo class="mb-8" />
    <h1 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 z-50">
      {{ $t('error.404.title') }}
    </h1>
    <p class="text-onyx75 dark:text-nobel75 text-base text-center mb-2">
      {{ $t('error.404.description') }}
    </p>
    <p class="text-onyx75 dark:text-nobel75 text-base text-center mb-6">
      {{ $t('error.404.description2') }}
    </p>
    <CommonBtnGray
      :label="$t('error.404.btn')"
      icon="i-hugeicons-home-01"
      to="/"
    />
  </div>
</template>

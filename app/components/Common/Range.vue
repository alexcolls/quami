<template>
  <URange
    :step="0.1"
    :min="0"
    :max="20"
    size="sm"
    :ui="{
      progress: {
        base: 'opacity-50',
      },
    }"
  />
</template>

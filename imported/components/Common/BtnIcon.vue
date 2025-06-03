<template>
  <UButton
    variant="ghost"
    class="focus:outline-transparent focus-visible:outline-0
        disabled:cursor-not-allowed disabled:opacity-75
        flex-shrink-0 font-medium rounded-full text-sm gap-x-1.5
        p-1.5 text-neutral-900 dark:text-neutral-100
        focus-visible:ring-inset focus-visible:ring-2
        focus-visible:ring-primary-500 align-middle h-[31px] w-[31px]
        dark:focus-visible:ring-primary-400 inline-flex items-center
        hover:border border-neutral-300 dark:border-neutral-700
        bg-transparent"
    :class="`shadow-${ui.color.primary} hover:shadow-${ui.color.secondary}`"
  >
    <UIcon
      v-if="icon"
      :name="icon"
      class="h-4 w-4"
      :class="iconClass"
    />
    <slot />
  </UButton>
</template>

<script setup lang="ts">

defineProps<{
  icon?: string;
  iconClass?: string;
}>();

const { ui } = useStore();

</script>

<template>
  <UAccordion
    variant="ghost"
    color="gray"
    :items="items"
  >
    <template #default="{ item, open }">
      <UButton
        color="gray"
        variant="ghost"
        class="!bg-transparent hover:!bg-transparent -mt-2 -mb-2"
        :ui="{ rounded: 'rounded-none', padding: { sm: 'p-2' } }"
      >
        <span
          class="truncate text-lg font-extrabold uppercase text-gray-800
            dark:text-gray-200"
        >
          {{ item.title }}
        </span>
        <span class="">
          {{ item.subtitle }}
        </span>
        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-up-20-solid"
            class="w-5 h-5 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-180']"
          />
        </template>
      </UButton>
    </template>
    <template #content>
      <div>
        <slot />
      </div>
    </template>
  </UAccordion>
</template>

<script setup lang="ts">

const { title, subtitle } = defineProps<{
  title: string;
  subtitle?: string;
}>();

const items = [{
  title,
  subtitle,
  slot: 'content',
  defaultOpen: true
}];

</script>

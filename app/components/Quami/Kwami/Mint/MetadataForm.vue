<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-semibold flex items-center gap-2">
        <div class="i-mdi-tag-outline" />
        <span>{{ $t('Name') }}</span>
        <span class="text-red-400">*</span>
      </label>
      <input
        :value="name"
        type="text"
        :placeholder="$t('My Awesome Kwami')"
        class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-colors"
        maxlength="50"
        @input="$emit('update:name', ($event.target as HTMLInputElement).value)"
      >
      <div class="text-xs opacity-50">
        {{ name.length }}/50 {{ $t('characters') }}
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-semibold flex items-center gap-2">
        <div class="i-mdi-text-box-outline" />
        <span>{{ $t('Description') }}</span>
      </label>
      <textarea
        :value="description"
        :placeholder="$t('Tell the story of your Kwami...')"
        class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-colors resize-none"
        rows="4"
        maxlength="500"
        @input="$emit('update:description', ($event.target as HTMLTextAreaElement).value)"
      />
      <div class="text-xs opacity-50">
        {{ description.length }}/500 {{ $t('characters') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
}>();

defineEmits<{
  'update:name': [value: string];
  'update:description': [value: string];
}>();
</script>

<template>
  <div class="cursor-pointer">
    <USelectMenu
      v-model="selectedLang"
      icon="i-heroicons-language"
      :selected="selectedLang"
      :options="langs"
      class="px-1"
      :ui="{
        base: 'bg-red-500'
      }"
    />
  </div>
</template>

<script setup lang="ts">

const { ui } = useStore();
const langs = useLangs();
const { locale } = useI18n();

locale.value = ui.locale;

const selectedLang = ref(langs[ui.iLocale]);

watch(selectedLang, (v) => {
  ui.locale = v.value;
  locale.value = v.value;
  langs.forEach((lang: LangOption, i: number) => {
    if (lang.value === v.value) { ui.iLocale = i; }
  });
});

</script>

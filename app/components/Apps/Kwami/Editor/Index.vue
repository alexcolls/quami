<template>
  <CommonMagicWindow
    icon="i-icon-park-solid-ghost"
    :title="$t('kwami')"
    class="h-fit"
    :menu-to-left="8"
    :tabs="tabs"
    :selected-tab="selectedTab"
    :default-position="{ x: 10, y: 50 }"
    @tab-click="selectedTab = $event"
  >
    <template #tabs>
      <div class="relative">
        <AppsKwamiEditorBody
          :class="selectedTab.title.toUpperCase() === 'BODY'
            ? 'opacity-100' : 'opacity-0 hidden delay-200'"
          class="transition-opacity duration-300"
        />
        <AppsKwamiEditorMind
          :class="selectedTab.title.toUpperCase() === 'MIND'
            ? 'opacity-100' : 'opacity-0 hidden delay-200'"
          class="transition-opacity duration-300"
        />
        <AppsKwamiEditorSoul
          :class="selectedTab.title.toUpperCase() === 'SOUL'
            ? 'opacity-100 ' : 'opacity-0 hidden delay-200'"
          class="transition-opacity duration-300"
        />
      </div>
    </template>
  </CommonMagicWindow>
</template>

<script setup lang="ts">
const tabs = [
  {
    title: 'Body',
    icon: 'i-mdi-alien-outline',
  },
  {
    title: 'Mind',
    icon: 'i-mdi-brain',
  },
  {
    title: 'Soul',
    icon: 'i-mdi-cards-heart-outline',
  },
];

const selectedTab = ref(tabs[0]);
</script>

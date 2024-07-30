<template>
  <CommonMagicModalBtn
    icon="i-icon-park-solid-ghost"
    :title="$t('quami')"
    class="h-fit"
    :menu-to-left="8"
    :tabs="tabs"
    :selected-tab="selectedTab"
    @tab-click="selectedTab = $event"
  >
    <div class="relative">
      <AppKwamiEditorBody
        :class="selectedTab.title.toUpperCase() === 'BODY' ?
          'opacity-100' : 'opacity-0 hidden delay-200'"
        class="transition-opacity duration-300"
      />
      <AppKwamiEditorMind
        :class="selectedTab.title.toUpperCase() === 'MIND' ?
          'opacity-100' : 'opacity-0 hidden delay-200'"
        class="transition-opacity duration-300"
      />
      <AppKwamiEditorSoul
        :class="selectedTab.title.toUpperCase() === 'SOUL' ?
          'opacity-100 ' : 'opacity-0 hidden delay-200'"
        class="transition-opacity duration-300"
      />
    </div>
  </CommonMagicModalBtn>
</template>

<script setup lang="ts">

const tabs = [
  {
    title: 'Body',
    icon: 'i-mdi-alien-outline'
  },
  {
    title: 'Mind',
    icon: 'i-mdi-brain'
  },
  {
    title: 'Soul',
    icon: 'i-mdi-cards-heart-outline'
  }
];

const selectedTab = ref(tabs[0]);

</script>

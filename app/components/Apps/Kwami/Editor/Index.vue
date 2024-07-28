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
    <AppsKwamiEditorBody v-if="selectedTab.title.toUpperCase() === 'BODY'" />
    <AppsKwamiEditorMind v-if="selectedTab.title.toUpperCase() === 'MIND'" />
    <AppsKwamiEditorSoul v-if="selectedTab.title.toUpperCase() === 'SOUL'" />
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

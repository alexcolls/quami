<template>
  <CommonMagicWindow
    icon="i-icon-park-solid-user"
    :title="$t('account')"
    class="h-fit"
    :menu-to-left="4"
    :tabs="tabs"
    :selected-tab="selectedTab"
    :default-position="{ x: 900, y: 600 }"
    @tab-click="selectedTab = $event"
  >
    <AppsAccountTheme
      :class="selectedTab.title.toUpperCase() === 'THEME' ?
        'block' : 'hidden'"
    />
    <AppsAccountProfile v-if="selectedTab.title.toUpperCase() === 'PROFILE'" />
  </CommonMagicWindow>
</template>

<script setup lang="ts">

const tabs = [
  {
    title: 'Profile',
    icon: 'i-mdi-alien-outline'
  },
  {
    title: 'Theme',
    icon: 'i-mdi-brain'
  }
];

const selectedTab = ref(tabs[0]);

</script>

<template>
  <CommonMagicModalBtn
    icon="i-icon-park-solid-user"
    :title="$t('account')"
    class="h-fit"
    :menu-to-left="4"
    :tabs="tabs"
    :selected-tab="selectedTab"
    @tab-click="selectedTab = $event"
  >
    <AppsAccountProfile v-if="selectedTab.title.toUpperCase() === 'PROFILE'" />
    <AppsAccountTheme v-if="selectedTab.title.toUpperCase() === 'THEME'" />
  </CommonMagicModalBtn>
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

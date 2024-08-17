<template>
  <CommonMagicWindow
    icon="i-icon-park-solid-user"
    :title="$t('account')"
    class="h-fit"
    :menu-to-left="4"
    :tabs="tabs"
    :selected-tab="selectedTab"
    :default-position="{ x: position.x, y: position.y }"
    @tab-click="selectedTab = $event"
  >
    <AppsAccountProfile v-if="selectedTab.title.toUpperCase() === 'PROFILE'" />
  </CommonMagicWindow>
</template>

<script setup lang="ts">

defineProps<{
  position: { x: number; y: number };
}>();

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

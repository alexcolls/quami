<template>
  <CommonMagicModalBtn
    icon="i-icon-park-solid-ghost"
    :title="$t('quami')"
    class="h-fit"
    :tabs="tabs"
  >
    <AppsKwamiEditBody />
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

</script>

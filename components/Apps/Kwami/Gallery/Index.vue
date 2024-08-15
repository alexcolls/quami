<template>
  <CommonMagicWindow
    icon="i-ion-wallet-outline"
    :title="$t('wallet')"
    class="h-fit"
    :menu-to-left="8"
    :tabs="tabs"
    :selected-tab="selectedTab"
    :default-position="{ x: 300, y: 300 }"
    @tab-click="selectedTab = $event"
  >
    <div v-for="x in data" :key="x.id">
      {{ x.id }}
    </div>
  </CommonMagicWindow>
</template>

<script setup lang="ts">

const { auth } = useStore();
const supabase = useSupabaseClient();

const tabs = [
  {
    title: 'Kwamis',
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

const { data } = await supabase.from('kwami.body.blob')
  .select('*')
  .eq('user_id', auth.user.id);

watch(() => data, () => {
  console.log('data', data);
});
console.log('data', data);

</script>

<template>
  <CommonMagicWindow
    :title="$t('audio')"
    icon="i-icon-park-solid-music-one"
    :default-position="{ x: 500, y: 500 }"
    :is-modal-open="isModalOpen"
  >
    <UButton
      variant="ghost"
      color="gray"
      icon="i-material-symbols-skip-previous-rounded"
      @click="prevAudio()"
    />
    <UButton
      variant="ghost"
      color="gray"
      :icon="playing
        ? 'i-heroicons-pause-circle-16-solid'
        : 'i-heroicons-play-circle-16-solid'"
      @click="toggleAudio()"
    />
    <UButton
      variant="ghost"
      color="gray"
      icon="i-material-symbols-skip-next-rounded"
      @click="nextAudio()"
    />
  </CommonMagicWindow>
</template>

<script setup lang="ts">

defineProps<{
  isModalOpen: boolean;
}>();

const { q } = useStore();
const playing = ref(false);

const toggleAudio = async () => {
  if (q.body.audio.instance.paused) {
    await q.body.audio.playAudio();
    q.body.blob.state = 'speak';
    playing.value = true;
  } else {
    q.body.audio.pauseAudio();
    q.body.blob.state = 'normal';
    playing.value = false;
  }
};

const nextAudio = () => {
  q.body.audio.nextAudio();
};

const prevAudio = () => {
  q.body.audio.prevAudio();
};

</script>

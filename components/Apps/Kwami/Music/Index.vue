<template>
  <CommonMagicModalBtn
    :title="$t('music')"
    icon="i-icon-park-solid-music-one"
    :default-position="{ x: 500, y: 500 }"
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
        ? 'i-heroicons-play-circle-16-solid'
        : 'i-heroicons-pause-circle-16-solid'"
      @click="toggleAudio()"
    />
    <UButton
      variant="ghost"
      color="gray"
      icon="i-material-symbols-skip-next-rounded"
      @click="nextAudio()"
    />
  </CommonMagicModalBtn>
</template>

<script setup lang="ts">

const { q } = useStore();
const playing = ref(false);

const toggleAudio = () => {
  if (q.body.audio.instance.paused) {
    q.body.audio.playAudio();
    q.body.selected.state = 'speak';
    playing.value = true;
  } else {
    q.body.audio.pauseAudio();
    q.body.selected.state = 'normal';
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

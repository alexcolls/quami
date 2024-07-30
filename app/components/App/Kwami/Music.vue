<template>
  <CommonMagicModalBtn
    :title="$t('music')"
    icon="i-icon-park-solid-music-one"
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
      :icon="!props.playing
        ? 'i-heroicons-play-circle-16-solid'
        : 'i-heroicons-pause-circle-16-solid'"
      @click="play()"
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

const props = defineProps<{
  playing: boolean;
  playAudio:() => void;
  nextAudio:() => void;
  prevAudio: () => void;
}>();

const play = () => {
  props.playAudio();
};

</script>

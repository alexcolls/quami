<template>
  <div>
    <AppsKwamiEditor v-if="props.isMounted" />
    <AppsKwamiMusic
      :playing="props.playing"
      :play-audio="props.toggleAudio"
      :next-audio="props.nextAudio"
      :prev-audio="props.previousAudio"
    />
    <AppsAccount v-if="props.isMounted" />
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  isMounted: boolean;
  playing: boolean;
  toggleAudio:() => void;
  nextAudio: () => void;
  previousAudio: () => void;
}>();

</script>

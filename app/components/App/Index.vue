<template>
  <div>
    <AppKwamiEditor v-if="props.isMounted" />
    <AppKwamiMusic
      :playing="props.playing"
      :play-audio="props.toggleAudio"
      :next-audio="props.nextAudio"
      :prev-audio="props.previousAudio"
    />
    <AppAccount v-if="props.isMounted" />
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

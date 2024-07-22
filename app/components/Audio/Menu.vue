<template>
  <div
    class="fixed bottom-10 left-1/2 transform
  -translate-x-1/2 flex space-x-4"
  >
    <!-- <button class="m-5 p-4 bg-transparent" @click="toggleLeftPanel">
      <img src="~/assets/icons/kwami.png" alt="Kwami" class="w-7 h-7">
    </button> -->

    <UButton
      variant="ghost"
      color="gray"
      icon="i-heroicons-play-circle-16-solid"
      @click="prevAudio()"
    />
    <UButton
      variant="ghost"
      color="gray"
      :icon="props.playing
        ? 'i-heroicons-play-circle-16-solid'
        : 'i-heroicons-pause-circle-16-solid'"
      @click="play()"
    />
    <UButton
      variant="ghost"
      color="gray"
      icon="i-heroicons-play-circle-16-solid"
      @click="nextAudio()"
    />
  </div>
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

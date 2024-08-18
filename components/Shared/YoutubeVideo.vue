<template>
  <youtube
    ref="youtubePlayer"
    :video-id="videoId"
    :player-vars="playerVars"
    @playing="playing"
  />
  <button @click="playVideo">
    Play
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VueYoutube from 'vue-youtube';

// Register VueYoutube globally if not done already
// Vue.use(VueYoutube);

const videoId = ref('JRjwF8OWNck');
const playerVars = ref({
  autoplay: 1,
  controls: 0,
  showinfo: 0,
  modestbranding: 1,
  rel: 0,
  fs: 0
});

const youtubePlayer = ref(null);

const playing = () => {
  console.log('\o/ we are watching!!!');
};

const playVideo = () => {
  if (youtubePlayer.value && youtubePlayer.value.player) {
    youtubePlayer.value.player.playVideo();
  }
};

onMounted(() => {
  youtubePlayer.value = youtubePlayer.value?.$refs.youtubePlayer.player;
});
</script>

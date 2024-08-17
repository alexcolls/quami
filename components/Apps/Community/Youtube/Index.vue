<template>
  <div>
    <!-- Input for the YouTube URL -->
    <UInput v-model="youtubeUrl" placeholder="Enter YouTube URL" />

    <!-- Button to fetch the MP3 and play -->
    <UButton @click="fetchAndPlayMp3">
      Get MP3 and Play
    </UButton>

    <!-- Audio player -->
    <audio v-if="mp3Url" :src="mp3Url" controls autoplay />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const youtubeUrl = ref('');
const mp3Url = ref('');

const fetchAndPlayMp3 = async () => {
  try {
    const response = await fetch(
      `api/youtube/convert?url=${encodeURIComponent(youtubeUrl.value)}`
    );
    const data = await response.json();
    mp3Url.value = data.mp3Url;
  } catch (error) {
    console.error('Error fetching MP3:', error);
  }
};
</script>

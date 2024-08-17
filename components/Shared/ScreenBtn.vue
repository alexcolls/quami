<template>
  <div class="z-50">
    <UButton @click="toggleFullScreen">
      {{ isFullScreen ? 'Exit Full Screen' : 'Full Screen' }}
    </UButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isFullScreen = ref(false);

const toggleFullScreen = () => {
  if (!isFullScreen.value) {
    // Enter full screen mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  } else {
    // Exit full screen mode
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }

  // Toggle the state
  isFullScreen.value = !isFullScreen.value;
};

// Listen for changes in full screen state to update the button text
document.addEventListener('fullscreenchange', () => {
  isFullScreen.value = !!document.fullscreenElement;
});

</script>

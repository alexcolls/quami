<template>
  <div>
    <canvas
      ref="canvas"
      class="fixed h-screen w-screen !bg-transparent"
      @mousemove="handleMouseMove"
      @dblclick="handleDoubleClick"
    />
    <!-- <CommonBackgroundVideos /> -->
    <!-- <button @click="toggleAudio" class="z-50 relative p-4 bg-red-400">
    {{ q.audio.audioInstance.paused ? 'Play' : 'Pause' }}
  </button> -->
    <ModalMusic
      :playing="playing"
      :play-audio="toggleAudio"
      :next-audio="nextAudio"
      :prev-audio="previousAudio"
    />
  </div>
  <ModalConfigKwami v-if="isMounted" />
  <ModalTheme v-if="isMounted" />
</template>

<script setup lang="ts">
const { q } = useStore();

const isMounted = ref(false);
const canvas = ref<HTMLCanvasElement>();

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

const previousAudio = () => {
  q.body.audio.prevAudio();
};

const isMouseDown = ref(false);
const mouseMoved = ref(false);

const handleMouseMove = () => {
  if (isMouseDown.value) {
    mouseMoved.value = true;
  }
};

const handleDoubleClick = () => {
  toggleAudio();
};

onMounted(() => {
  if (!canvas.value) { return; }
  q.init(canvas.value);
  isMounted.value = true;
});
</script>

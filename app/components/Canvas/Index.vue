<template>
  <div>
    <canvas
      ref="canvas"
      class="fixed h-screen w-screen"
      @mousemove="handleMouseMove"
      @dblclick="handleDoubleClick"
    />
    <!-- <button @click="toggleAudio" class="z-50 relative p-4 bg-red-400">
    {{ q.audio.audioInstance.paused ? 'Play' : 'Pause' }}
  </button> -->
    <ModalConfigKwami v-if="isMounted" />
    <AudioMenu
      :playing="playing"
      :play-audio="toggleAudio"
      :next-audio="nextAudio"
      :prev-audio="previousAudio"
    />
  </div>
</template>

<script setup lang="ts">
const { q } = useStore();
const isMounted = ref(false);
const canvas = ref<HTMLCanvasElement>();

const playing = ref(false);

const toggleAudio = () => {
  if (q.kwami.body.audio.instance.paused) {
    q.kwami.body.audio.playAudio();
    q.kwami.body.selected.state = 'speak';
    playing.value = true;
  } else {
    q.kwami.body.audio.pauseAudio();
    q.kwami.body.selected.state = 'normal';
    playing.value = false;
  }
};

const nextAudio = () => {
  q.kwami.body.audio.nextAudio();
};

const previousAudio = () => {
  q.kwami.body.audio.prevAudio();
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

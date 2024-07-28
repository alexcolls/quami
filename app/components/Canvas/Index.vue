<template>
  <div>
    <CommonBackgroundVideos
      v-if="ui.showVideo"
      :class="opacity"
    />
    <canvas
      ref="canvas"
      class="fixed h-screen w-screen !bg-transparent"
      @mousemove="handleMouseMove"
      @dblclick="ui.showVideo ? switchVideo() : () => {}"
    />
    <Apps
      :is-mounted="isMounted"
      :playing="playing"
      :toggle-audio="toggleAudio"
      :next-audio="nextAudio"
      :previous-audio="previousAudio"
    />
  </div>
</template>

<script setup lang="ts">

const { q, ui } = useStore();

const isMounted = ref(false);
const canvas = ref<HTMLCanvasElement>();

const playing = ref(false);
const opacity = ref('opacity-50');
watch(() => ui.opacityVideo, (v) => {
  opacity.value = `opacity-${v}`;
  const x = `opacity-${v}`;
  console.log('ui.opacityVideo', x);
  opacity.value = x;
});

const switchVideo = () => {
  ui.keyVideo++;
};

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

onMounted(() => {
  if (!canvas.value) { return; }
  q.init(canvas.value);
  isMounted.value = true;
});

</script>

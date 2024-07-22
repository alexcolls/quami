<template>
  <canvas
    ref="canvas"
    class="fixed h-screen w-screen"
    @mousemove="handleMouseMove"
    @dblclick="handleDoubleClick"
  />
  <!-- <button @click="toggleAudio" class="z-50 relative p-4 bg-red-400">
    {{ q.audio.audioInstance.paused ? 'Play' : 'Pause' }}
  </button> -->
  <MainConfigPanel v-if="isMounted" />
  <AudioMenu
    :playing="playing"
    :play-audio="toggleAudio"
    :next-audio="nextAudio"
    :prev-audio="previousAudio"
  />
</template>

<script setup lang="ts">

const { q } = useStore();
const isMounted = ref(false);
const canvas = ref<HTMLCanvasElement>();

const playing = ref(false);

const toggleAudio = () => {
  if (q.kwami.audio.instance.paused) {
    q.kwami.audio.playAudio();
    q.kwami.body.state = 'speak';
    playing.value = true;
  } else {
    q.kwami.audio.pauseAudio();
    q.kwami.body.state = 'normal';
    playing.value = false;
  }
};

const nextAudio = () => {
  q.kwami.audio.nextAudio();
};

const previousAudio = () => {
  q.kwami.audio.prevAudio();
};

const isMouseDown = ref(false);
const mouseMoved = ref(false);

// const handleMouseDown = () => {
//   isMouseDown.value = true;
//   mouseMoved.value = false;
// };

// const handleMouseUp = () => {
//   if (isMouseDown.value && !mouseMoved.value) {
//     handleCanvasClick();
//   }
//   isMouseDown.value = false;
// };

const handleMouseMove = () => {
  if (isMouseDown.value) {
    mouseMoved.value = true;
  }
};

// function handleCanvasClick () {
//   if (!mouseMoved.value) { kwami.form.on('click'); }
// }

const handleDoubleClick = () => {
  toggleAudio();
};

onMounted(() => {
  if (!canvas.value) { return; }
  q.init(canvas.value);
  isMounted.value = true;
  // watchEffect(() => {
  //   kwami.state.body.vector('x', kwamiStore.body.blob.vec.x);
  // });

  // watchEffect(() => {
  //   kwami.form.vector('y', kwamiStore.body.blob.vec.y);
  // });

  // watchEffect(() => {
  //   kwami.form.vector('z', kwamiStore.body.blob.vec.z);
  // });

  // watchEffect(() => {
  //   kwami.form.time.x = kwamiStore.body.blob.time.x;
  // });

  // watchEffect(() => {
  //   kwami.form.time.y = kwamiStore.body.blob.time.y;
  // });

  // watchEffect(() => {
  //   kwami.form.time.z = kwamiStore.body.blob.time.z;
  // });

  // watchEffect(() => {
  //   kwami.form.color('x', kwamiStore.body.blob.color.x);
  // });

  // watchEffect(() => {
  //   kwami.form.color('y', kwamiStore.body.blob.color.y);
  // });

  // watchEffect(() => {
  //   kwami.form.color('z', kwamiStore.body.blob.color.z);
  // });

  // watch(() => kwamiStore.body.blob.color.random, () => {
  //   kwami.form.on('click');
  // });
});

</script>

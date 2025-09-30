<template>
  <div @click="getRandomKwami">
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
  </div>
</template>

<script setup lang="ts">
import {
  getRandomHexColor,
  getRandomBetween,
  getRandomBoolean
} from '~/@kwami/utils/randoms';

const { q, ui } = useStore();

const isMounted = ref(false);
const canvas = ref<HTMLCanvasElement>();

const getRandomKwami = () => {
  const isRotation = getRandomBoolean();
  q.body.blob.spikes.x = getRandomBetween(0, 1, 2);
  q.body.blob.spikes.y = getRandomBetween(0, 1, 2);
  q.body.blob.spikes.z = getRandomBetween(0, 1, 2);
  q.body.blob.time.x = getRandomBetween(0, 50, 1);
  q.body.blob.time.y = getRandomBetween(0, 50, 1);
  q.body.blob.time.z = getRandomBetween(0, 50, 1);
  if (isRotation) {
    q.body.blob.rotation.x = getRandomBetween(0, 0.01, 3);
    q.body.blob.rotation.y = getRandomBetween(0, 0.01, 3);
    q.body.blob.rotation.z = getRandomBetween(0, 0.01, 3);
  } else {
    q.body.blob.rotation.x = 0;
    q.body.blob.rotation.y = 0;
    q.body.blob.rotation.z = 0;
  }
  const resolution = getRandomBetween(30, 300, 1);
  q.body.blob.setResolution(resolution);
  const wireframe = getRandomBoolean();
  q.body.blob.skins.tricolor.wireframe = wireframe;
  q.body.blob.setColors(
    getRandomHexColor(),
    getRandomHexColor(),
    getRandomHexColor()
  );
  q.body.camera.fov = 110 - getRandomBetween(55, 65, 1);
  q.body.camera.updateProjectionMatrix();
};

const opacity = ref('opacity-50');
watch(() => ui.opacityVideo, (v) => {
  opacity.value = `opacity-${v}`;
  const x = `opacity-${v}`;
  opacity.value = x;
});

const switchVideo = () => {
  ui.keyVideo++;
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
  getRandomKwami();
});

</script>

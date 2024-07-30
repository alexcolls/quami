<template>
  <div class="p-2 w-[500px]">
    <div class="flex justify-start">
      <UButton
        icon="i-mdi-dice-multiple"
        class="ml-4"
        :label="$t('randomADN')"
        @click="getRandomQuami"
      />
      <div class="ml-4">
        {{ 0.022 }}
      </div>
    </div>
    <div class="mt-5 sm:mt-6 space-y-3">
      <CommonDividerX />
      <AppKwamiEditorBodyAvatar />
      <CommonDividerX />
      <AppKwamiEditorBodySkin />
      <CommonDividerX />
      <AppKwamiEditorBodyOptions />
      <CommonDividerX />
      <div class="h-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getRandomHexColor,
  getRandomBetween,
  getRandomBoolean
} from '~/@kwami/utils/randoms';

const { q, ui } = useStore();

const vecs = ref(12);
const time = ref(12);
const rotation = ref(0);
const isRotation = ref(false);
const wireframe = ref(false);
const resolution = ref(20);
const size = ref(100);

const getRandomQuami = () => {
  q.body.selected.vec.x = getRandomBetween(0, 2, 2);
  q.body.selected.vec.y = getRandomBetween(0, 2, 2);
  q.body.selected.vec.z = getRandomBetween(0, 2, 2);
  q.body.selected.time.x = getRandomBetween(0, 50, 1);
  q.body.selected.time.y = getRandomBetween(0, 50, 1);
  q.body.selected.time.z = getRandomBetween(0, 50, 1);
  if (isRotation.value) {
    q.body.selected.rotation.x = getRandomBetween(0, 0.01, 3);
    q.body.selected.rotation.y = getRandomBetween(0, 0.01, 3);
    q.body.selected.rotation.z = getRandomBetween(0, 0.01, 3);
  } else {
    q.body.selected.rotation.x = 0;
    q.body.selected.rotation.y = 0;
    q.body.selected.rotation.z = 0;
  }
  const _resolution = getRandomBetween(30, 300, 1);
  q.body.selected.resolution(_resolution);
  resolution.value = _resolution;
  wireframe.value = getRandomBoolean();
  q.body.selected.skins.tricolor.wireframe = wireframe.value;
  q.body.selected.colors(
    getRandomHexColor(),
    getRandomHexColor(),
    getRandomHexColor()
  );
};

const switchRotation = () => {
  if (!isRotation.value) {
    rotation.value = 0;
  } else {
    rotation.value = 0.01;
  }
};

onMounted(() => {
  watch(vecs, (v) => {
    q.body.selected.vec.x = v;
    q.body.selected.vec.y = v;
    q.body.selected.vec.z = v;
    q.save(q.body);
  });
  watch(time, (v) => {
    q.body.selected.time.x = v;
    q.body.selected.time.y = v;
    q.body.selected.time.z = v;
    q.save(q.body);
  });
  watch(rotation, (v) => {
    if (v === 0) {
      isRotation.value = false;
    } else {
      isRotation.value = true;
    }
    if (!isRotation.value) {
      rotation.value = 0;
      q.body.selected.rotation.x = 0;
      q.body.selected.rotation.y = 0;
      q.body.selected.rotation.z = 0;
      return;
    }
    q.body.selected.rotation.x = v;
    q.body.selected.rotation.y = v;
    q.body.selected.rotation.z = v;
  });

  watchEffect(() => {
    q.body.selected.resolution(resolution.value);
  });
});

</script>

<style scoped>
/* .title-font {
  font-family: "Mona Sans";
  src: url("~/assets/fonts/Mona-Sans.woff2")
  format("woff2 supports variations"),
    url("~/assets/fonts/Mona-Sans.woff2") format("woff2-variations");
  font-weight: 100 1200;
  letter-spacing: 0.1rem;
} */
</style>

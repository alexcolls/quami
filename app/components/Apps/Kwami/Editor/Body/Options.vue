<template>
  <CommonAccordion title="OPTIONS">
    <div class="flex w-full mt-2">
      <div class="ml-2 w-1/3 text-gray-950 dark:text-white font-semibold">
        Size
      </div>
      <CommonRange
        v-model="size"
        :step="1"
        :min="1"
        :max="100"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
          w-16 ml-2"
      >
        {{ size }}
      </div>
      <UToggle
        v-model="audioResolution"
        on-icon="i-icon-park-solid-music-one"
        off-icon="i-icon-park-solid-music-one"
        name="wireframe"
        label="Wireframe"
        class="mr-2"
      />
    </div>
    <div class="flex w-full mt-2">
      <div class="ml-2 w-1/3 text-gray-950 dark:text-white font-semibold">
        Resolution
      </div>
      <CommonRange
        v-model="resolution"
        :step="1"
        :min="1"
        :max="1000"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ resolution }}
      </div>
      <UToggle
        v-model="audioResolution"
        on-icon="i-icon-park-solid-music-one"
        off-icon="i-icon-park-solid-music-one"
        name="wireframe"
        label="Wireframe"
        class="mr-2"
      />
    </div>
    <div class="flex w-full mt-2">
      <div class="ml-2 w-1/3 text-gray-950 dark:text-white font-semibold">
        Spikes
      </div>
      <CommonRange
        v-model="spikes"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ spikes }}
      </div>
      <UToggle
        v-model="audioResolution"
        on-icon="i-icon-park-solid-music-one"
        off-icon="i-icon-park-solid-music-one"
        name="wireframe"
        label="Wireframe"
        class="mr-2"
      />
    </div>
    <div class="flex w-full mt-2 border-l ml-4">
      <div
        class="ml-1 px-2 pr-3 w-1/4 text-gray-950 dark:text-gray-100
          font-semibold"
      >
        X
      </div>
      <CommonRange
        v-model="q.body.selected.vec.x"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ q.body.selected.vec.x }}
      </div>
      <UToggle
        v-model="audioResolution"
        on-icon="i-icon-park-solid-music-one"
        off-icon="i-icon-park-solid-music-one"
        name="wireframe"
        label="Wireframe"
        class="mr-[24px]"
      />
    </div>
    <div class="flex w-full pt-2 border-l ml-4">
      <div
        class="ml-2 px-2 w-1/4 text-gray-950 dark:text-gray-100
          font-semibold"
      >
        Y
      </div>
      <CommonRange
        v-model="q.body.selected.vec.y"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ q.body.selected.vec.x }}
      </div>
      <UToggle
        v-model="audioResolution"
        on-icon="i-icon-park-solid-music-one"
        off-icon="i-icon-park-solid-music-one"
        name="wireframe"
        label="Wireframe"
        class="mr-[24px]"
      />
    </div>
    <div class="flex w-full pt-2 border-l ml-4">
      <div
        class="ml-2 px-2 w-1/4 text-gray-950 dark:text-gray-100
          font-semibold"
      >
        Z
      </div>
      <CommonRange
        v-model="q.body.selected.vec.z"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ q.body.selected.vec.z }}
      </div>
      <UToggle
        v-model="audioResolution"
        on-icon="i-icon-park-solid-music-one"
        off-icon="i-icon-park-solid-music-one"
        name="wireframe"
        label="Wireframe"
        class="mr-[24px]"
      />
    </div>

    <div class="flex w-full">
      <h1 class="font-extrabold px-3">
        TIME
      </h1>
      <h2>
        {{ time }}
      </h2>
      <div class="pt-1 ml-4 mr-2 w-full">
        <URange
          v-model="time"
          :step="0.01"
          :min="0"
          :max="100"
          size="md"
          :ui="{
            progress: {
              base: 'opacity-50',
            },
          }"
        />
      </div>
    </div>
    <div>
      <div class="flex w-full">
        <div class="px-4 w-32">
          X {{ q.body.selected.time.x }}
        </div>
        <div class="px-2 py-2 w-full">
          <URange
            v-model="q.body.selected.time.x"
            :step="0.1"
            :min="0"
            :max="100"
            size="sm"
            :ui="{
              progress: {
                base: 'opacity-50',
              },
            }"
          />
        </div>
      </div>
      <div class="flex w-full">
        <div class="px-4 w-32">
          Y {{ q.body.selected.time.y }}
        </div>
        <div class="px-2 py-2 w-full">
          <URange
            v-model="q.body.selected.time.y"
            :step="0.1"
            :min="0"
            :max="100"
            size="sm"
            :ui="{
              progress: {
                base: 'opacity-50',
              },
            }"
          />
        </div>
      </div>
      <div class="flex w-full">
        <div class="px-4 w-32">
          Z {{ q.body.selected.time.z }}
        </div>
        <div class="px-2 py-2 w-full">
          <URange
            v-model="q.body.selected.time.z"
            :step="0.1"
            :min="0"
            :max="100"
            size="sm"
            :ui="{
              progress: {
                base: 'opacity-50',
              },
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <h1 class="font-extrabold px-3">
        ROTATION
      </h1>
      <UToggle
        v-model="isRotation"
        name="rotation"
        label="Rotation"
        @change="switchRotation"
      />
      <div class="pt-1 ml-4 mr-2 w-full">
        <URange
          v-model="rotation"
          :step="0.0001"
          :min="0"
          :max="0.1"
          size="md"
          :ui="{
            progress: {
              base: 'opacity-50',
            },
          }"
        />
      </div>
    </div>
    <Common v-if="isRotation">
      <div class="flex w-full">
        <div class="px-4 w-32">
          X {{ q.body.selected.rotation.x }}
        </div>
        <div class="px-2 py-2 w-full">
          <URange
            v-model="q.body.selected.rotation.x"
            :step="0.0001"
            :min="0"
            :max="0.1"
            size="sm"
            :ui="{
              progress: {
                base: 'opacity-50',
              },
            }"
          />
        </div>
      </div>
      <div class="flex w-full">
        <div class="px-4 w-32">
          Y {{ q.body.selected.rotation.y }}
        </div>
        <div class="px-2 py-2 w-full">
          <URange
            v-model="q.body.selected.rotation.y"
            :step="0.0001"
            :min="0"
            :max="0.1"
            size="sm"
            :ui="{
              progress: {
                base: 'opacity-50',
              },
            }"
          />
        </div>
      </div>
      <div class="flex w-full">
        <div class="px-4 w-32">
          Z {{ q.body.selected.rotation.z }}
        </div>
        <div class="px-2 py-2 w-full">
          <URange
            v-model="q.body.selected.rotation.z"
            :step="0.0001"
            :min="0"
            :max="0.1"
            size="sm"
            :ui="{
              progress: {
                base: 'opacity-50',
              },
            }"
          />
        </div>
      </div>
    </common>
  </CommonAccordion>
</template>

<script setup lang="ts">
// import {
//   getRandomHexColor,
//   getRandomBetween,
//   getRandomBoolean
// } from '~/@kwami/utils/randoms';

const { q } = useStore();

const spikes = ref(12);
const time = ref(12);
const rotation = ref(0);
const isRotation = ref(false);
const resolution = ref(20);
const size = ref(60);

const audioResolution = ref(false);

watch(size, (v) => {
  q.body.camera.fov = 110 - v;
  q.body.camera.updateProjectionMatrix();
}, { immediate: true });

onMounted(() => {
  watch(spikes, (v) => {
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

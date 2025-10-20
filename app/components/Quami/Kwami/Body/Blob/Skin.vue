<template>
  <div class="border p-2 rounded-lg border-gray-500/50">
    <CommonText class="font-bold text-white mb-2">
      Options
    </CommonText>
    <div class="flex justify-between text-center mt-2 ml-3">
      <div class="flex space-x-2">
        <CommonText class="pl-2 pt-0.5">
          Colors
        </CommonText>
        <CommonText class="pt-0.5 font-bold">
          x
        </CommonText>
        <input
          v-model="colorX"
          type="color"
          class="cursor-pointer"
        >
        <CommonText class="pt-0.5 font-bold">
          y
        </CommonText>
        <input
          v-model="colorY"
          type="color"
          class="cursor-pointer"
        >
        <CommonText class="pt-0.5 font-bold">
          z
        </CommonText>
        <input
          v-model="colorZ"
          type="color"
          class="cursor-pointer"
        >
        <UTooltip
          text="Randomize colors"
          class="pl-2"
        >
          <CommonBtnRandom
            @click="getRandomXYZColor"
          />
        </UTooltip>
      </div>
      <div class="flex space-x-2 pr-4">
        <CommonText class="pl-2 pt-0.5">
          Wireframe
        </CommonText>
        <USwitch
          v-model="wireframe"
          name="syncColors"
          label="Syncronize"
        />
      </div>
    </div>
    <div class="flex w-full p-4">
      <CommonText class="w-1/3 text-gray-950">
        Resolution
      </CommonText>
      <CommonRange
        v-model="resolution"
        :step="options.resolution.step"
        :min="options.resolution.min"
        :max="options.resolution.max"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ resolution }}
      </div>
    </div>
    <div class="flex w-full pt-4">
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
    </div>
    <div class="flex w-full mt-2">
      <div class="ml-2 w-1/3 text-gray-950 dark:text-white font-semibold">
        Spikes
      </div>
      <CommonRange
        v-model="spikes"
        :step="options.spikes.step"
        :min="options.spikes.min"
        :max="options.spikes.max"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ spikes }}
      </div>
    </div>
    <div class="flex w-full mt-2 border-l ml-4">
      <div
        class="ml-1 px-2 pr-3 w-1/4 text-gray-950 dark:text-gray-100
          font-semibold"
      >
        X
      </div>
      <CommonRange
        v-model="spikesX"
        :step="options.spikes.step"
        :min="options.spikes.min"
        :max="options.spikes.max"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ spikesX }}
      </div>
    </div>
    <div class="flex w-full pt-2 border-l ml-4">
      <div
        class="ml-2 px-2 w-1/4 text-gray-950 dark:text-gray-100
          font-semibold"
      >
        Y
      </div>
      <CommonRange
        v-model="spikesY"
        :step="options.spikes.step"
        :min="options.spikes.min"
        :max="options.spikes.max"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ spikesY }}
      </div>
    </div>
    <div class="flex w-full pt-2 border-l ml-4">
      <div
        class="ml-2 px-2 w-1/4 text-gray-950 dark:text-gray-100
          font-semibold"
      >
        Z
      </div>
      <CommonRange
        v-model="spikesZ"
        :step="options.spikes.step"
        :min="options.spikes.min"
        :max="options.spikes.max"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ spikesZ }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRandomHexColor, defaultBlobConfig } from '~/@kwami';

const options = defaultBlobConfig;

const { q } = useStore();

const colorX = ref(getRandomHexColor());
const colorY = ref(getRandomHexColor());
const colorZ = ref(getRandomHexColor());
const spikesX = ref(12);
const spikesY = ref(12);
const spikesZ = ref(12);
const spikes = ref(12);
const time = ref(12);
const rotation = ref(0);
const isRotation = ref(false);
const resolution = ref();
const size = ref(60);
const wireframe = ref(false);

// const switchRotation = () => {
//   if (!isRotation.value) {
//     rotation.value = 0;
//   } else {
//     rotation.value = 0.01;
//   }
// };

const getRandomXYZColor = () => {
  colorX.value = getRandomHexColor();
  colorY.value = getRandomHexColor();
  colorZ.value = getRandomHexColor();
};

onMounted(() => {
  watch(colorX, (v) => {
    if (q.body) q.body.body.blob.setColor('x', v);
  });
  watch(() => q.body?.body.blob.colors.x, (v) => {
    if (v) {
      console.log('colorX', v);
      colorX.value = v;
    }
  });
  watch(colorY, (v) => {
    if (q.body) q.body.body.blob.setColor('y', v);
  });
  watch(colorZ, (v) => {
    if (q.body) q.body.body.blob.setColor('z', v);
  });
  watch(wireframe, (v) => {
    if (q.body) q.body.body.blob.setWireframe(v);
  });
  watch(resolution, (v) => {
    if (q.body) q.body.body.blob.setResolution(v);
  });
  watch(spikesX, (v) => {
    if (q.body) {
      q.body.body.blob.spikes.x = v;
      console.log('spikesX', v);
    }
  });
  watch(spikesY, (v) => {
    if (q.body) {
      q.body.body.blob.spikes.y = v;
      console.log('spikesY', v);
    }
  });
  watch(spikesZ, (v) => {
    if (q.body) {
      q.body.body.blob.spikes.z = v;
      console.log('spikesZ', v);
    }
  });
});

onMounted(() => {
  watchEffect(() => {
    if (q.body) {
      q.body.body.blob.setWireframe(wireframe.value);
    }
  });

  watch(size, (v) => {
    if (q.body) {
      q.body.body.getCamera().fov = 110 - v;
      q.body.body.getCamera().updateProjectionMatrix();
    }
  }, { immediate: true });
  watch(spikes, (v) => {
    if (!q.body) return;
    q.body.body.blob.spikes.x = v;
    q.body.body.blob.spikes.y = v;
    q.body.body.blob.spikes.z = v;
    q.save(q.body);
  });
  watch(time, (v) => {
    if (!q.body) return;
    q.body.body.blob.time.x = v;
    q.body.body.blob.time.y = v;
    q.body.body.blob.time.z = v;
    q.save(q.body);
  });
  watch(rotation, (v) => {
    if (!q.body) return;
    // Avoid writing to rotation.value here to prevent recursive updates
    isRotation.value = v !== 0;
    if (!isRotation.value) {
      if (
        q.body.body.blob.rotation.x !== 0
        || q.body.body.blob.rotation.y !== 0
        || q.body.body.blob.rotation.z !== 0
      ) {
        q.body.body.blob.rotation.x = 0;
        q.body.body.blob.rotation.y = 0;
        q.body.body.blob.rotation.z = 0;
      }
      return;
    }
    if (q.body.body.blob.rotation.x !== v) q.body.body.blob.rotation.x = v;
    if (q.body.body.blob.rotation.y !== v) q.body.body.blob.rotation.y = v;
    if (q.body.body.blob.rotation.z !== v) q.body.body.blob.rotation.z = v;
  });

  // Set resolution only when it changes
  watch(resolution, (v) => {
    if (q.body) q.body.body.blob.setResolution(v);
  }, { immediate: true });
});
</script>

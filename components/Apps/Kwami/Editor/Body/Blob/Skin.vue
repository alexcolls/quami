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
        <UToggle
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
    </div>
    <div class="flex w-full mt-2 border-l ml-4">
      <div
        class="ml-1 px-2 pr-3 w-1/4 text-gray-950 dark:text-gray-100
          font-semibold"
      >
        X
      </div>
      <CommonRange
        v-model="vecX"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ vecX }}
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
        v-model="vecY"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ vecY }}
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
        v-model="vecZ"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ vecZ }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRandomHexColor } from '~/@kwami/utils/randoms';
import options from '~/@kwami/core/body/lib/Blob/options';

const { q } = useStore();

const colorX = ref(getRandomHexColor());
const colorY = ref(getRandomHexColor());
const colorZ = ref(getRandomHexColor());
const vecX = ref(12);
const vecY = ref(12);
const vecZ = ref(12);
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
    q.body.blob.setColor('x', v);
  });
  watch(() => q.body.blob.colorX, (v) => {
    console.log('colorX', v);
    colorX.value = v;
  });
  watch(colorY, (v) => {
    q.body.blob.setColor('y', v);
  });
  watch(colorZ, (v) => {
    q.body.blob.setColor('z', v);
  });
  watch(wireframe, (v) => {
    q.body.blob.setWireframe(v);
  });
  // watch(() => q.body.blob.resolution, (v) => {
  //   resolution.value = v;
  // }, { immediate: true });
  watch(resolution, (v) => {
    q.body.blob.setResolution(v);
  });
  watch(vecX, (v) => {
    q.body.blob.spikes.x = v;
  });
  watch(vecY, (v) => {
    q.body.blob.spikes.y = v;
  });
  watch(vecZ, (v) => {
    q.body.blob.spikes.z = v;
  });

  // watch(() => q.body.blob.spikes.x, (v) => {
  //   vecX.value = v;
  // });
  // watch(() => q.body.blob.spikes.y, (v) => {
  //   vecY.value = v;
  // });
  // watch(() => q.body.blob.spike.z, (v) => {
  //   vecZ.value = v;
  // });
});

onMounted(() => {
  watchEffect(() => {
    q.body.blob.skins.tricolor.wireframe = wireframe.value;
  });

  watch(size, (v) => {
    q.body.camera.fov = 110 - v;
    q.body.camera.updateProjectionMatrix();
  }, { immediate: true });
  watch(spikes, (v) => {
    q.body.blob.spikes.x = v;
    q.body.blob.spikes.y = v;
    q.body.blob.spikes.z = v;
    q.save(q.body);
  });
  watch(time, (v) => {
    q.body.blob.time.x = v;
    q.body.blob.time.y = v;
    q.body.blob.time.z = v;
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
      q.body.blob.rotation.x = 0;
      q.body.blob.rotation.y = 0;
      q.body.blob.rotation.z = 0;
      return;
    }
    q.body.blob.rotation.x = v;
    q.body.blob.rotation.y = v;
    q.body.blob.rotation.z = v;
  });

  watchEffect(() => {
    q.body.blob.setResolution(resolution.value);
  });
});

</script>

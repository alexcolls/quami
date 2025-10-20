<template>
  <div class="border p-2 rounded-lg border-gray-500/50">
    <CommonText class="font-bold text-white mb-2">
      Options
    </CommonText>

    <!-- Skin Selector -->
    <div class="flex items-center space-x-2 mb-3 ml-3">
      <CommonText class="font-bold">
        Skin:
      </CommonText>
      <UButton
        :color="currentSkin === 'tricolor' ? 'primary' : 'gray'"
        size="xs"
        @click="changeSkin('tricolor')"
      >
        Tricolor
      </UButton>
      <UButton
        :color="currentSkin === 'zebra' ? 'primary' : 'gray'"
        size="xs"
        @click="changeSkin('zebra')"
      >
        Zebra
      </UButton>
    </div>

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
    <div class="flex w-full mt-2 items-center">
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
      <UTooltip text="Randomize spikes">
        <CommonBtnRandom
          @click="randomizeSpikes"
        />
      </UTooltip>
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

    <!-- Time Controls -->
    <div class="flex w-full mt-4 items-center">
      <div class="ml-2 w-1/3 text-gray-950 dark:text-white font-semibold">
        Time
      </div>
      <CommonRange
        v-model="time"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ time }}
      </div>
      <UTooltip text="Randomize time">
        <CommonBtnRandom
          @click="randomizeTime"
        />
      </UTooltip>
    </div>
    <div class="flex w-full mt-2 border-l ml-4">
      <div
        class="ml-1 px-2 pr-3 w-1/4 text-gray-950 dark:text-gray-100
          font-semibold"
      >
        X
      </div>
      <CommonRange
        v-model="timeX"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ timeX }}
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
        v-model="timeY"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ timeY }}
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
        v-model="timeZ"
        :step="0.1"
        :min="0"
        :max="20"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ timeZ }}
      </div>
    </div>

    <!-- Rotation Controls -->
    <div class="flex w-full mt-4 items-center">
      <div class="ml-2 w-1/3 text-gray-950 dark:text-white font-semibold">
        Rotation
      </div>
      <USwitch
        v-model="isRotation"
        name="rotation"
        label="Enable Rotation"
        class="mr-2"
      />
      <CommonRange
        v-model="rotation"
        :step="0.0001"
        :min="0"
        :max="0.1"
        :disabled="!isRotation"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ rotation.toFixed(4) }}
      </div>
      <UTooltip text="Randomize rotation">
        <CommonBtnRandom
          :disabled="!isRotation"
          @click="randomizeRotation"
        />
      </UTooltip>
    </div>
    <div v-if="isRotation">
      <div class="flex w-full mt-2 border-l ml-4">
        <div
          class="ml-1 px-2 pr-3 w-1/4 text-gray-950 dark:text-gray-100
            font-semibold"
        >
          X
        </div>
        <CommonRange
          v-model="rotationX"
          :step="0.0001"
          :min="0"
          :max="0.1"
          class="mt-1"
        />
        <div
          class="text-sm text-primary-800/50 dark:text-primary-200/90
                w-16 ml-2"
        >
          {{ rotationX.toFixed(4) }}
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
          v-model="rotationY"
          :step="0.0001"
          :min="0"
          :max="0.1"
          class="mt-1"
        />
        <div
          class="text-sm text-primary-800/50 dark:text-primary-200/90
                w-16 ml-2"
        >
          {{ rotationY.toFixed(4) }}
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
          v-model="rotationZ"
          :step="0.0001"
          :min="0"
          :max="0.1"
          class="mt-1"
        />
        <div
          class="text-sm text-primary-800/50 dark:text-primary-200/90
                w-16 ml-2"
        >
          {{ rotationZ.toFixed(4) }}
        </div>
      </div>
    </div>

    <!-- Shininess Control -->
    <div class="flex w-full mt-4">
      <div class="ml-2 w-1/3 text-gray-950 dark:text-white font-semibold">
        Shininess
      </div>
      <CommonRange
        v-model="shininess"
        :step="100"
        :min="0"
        :max="100000"
        class="mt-1"
      />
      <div
        class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
      >
        {{ shininess }}
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
const time = ref(1);
const timeX = ref(1);
const timeY = ref(1);
const timeZ = ref(1);
const rotation = ref(0);
const rotationX = ref(0);
const rotationY = ref(0);
const rotationZ = ref(0);
const isRotation = ref(false);
const resolution = ref();
const size = ref(60);
const wireframe = ref(false);
const shininess = ref(100);
const currentSkin = ref<'tricolor' | 'zebra'>('tricolor');

// Helper function to get random value in range
const getRandomInRange = (min: number, max: number, decimals: number = 2): number => {
  const value = Math.random() * (max - min) + min;
  return Number.parseFloat(value.toFixed(decimals));
};

// Randomize color
const getRandomXYZColor = () => {
  colorX.value = getRandomHexColor();
  colorY.value = getRandomHexColor();
  colorZ.value = getRandomHexColor();
};

// Randomize spikes values
const randomizeSpikes = () => {
  spikes.value = getRandomInRange(options.spikes.min, options.spikes.max, 1);
  spikesX.value = getRandomInRange(options.spikes.min, options.spikes.max, 1);
  spikesY.value = getRandomInRange(options.spikes.min, options.spikes.max, 1);
  spikesZ.value = getRandomInRange(options.spikes.min, options.spikes.max, 1);
};

// Randomize time values
const randomizeTime = () => {
  time.value = getRandomInRange(0, 20, 1);
  timeX.value = getRandomInRange(0, 20, 1);
  timeY.value = getRandomInRange(0, 20, 1);
  timeZ.value = getRandomInRange(0, 20, 1);
};

// Randomize rotation values
const randomizeRotation = () => {
  if (!isRotation.value) return;
  rotation.value = getRandomInRange(0, 0.1, 4);
  rotationX.value = getRandomInRange(0, 0.1, 4);
  rotationY.value = getRandomInRange(0, 0.1, 4);
  rotationZ.value = getRandomInRange(0, 0.1, 4);
};

// Change skin
const changeSkin = (skin: 'tricolor' | 'zebra') => {
  currentSkin.value = skin;
  if (q.body) {
    q.body.body.blob.setSkin(skin);
  }
};

// Sync UI values from blob state
const syncFromBlob = () => {
  if (!q.body?.body.blob) return;

  const blob = q.body.body.blob;

  // Sync current skin
  currentSkin.value = blob.getCurrentSkin();

  // Sync colors
  if (blob.colors.x) colorX.value = blob.colors.x;
  if (blob.colors.y) colorY.value = blob.colors.y;
  if (blob.colors.z) colorZ.value = blob.colors.z;

  // Sync spikes
  spikesX.value = blob.spikes.x;
  spikesY.value = blob.spikes.y;
  spikesZ.value = blob.spikes.z;
  spikes.value = blob.spikes.x; // Use X as default

  // Sync time
  timeX.value = blob.time.x;
  timeY.value = blob.time.y;
  timeZ.value = blob.time.z;
  time.value = blob.time.x; // Use X as default

  // Sync rotation
  rotationX.value = blob.rotation.x;
  rotationY.value = blob.rotation.y;
  rotationZ.value = blob.rotation.z;
  rotation.value = blob.rotation.x; // Use X as default
  isRotation.value = blob.rotation.x !== 0 || blob.rotation.y !== 0 || blob.rotation.z !== 0;

  // Sync DNA
  if (blob.dna) {
    // DNA sync handled by parent component
  }
};

onMounted(() => {
  // Initialize blob with random values on first load
  watch(() => q.body?.body.blob, (blob) => {
    if (blob) {
      // Randomize blob on initial load
      blob.setRandomBlob();

      // Then sync all UI values from the blob
      nextTick(() => {
        syncFromBlob();
      });
    }
  }, { immediate: true });

  // Bidirectional sync watchers for blob state changes
  watch(() => q.body?.body.blob.spikes, (spikesObj) => {
    if (spikesObj) {
      spikesX.value = spikesObj.x;
      spikesY.value = spikesObj.y;
      spikesZ.value = spikesObj.z;
    }
  }, { deep: true });

  watch(() => q.body?.body.blob.time, (timeObj) => {
    if (timeObj) {
      timeX.value = timeObj.x;
      timeY.value = timeObj.y;
      timeZ.value = timeObj.z;
    }
  }, { deep: true });

  watch(() => q.body?.body.blob.rotation, (rotationObj) => {
    if (rotationObj) {
      rotationX.value = rotationObj.x;
      rotationY.value = rotationObj.y;
      rotationZ.value = rotationObj.z;
      isRotation.value = rotationObj.x !== 0 || rotationObj.y !== 0 || rotationObj.z !== 0;
    }
  }, { deep: true });

  watch(() => q.body?.body.blob.colors, (colorsObj) => {
    if (colorsObj) {
      if (colorsObj.x) colorX.value = colorsObj.x;
      if (colorsObj.y) colorY.value = colorsObj.y;
      if (colorsObj.z) colorZ.value = colorsObj.z;
    }
  }, { deep: true });

  // Color watchers - UI to Blob
  watch(colorX, (v) => {
    if (q.body && q.body.body.blob.colors.x !== v) {
      q.body.body.blob.setColor('x', v);
    }
  });
  watch(colorY, (v) => {
    if (q.body && q.body.body.blob.colors.y !== v) {
      q.body.body.blob.setColor('y', v);
    }
  });
  watch(colorZ, (v) => {
    if (q.body && q.body.body.blob.colors.z !== v) {
      q.body.body.blob.setColor('z', v);
    }
  });

  // Wireframe watcher
  watch(wireframe, (v) => {
    if (q.body) q.body.body.blob.setWireframe(v);
  });

  // Resolution watcher
  watch(resolution, (v) => {
    if (q.body) q.body.body.blob.setResolution(v);
  }, { immediate: true });

  // Size watcher (affects camera FOV) - Initialize immediately
  watchEffect(() => {
    if (q.body) {
      const camera = q.body.body.getCamera();
      camera.fov = 110 - size.value;
      camera.updateProjectionMatrix();
    }
  });

  // Spikes watchers - General (syncs all axes)
  watch(spikes, (v) => {
    if (!q.body) return;
    q.body.body.blob.spikes.x = v;
    q.body.body.blob.spikes.y = v;
    q.body.body.blob.spikes.z = v;
    spikesX.value = v;
    spikesY.value = v;
    spikesZ.value = v;
    q.save(q.body);
  });

  // Spikes watchers - Individual axes
  watch(spikesX, (v) => {
    if (q.body && q.body.body.blob.spikes.x !== v) {
      q.body.body.blob.spikes.x = v;
      console.log('spikesX', v);
    }
  });
  watch(spikesY, (v) => {
    if (q.body && q.body.body.blob.spikes.y !== v) {
      q.body.body.blob.spikes.y = v;
      console.log('spikesY', v);
    }
  });
  watch(spikesZ, (v) => {
    if (q.body && q.body.body.blob.spikes.z !== v) {
      q.body.body.blob.spikes.z = v;
      console.log('spikesZ', v);
    }
  });

  // Time watchers - General (syncs all axes)
  watch(time, (v) => {
    if (!q.body) return;
    q.body.body.blob.time.x = v;
    q.body.body.blob.time.y = v;
    q.body.body.blob.time.z = v;
    timeX.value = v;
    timeY.value = v;
    timeZ.value = v;
    q.save(q.body);
  });

  // Time watchers - Individual axes
  watch(timeX, (v) => {
    if (q.body && q.body.body.blob.time.x !== v) {
      q.body.body.blob.time.x = v;
      console.log('timeX', v);
    }
  });
  watch(timeY, (v) => {
    if (q.body && q.body.body.blob.time.y !== v) {
      q.body.body.blob.time.y = v;
      console.log('timeY', v);
    }
  });
  watch(timeZ, (v) => {
    if (q.body && q.body.body.blob.time.z !== v) {
      q.body.body.blob.time.z = v;
      console.log('timeZ', v);
    }
  });

  // Rotation toggle watcher
  watch(isRotation, (v) => {
    if (!q.body) return;
    if (!v) {
      // Disable rotation
      rotation.value = 0;
      rotationX.value = 0;
      rotationY.value = 0;
      rotationZ.value = 0;
      q.body.body.blob.rotation.x = 0;
      q.body.body.blob.rotation.y = 0;
      q.body.body.blob.rotation.z = 0;
    } else {
      // Enable rotation with default value
      rotation.value = 0.01;
      rotationX.value = 0.01;
      rotationY.value = 0.01;
      rotationZ.value = 0.01;
    }
  });

  // Rotation watchers - General (syncs all axes)
  watch(rotation, (v) => {
    if (!q.body) return;
    if (!isRotation.value) return;
    q.body.body.blob.rotation.x = v;
    q.body.body.blob.rotation.y = v;
    q.body.body.blob.rotation.z = v;
    rotationX.value = v;
    rotationY.value = v;
    rotationZ.value = v;
    q.save(q.body);
  });

  // Rotation watchers - Individual axes
  watch(rotationX, (v) => {
    if (q.body && isRotation.value && q.body.body.blob.rotation.x !== v) {
      q.body.body.blob.rotation.x = v;
      console.log('rotationX', v);
    }
  });
  watch(rotationY, (v) => {
    if (q.body && isRotation.value && q.body.body.blob.rotation.y !== v) {
      q.body.body.blob.rotation.y = v;
      console.log('rotationY', v);
    }
  });
  watch(rotationZ, (v) => {
    if (q.body && isRotation.value && q.body.body.blob.rotation.z !== v) {
      q.body.body.blob.rotation.z = v;
      console.log('rotationZ', v);
    }
  });

  // Shininess watcher
  watch(shininess, (v) => {
    if (q.body) {
      q.body.body.blob.setShininess(v);
      console.log('shininess', v);
    }
  });
});
</script>

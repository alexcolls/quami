<template>
  <CommonMagicModalBtn
    icon="i-icon-park-solid-ghost"
    :window-name="$t('createYourQuami')"
    class="w-[400px] lg:w-[500px] h-fit"
  >
    <div class="sm:p-6 px-4 pt-5 pb-4">
      <div class="mt-5 sm:mt-6">
        <UTabs :items="items">
          <template #item="{ item }">
            <div v-if="item.key === 'body'" class="space-y-3 p-2">
              <h1 class="font-extrabold">
                SKIN
              </h1>
              <div class="flex">
                <input
                  v-model="colorX"
                  type="color"
                  class="rounded-xl w-8 bg-transparent border-0"
                >
                <input
                  v-model="colorY"
                  type="color"
                  class="rounded-xl w-8 bg-transparent border-0"
                >
                <input
                  v-model="colorZ"
                  type="color"
                  class="rounded-xl w-8 bg-transparent border-0"
                >
                <UButton
                  icon="i-heroicons-cube-transparent-16-solid"
                  class="ml-4"
                  @click="getRandomXYZColor"
                />
                <UToggle
                  v-model="wireframe"
                  name="syncColors"
                  label="Syncronize"
                />
              </div>
              <div class="w-full">
                <div class="flex w-full">
                  <h1 class="font-extrabold mr-2">
                    SIZE
                  </h1>
                  {{ size }} px
                </div>
                <div class="w-full mt-2">
                  <URange
                    v-model="size"
                    :step="1"
                    :min="1"
                    :max="300"
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="flex w-full">
                  <h1 class="font-extrabold mr-2">
                    RESOLUTION
                  </h1>
                  {{ resolution }} px
                </div>
                <div class="w-full mt-2">
                  <URange
                    v-model="resolution"
                    :step="1"
                    :min="1"
                    :max="300"
                  />
                </div>
              </div>
              <div class="flex w-full">
                <h1 class="font-extrabold px-3">
                  VECTOR
                </h1>
                <h2>
                  {{ Math.round(vecs * 100 + 1) }}
                </h2>
                <div class="pt-1 ml-4 mr-2 w-full">
                  <URange
                    v-model="vecs"
                    :step="0.01"
                    :min="0"
                    :max="20"
                    size="md"
                  />
                </div>
              </div>
              <div>
                <div class="flex w-full">
                  <div class="px-4 w-32">
                    X {{ q.body.selected.vec.x }}
                  </div>
                  <div class="px-2 py-2 w-full">
                    <URange
                      v-model="q.body.selected.vec.x"
                      :step="0.1"
                      :min="0"
                      :max="20"
                      size="sm"
                    />
                  </div>
                </div>
                <div class="flex w-full">
                  <div class="px-4 w-32">
                    Y {{ q.body.selected.vec.y }}
                  </div>
                  <div class="px-2 py-2 w-full">
                    <URange
                      v-model="q.body.selected.vec.y"
                      :step="0.1"
                      :min="0"
                      :max="20"
                      size="sm"
                    />
                  </div>
                </div>
                <div class="flex w-full">
                  <div class="px-4 w-32">
                    Z {{ q.body.selected.vec.z }}
                  </div>
                  <div class="px-2 py-2 w-full">
                    <URange
                      v-model="q.body.selected.vec.z"
                      :step="0.1"
                      :min="0"
                      :max="20"
                      size="sm"
                    />
                  </div>
                </div>
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
                  />
                </div>
              </div>
              <div v-if="isRotation">
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
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <UButton
                icon="i-heroicons-cube-transparent-16-solid"
                class="ml-4"
                @click="getRandomQuami"
              />
            </div>
          </template>
        </UTabs>
        <!-- <RadarChart /> -->
      </div>
    </div>
  </CommonMagicModalBtn>
</template>

<script setup lang="ts">
import {
  getRandomHexColor,
  getRandomBetween,
  getRandomBoolean
} from '~/@kwami/utils/randoms';

const items = [{
  key: 'body',
  label: 'Body'
}, {
  key: 'mind',
  label: 'Mind'
}];

const { q } = useStore();

const colorX = ref('');
const colorY = ref('');
const colorZ = ref('');

const vecs = ref(12);
const time = ref(12);
const rotation = ref(0);
const isRotation = ref(false);
const wireframe = ref(false);
const resolution = ref(20);
const size = ref(100);

const getRandomXYZColor = () => {
  colorX.value = getRandomHexColor();
  colorY.value = getRandomHexColor();
  colorZ.value = getRandomHexColor();
};

const getRandomQuami = () => {
  q.body.selected.vec.x = getRandomBetween(0, 5, 2);
  q.body.selected.vec.y = getRandomBetween(0, 5, 2);
  q.body.selected.vec.z = getRandomBetween(0, 5, 2);
  q.body.selected.time.x = getRandomBetween(0, 100, 1);
  q.body.selected.time.y = getRandomBetween(0, 100, 1);
  q.body.selected.time.z = getRandomBetween(0, 100, 1);
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
  getRandomXYZColor();
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
  });
  watch(time, (v) => {
    q.body.selected.time.x = v;
    q.body.selected.time.y = v;
    q.body.selected.time.z = v;
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
    q.body.selected.colors(
      colorX.value,
      colorY.value,
      colorZ.value
    );
  });

  watchEffect(() => {
    q.body.selected.skins.tricolor.wireframe = wireframe.value;
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

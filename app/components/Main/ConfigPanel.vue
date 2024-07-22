<template>
  <CommonModal>
    <div class="sm:p-6 px-4 pt-5 pb-4">
      <div>
        <div
          class="text-lg text-center leading-6 font-medium
        text-gray-900 dark:text-white"
        >
          Connect your wallet to login
        </div>
        <div class="mt-2">
          <p class="text-sm leading-5 text-gray-900 dark:text-white">
            blablabla
          </p>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <UTabs :items="items">
          <template #item="{ item }">
            <div v-if="item.key === 'body'" class="space-y-3 p-2">
              <h1 class="font-extrabold">
                SKIN
              </h1>
              <div class="flex">
                <UInput
                  v-model="colorX"
                  type="color"
                  class="rounded-xl w-8 bg-transparent border-0"
                />
                <UInput
                  v-model="colorY"
                  type="color"
                  class="rounded-xl w-8 bg-transparent border-0"
                />
                <UInput
                  v-model="colorZ"
                  type="color"
                  class="rounded-xl w-8 bg-transparent border-0"
                />
                <UButton
                  icon="i-heroicons-cube-transparent-16-solid"
                  @click="getRandomXYZColor"
                />
              </div>
              <div class="flex">
                <h1 class="font-extrabold px-3">
                  VECTORSSS
                </h1>
                <UCheckbox
                  v-model="syncVectors"
                  name="syncVectors"
                  label="Syncronize"
                />
              </div>
              <div v-if="syncVectors">
                <div class="px-4">
                  <h2>
                    Vector XYZ {{ vecsValue }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="vecsValue"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="3"
                  />
                </div>
              </div>
              <div v-else>
                <div class="px-4">
                  <h2>
                    Vector X {{ q.kwami.body.vec.x }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="q.kwami.body.vec.x"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="4"
                  />
                </div>
                <div class="px-4">
                  <h2>
                    Vector Y {{ q.kwami.body.vec.y }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="q.kwami.body.vec.y"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="4"
                  />
                </div>
                <div>
                  <div class="px-4">
                    <h2>
                      Vector Z {{ q.kwami.body.vec.z }}
                    </h2>
                  </div>
                  <div class="px-2">
                    <URange
                      v-model="q.kwami.body.vec.z"
                      :step="0.01"
                      color="green"
                      :min="0"
                      :max="4"
                    />
                  </div>
                </div>
              </div>
              <div class="flex">
                <h1 class="font-extrabold px-3">
                  TIME
                </h1>
                <UCheckbox
                  v-model="syncTime"
                  name="syncTime"
                  label="Syncronize"
                />
              </div>
              <div v-if="syncTime">
                <div class="px-4">
                  <h2>
                    Time XYZ {{ timeValue }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="timeValue"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="100"
                  />
                </div>
              </div>
              <div v-else>
                <div class="px-4">
                  <h2>
                    Time X {{ q.kwami.body.time.x }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="q.kwami.body.time.x"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="100"
                  />
                </div>
                <div class="px-4">
                  <h2>
                    Time Y {{ q.kwami.body.time.y }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="q.kwami.body.time.y"
                    ::step="0.01"
                    color="green"
                    :min="0"
                    :max="100"
                  />
                </div>
                <div class="px-4">
                  <h2>
                    Time Z {{ q.kwami.body.time.z }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="q.kwami.body.time.z"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="100"
                  />
                </div>
              </div>
              <div class="flex">
                <h1 class="font-extrabold px-3">
                  AUDIO
                </h1>
                <UCheckbox
                  v-model="syncAudio"
                  name="syncTime"
                  label="Syncronize"
                />
              </div>
              <div v-if="syncAudio">
                <div class="px-4">
                  <h2>
                    Audio XYZ {{ audioValue }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="audioValue"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="100"
                  />
                </div>
              </div>
              <div v-else>
                <div class="grid grid-cols-8">
                  <div class="col-start-1 col-end-4 border border-gray-800/20">
                    <h2 class="text-sm text-gray-200 m-2">
                      x {{ q.kwami.body.audio.x }}
                    </h2>
                  </div>
                  <div class="col-start-4 col-end-8 px-2">
                    <URange
                      v-model="q.kwami.body.audio.x"
                      :step="0.01"
                      color="green"
                      :min="0"
                      :max="100"
                    />
                  </div>
                </div>
                <div class="px-4">
                  <h2>
                    Audio Y {{ q.kwami.body.audio.y }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="q.kwami.body.audio.y"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="100"
                  />
                </div>
                <div class="px-4">
                  <h2>
                    Audio Z {{ q.kwami.body.audio.z }}
                  </h2>
                </div>
                <div class="px-2">
                  <URange
                    v-model="q.kwami.body.audio.z"
                    :step="0.01"
                    color="green"
                    :min="0"
                    :max="100"
                  />
                </div>
              </div>
            </div>
            <div v-if="item.key === 'mind'" class="space-y-3">
              <div class="px-4">
                <h2>
                  Resolution {{ q.kwami.body.vec.x }}
                </h2>
              </div>
              <div class="px-2">
                <URange
                  v-model="q.kwami.body.vec.x"
                  :step="0.1"
                  color="purple"
                  :min="0"
                  :max="20"
                />
              </div>
              <!-- <button class="p-2 bg-blue-200" @click="getLangs">
                Get Langs
              </button> -->
            </div>
          </template>
        </UTabs>
        <!-- <RadarChart /> -->
      </div>
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
// import { useKwamiStore } from '~/stores/kwamiStore';
import { getRandomHexColor } from '~/@kwami/utils/randoms';

// const getLangs = async () => {
//   const { data } = await useFetch('/api/langs', {
//     suspense: true,
//     onError: error => console.log('error', error),
//     onNewData: newData => console.log('newdata', newData)
//   });
//   console.log('langs', toRaw(data.value));
//   const runtimeConfig = useRuntimeConfig();
//   console.log(runtimeConfig);
// };

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

const syncVectors = ref(true);
const vecsValue = ref(0);
const syncTime = ref(true);
const timeValue = ref(0);

const syncAudio = ref(true);
const audioValue = ref(0);

const getRandomXYZColor = () => {
  colorX.value = getRandomHexColor();
  colorY.value = getRandomHexColor();
  colorZ.value = getRandomHexColor();
};

onMounted(() => {
  watchEffect(() => {
    if (syncVectors.value) {
      q.kwami.body.vec.x = vecsValue.value;
      q.kwami.body.vec.y = vecsValue.value;
      q.kwami.body.vec.z = vecsValue.value;
    } else {
      vecsValue.value = Math.floor(((
        q.kwami.body.vec.x +
        q.kwami.body.vec.y +
        q.kwami.body.vec.z) / 3) * 100) / 100;
    }
  });

  watchEffect(() => {
    if (syncTime.value) {
      q.kwami.body.time.x = timeValue.value;
      q.kwami.body.time.y = timeValue.value;
      q.kwami.body.time.z = timeValue.value;
    }
  });

  watchEffect(() => {
    if (syncAudio.value) {
      q.kwami.body.audio.x = audioValue.value;
      q.kwami.body.audio.y = audioValue.value;
      q.kwami.body.audio.z = audioValue.value;
    }
  });

  watchEffect(() => {
    q.kwami.body.colors(
      colorX.value,
      colorY.value,
      colorZ.value
    );
  });
});

</script>

<style scoped>
.title-font {
  font-family: "Mona Sans";
  src: url("~/assets/fonts/Mona-Sans.woff2")
  format("woff2 supports variations"),
    url("~/assets/fonts/Mona-Sans.woff2") format("woff2-variations");
  font-weight: 100 1200;
  letter-spacing: 0.1rem;
}
</style>

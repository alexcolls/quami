<template>
  <CommonAccordion title="BLOB" :is-open="true" icon="i-heroicons-user">
    <div class="flex justify-start mb-2 -ml-2">
      <UButton
        icon="i-mdi-dice-multiple"
        class="ml-4"
        :label="$t('randomDNA')"
        @click="() => {
          q.body.blob.setRandomBlob();
          onNewDNA();
        }"
      />
      <div>
        <CommonText class="ml-4 text-xs">
          {{ $t('dna') }}
        </CommonText>
        <CommonTextGradient class="ml-4 text-xs mt-1">
          {{ dna }}
        </CommonTextGradient>
      </div>
    </div>
    <AppsKwamiEditorBodyBlobSkin />
    <!-- <div>

      <div class="flex w-full mt-2">

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
          v-model="audioEffects.spikes"
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
          v-model="q.body.blob.spikes.x"
          :step="0.1"
          :min="0"
          :max="20"
          class="mt-1"
        />
        <div
          class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
        >
          {{ q.body.blob.spikes.x }}
        </div>
        <UToggle
          v-model="audioEffects.vecX"
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
          v-model="q.body.blob.spikes.y"
          :step="0.1"
          :min="0"
          :max="20"
          class="mt-1"
        />
        <div
          class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
        >
          {{ q.body.blob.spikes.y }}
        </div>
        <UToggle
          v-model="audioEffects.vecX"
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
          v-model="q.body.blob.spikes.z"
          :step="0.1"
          :min="0"
          :max="20"
          class="mt-1"
        />
        <div
          class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
        >
          {{ q.body.blob.spikes.z }}
        </div>
        <UToggle
          v-model="audioEffects.vecZ"
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
            X {{ q.body.blob.time.x }}
          </div>
          <div class="px-2 py-2 w-full">
            <URange
              v-model="q.body.blob.time.x"
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
            Y {{ q.body.blob.time.y }}
          </div>
          <div class="px-2 py-2 w-full">
            <URange
              v-model="q.body.blob.time.y"
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
            Z {{ q.body.blob.time.z }}
          </div>
          <div class="px-2 py-2 w-full">
            <URange
              v-model="q.body.blob.time.z"
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
            X {{ q.body.blob.rotation.x }}
          </div>
          <div class="px-2 py-2 w-full">
            <URange
              v-model="q.body.blob.rotation.x"
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
            Y {{ rotation }}
          </div>
          <div class="px-2 py-2 w-full">
            <URange
              v-model="rotation"
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
            Z {{ q.body.blob.rotation.z }}
          </div>
          <div class="px-2 py-2 w-full">
            <URange
              v-model="q.body.blob.rotation.z"
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
    </div> -->
  </CommonAccordion>
</template>

<script setup lang="ts">
import { genDNA } from '~/@kwami/utils/randoms';

const { q } = useStore();

const dna = ref('');

const onNewDNA = () => {
  dna.value = genDNA();
  q.body.blob.dna = dna.value;
};

onMounted(() => {
  watch(() => q.body.blob.dna, (v) => {
    console.log(q.body.blob.dna);
    dna.value = v;
  }, { immediate: true });
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

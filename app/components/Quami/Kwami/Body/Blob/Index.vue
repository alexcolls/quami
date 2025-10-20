<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-3 px-2">
      <CommonH3 class="font-bold">
        BLOB BODY
      </CommonH3>
    </div>
    <div class="flex justify-start mb-2 flex-wrap gap-2 px-2">
      <UButton
        icon="i-mdi-dice-multiple"
        size="sm"
        :label="$t('randomDNA')"
        @click="() => {
          q.body?.body.blob.setRandomBlob();
          onNewDNA();
        }"
      />
      <UButton
        icon="i-heroicons-arrow-down-tray"
        size="sm"
        label="Export GLTF"
        @click="exportGLTF"
      />
      <div class="flex-1">
        <CommonText class="text-xs text-gray-500 dark:text-gray-400">
          {{ $t('dna') }}
        </CommonText>
        <CommonTextGradient class="text-xs mt-0.5">
          {{ dna }}
        </CommonTextGradient>
      </div>
    </div>
    <QuamiKwamiBodyBlobSkin />
  </div>
</template>

<script setup lang="ts">
import { genDNA } from '~/@kwami';

const { q } = useStore();

const dna = ref('');

const onNewDNA = () => {
  dna.value = genDNA();
  if (q.body) {
    q.body.body.blob.dna = dna.value;
  }
};

const exportGLTF = () => {
  if (q.body) {
    q.body.body.blob.exportGLTF();
  }
};

onMounted(() => {
  // Watch for DNA changes from blob
  watch(() => q.body?.body.blob.dna, (v) => {
    if (v) {
      console.log('DNA updated:', v);
      dna.value = v;
    }
  }, { immediate: true });

  // Initial sync after blob is ready
  watch(() => q.body?.body.blob, (blob) => {
    if (blob && blob.dna) {
      dna.value = blob.dna;
    }
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

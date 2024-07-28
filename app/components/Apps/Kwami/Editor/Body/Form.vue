<template>
  <UDivider />
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
        X {{ q.body.selected.vec.x }}
      </div>
      <div class="px-2 py-2 w-full">
        <URange
          v-model="q.body.selected.vec.x"
          :step="0.1"
          :min="0"
          :max="20"
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
        Y {{ q.body.selected.vec.y }}
      </div>
      <div class="px-2 py-2 w-full">
        <CommonRange
          v-model="q.body.selected.vec.y"
          :step="0.1"
          :min="0"
          :max="20"
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
</template>

<script setup lang="ts">

const { q } = useStore();

const vecs = ref(12);
const time = ref(12);

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

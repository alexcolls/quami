<template>
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
  </div>
</template>

<script setup lang="ts">

const { q } = useStore();

const rotation = ref(0);
const isRotation = ref(false);

const switchRotation = () => {
  if (!isRotation.value) {
    rotation.value = 0;
  } else {
    rotation.value = 0.01;
  }
};

onMounted(() => {
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
});

</script>

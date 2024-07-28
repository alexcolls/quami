<template>
  <div class="w-full">
    <div class="flex w-full">
      <h1 class="font-extrabold mr-2">
        SIZE
      </h1>
    </div>
    <div class="flex w-full mt-2">
      <UFormGroup label="Size" class="w-1/2">
        <div class="flex">
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
      </UFormGroup>
      <UFormGroup label="Resolution" class="w-1/2">
        <div class="flex">
          <CommonRange
            v-model="resolution"
            :step="1"
            :min="1"
            :max="300"
            class="mt-1"
          />
          <div
            class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
          >
            {{ resolution }}
          </div>
        </div>
      </UFormGroup>
    </div>
  </div>
  <div class="w-full">
    <div class="flex w-full">
      <h1 class="font-extrabold mr-2">
        RESOLUTION
      </h1>
      <span class="text-primary-800/50 dark:text-primary-200/90">
        {{ resolution }}
      </span>
      px
    </div>
    <div class="w-full mt-2">
      <URange
        v-model="resolution"
        :step="1"
        :min="1"
        :max="300"
        :ui="{
          progress: {
            base: 'opacity-50',
          },
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getRandomHexColor,
  getRandomBetween,
  getRandomBoolean
} from '~/@kwami/utils/randoms';

const { q } = useStore();

const vecs = ref(12);
const time = ref(12);
const rotation = ref(0);
const isRotation = ref(false);
const wireframe = ref(false);
const resolution = ref(20);
const size = ref(50);

watch(size, () => {
  q.body.camera.fov = 100 - size.value;
  q.body.camera.updateProjectionMatrix();
});

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

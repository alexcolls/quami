<template>
  <div class="">
    <h1 class="font-extrabold">
      SKIN
    </h1>
    <USelectMenu
      v-model="skin"
      :options="q.body.selected.skinOptions"
    />
    <div class="flex">
      <div class="rounded-full overflow-hidden -p-6">
        <input
          v-model="colorX"
          type="color"
          class="!rounded-full relative w-8 bg-transparent border-0"
        >
      </div>
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
      <CommonBtnRandom
        @click="getRandomXYZColor"
      />
      <UToggle
        v-model="wireframe"
        name="syncColors"
        label="Syncronize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getRandomHexColor
} from '~/@kwami/utils/randoms';

const { q } = useStore();

const colorX = ref('');
const colorY = ref('');
const colorZ = ref('');

const wireframe = ref(false);
const skin = ref(q.body.selected.skinOptions[0]);

const getRandomXYZColor = () => {
  colorX.value = getRandomHexColor();
  colorY.value = getRandomHexColor();
  colorZ.value = getRandomHexColor();
};

onMounted(() => {
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
    colorX.value = q.body.selected.skins.tricolor.uniforms._color1.value;
    colorY.value = q.body.selected.skins.tricolor.uniforms._color2.value;
    colorZ.value = q.body.selected.skins.tricolor.uniforms._color3.value;
  });

  watch(skin, (v) => {
    q.body.selected.setSkin(v);
  });
});

</script>

<template>
  <CommonAccordion title="SKIN" subtitle="" :is-open="false">
    <div
      class="mt-2 h-28 w-full border border-gray-600/30
          dark:border-gray-400/30 rounded-lg shadow-inner flex"
    >
      <div
        class="text-center font-bold m-1 mt-1.5 p-1 w-fit
            hover:bg-gray-500/50 rounded-lg cursor-pointer"
        :class="selected === 'tricolor' ? `border-primary-500
            border-2 shadow-lg cursor-pointer active:shadow-xl
            active:bg-primary-500/50` : 'border-gray-500/50 border'"
        @click="selected = 'tricolor'"
      >
        <img class="h-16 w-16 rounded-lg opacity-90" :src="TricolorImg">
        <div class="mt-1">
          3COLOR
        </div>
      </div>
      <div
        class="text-center font-bold m-1 mt-1.5 p-1 w-fit
            hover:bg-gray-500/50 rounded-lg cursor-pointer"
        :class="selected === 'zebra' ? `border-primary-500
            border-2 shadow-lg cursor-pointer active:shadow-xl
            active:bg-primary-500/50` : 'border-gray-500/50 border'"
        @click="selected = 'zebra'"
      >
        <img class="h-16 w-16 rounded-lg opacity-70" :src="ZebraImg">
        <div class="mt-1">
          ZEBRA
        </div>
      </div>
    </div>
    <div
      v-if="selected === 'tricolor'"
      class="flex mt-4"
    >
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
      <div class="flex w-full mt-2">
        <div class="w-1/3 text-gray-950 dark:text-white font-semibold">
          Shininess
        </div>
        <CommonRange
          v-model="shininess"
          :step="0.001"
          :min="0"
          :max="1000"
          class="mt-1"
        />
        <div
          class="text-sm text-primary-800/50 dark:text-primary-200/90
              w-16 ml-2"
        >
          {{ 1000 - shininess }}
        </div>
      </div>
    </div>
  </CommonAccordion>
</template>

<script setup lang="ts">
import TricolorImg from '~/@kwami/assets/skins/tricolor.png';
import ZebraImg from '~/@kwami/assets/skins/zebra.png';
import {
  getRandomHexColor
} from '~/@kwami/utils/randoms';

const { q } = useStore();

const selected = ref('tricolor');

watch(selected, (v) => {
  q.body.selected.setSkin(v);
});

const colorX = ref('');
const colorY = ref('');
const colorZ = ref('');

const shininess = ref(50);

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

  watch(shininess, (v) => {
    q.body.selected.shininess(1000 - v);
  });
});

</script>

<template>
  <div class="p-2 w-[500px]">
    <div class="flex justify-start">
      <UButton
        icon="i-mdi-dice-multiple"
        class="ml-4"
        :label="$t('randomDNA')"
        @click="getRandomKwami"
      />
      <div class="ml-4">
        {{ 0.022 }}
      </div>
    </div>
    <div class="mt-5 sm:mt-6 space-y-3">
      <AppsKwamiEditorTheme />
      <AppsKwamiEditorBodyBlob />
      <CommonBtnGradient
        :label="$t('save')"
        icon="i-mdi-content-save"
        class="p-2 ml-4"
        @click="saveBlobParams"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getRandomUUID,
  getRandomHexColor,
  getRandomBetween,
  getRandomBoolean
} from '~/@kwami/utils/randoms';

const supabase = useSupabaseClient();
const { q, auth } = useStore();

const isSaving = ref(false);
const saveBlobParams = async () => {
  if (isSaving.value) { return; }
  isSaving.value = true;
  if (!auth.user.id) {
    isSaving.value = false;
    return;
  }
  await supabase.from('kwami.body.blob').insert({
    user_id: auth.user.id,
    spike_x: q.body.blob.vec.x,
    spike_y: q.body.blob.vec.y,
    spike_z: q.body.blob.vec.z,
    time_x: q.body.blob.time.x,
    time_y: q.body.blob.time.y,
    time_z: q.body.blob.time.z,
    rotation_x: q.body.blob.rotation.x,
    rotation_y: q.body.blob.rotation.y,
    rotation_z: q.body.blob.rotation.z,
    kwami_id: getRandomUUID(),
    skin: 'tricolor',
    skin_options: {
      wireframe: wireframe.value,
      colors: [
        q.body.blob.skins.tricolor.uniforms._color1.value,
        q.body.blob.skins.tricolor.uniforms._color2.value,
        q.body.blob.skins.tricolor.uniforms._color3.value
      ]
    },
    resolution: q.body.blob._resolution
  }, { returning: 'minimal' });
  isSaving.value = false;
};

const vecs = ref(12);
const time = ref(12);
const rotation = ref(0);
const isRotation = ref(false);
const wireframe = ref(false);
const resolution = ref(20);

const getRandomKwami = () => {
  q.body.blob.vec.x = getRandomBetween(0, 2, 2);
  q.body.blob.vec.y = getRandomBetween(0, 2, 2);
  q.body.blob.vec.z = getRandomBetween(0, 2, 2);
  q.body.blob.time.x = getRandomBetween(0, 50, 1);
  q.body.blob.time.y = getRandomBetween(0, 50, 1);
  q.body.blob.time.z = getRandomBetween(0, 50, 1);
  if (isRotation.value) {
    q.body.blob.rotation.x = getRandomBetween(0, 0.01, 3);
    q.body.blob.rotation.y = getRandomBetween(0, 0.01, 3);
    q.body.blob.rotation.z = getRandomBetween(0, 0.01, 3);
  } else {
    q.body.blob.rotation.x = 0;
    q.body.blob.rotation.y = 0;
    q.body.blob.rotation.z = 0;
  }
  resolution.value = getRandomBetween(30, 300, 1);
  q.body.blob.setResolution(resolution.value);
  wireframe.value = getRandomBoolean();
  q.body.blob.skins.tricolor.wireframe = wireframe.value;
  q.body.blob.setColors(
    getRandomHexColor(),
    getRandomHexColor(),
    getRandomHexColor()
  );
};

onMounted(() => {
  watch(vecs, (v) => {
    q.body.blob.vec.x = v;
    q.body.blob.vec.y = v;
    q.body.blob.vec.z = v;
    q.save(q.body);
  });
  watch(time, (v) => {
    q.body.blob.time.x = v;
    q.body.blob.time.y = v;
    q.body.blob.time.z = v;
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
      q.body.blob.rotation.x = 0;
      q.body.blob.rotation.y = 0;
      q.body.blob.rotation.z = 0;
      return;
    }
    q.body.blob.rotation.x = v;
    q.body.blob.rotation.y = v;
    q.body.blob.rotation.z = v;
  });

  watchEffect(() => {
    q.body.blob.setResolution(resolution.value);
  });
});

</script>

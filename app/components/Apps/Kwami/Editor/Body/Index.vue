<template>
  <div class="p-2 w-[500px]">
    <div class="flex justify-start">
      <UButton
        icon="i-mdi-dice-multiple"
        class="ml-4"
        :label="$t('randomDNA')"
        @click="q.body.blob.setRandomBlob()"
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
  getRandomUUID
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
    spike_x: q.body.blob.spikes.x,
    spike_y: q.body.blob.spikes.y,
    spike_z: q.body.blob.spikes.z,
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

onMounted(() => {
  watch(vecs, (v) => {
    q.body.blob.spikes.x = v;
    q.body.blob.spikes.y = v;
    q.body.blob.spikes.z = v;
    q.save(q.body);
  });
  watch(time, (v) => {
    q.body.blob.time.x = v;
    q.body.blob.time.y = v;
    q.body.blob.time.z = v;
    q.save(q.body);
  });
  watch(rotation, (v) => {
    // Do not write to rotation.value here to avoid recursive updates
    isRotation.value = v !== 0;
    if (!isRotation.value) {
      if (
        q.body.blob.rotation.x !== 0 ||
        q.body.blob.rotation.y !== 0 ||
        q.body.blob.rotation.z !== 0
      ) {
        q.body.blob.rotation.x = 0;
        q.body.blob.rotation.y = 0;
        q.body.blob.rotation.z = 0;
      }
      return;
    }
    if (q.body.blob.rotation.x !== v) q.body.blob.rotation.x = v;
    if (q.body.blob.rotation.y !== v) q.body.blob.rotation.y = v;
    if (q.body.blob.rotation.z !== v) q.body.blob.rotation.z = v;
  });

  // Set resolution only when it changes
  watch(resolution, (v) => {
    q.body.blob.setResolution(v);
  }, { immediate: true });
});

</script>

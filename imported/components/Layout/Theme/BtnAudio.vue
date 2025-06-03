<template>
  <UPopover
    mode="hover"
    class="z-50"
    :popper="{ placement: 'top-end'}"
  >
    <CommonBtnIcon :icon="audioIcon" />
    <template #content>
      <div class="p-4 w-52">
        <div class="w-full">
          <UFormField :label="$t('volumeFX')" class="w-full">
            <USlider
              v-model="ui.volumeFX"
              :max="1"
              :step="audioSteps"
              :min="0"
            />
          </UFormField>
          <UFormField
            v-if="ui.showVideo"
            :label="$t('volumeVideo')"
            class="w-full mt-4"
          >
            <USlider
              v-model="ui.volumeVideo"
              :max="1"
              :step="audioSteps"
              :min="0"
            />
          </UFormField>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">

const { ui } = useStore();

const audioSteps = 0.01;

const audioIcon = computed(() => {
  if ((ui.showVideo && ui.volumeVideo < 0.3 && ui.volumeFX < 0.2) ||
    (!ui.showVideo && ui.volumeFX < 0.1)) {
    return 'i-heroicons-speaker-x-mark-solid';
  }
  return 'i-heroicons-speaker-wave-solid';
});

watch(() => [ui.volumeFX, ui.volumeVideo], () => {
  const video = document.querySelector('video');
  if (video) {
    video.volume = ui.volumeVideo;
  }
});

</script>

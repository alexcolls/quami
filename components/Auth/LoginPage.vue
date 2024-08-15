<template>
  <AppsKwamiCanvasPublic />
  <AppsKwamiMusicPublic :is-modal-open="true" />
  <AppsAccountThemePublic />
  <AuthLoginEmail />
</template>

<script setup lang="ts">

const centerX = ref(0);
const centerY = ref(0);
const modalRect = ref({ width: 0, height: 0 });

onMounted(() => {
  const updateCenterPosition = () => {
    centerX.value = Math.max(0,
      (window.innerWidth - modalRect.value.width) / 2);
    centerY.value = Math.max(0,
      (window.innerHeight - modalRect.value.height) / 2);
  };
  updateCenterPosition();
  window.addEventListener('resize', updateCenterPosition);
  onUnmounted(() => {
    window.removeEventListener('resize', updateCenterPosition);
  });
});

</script>

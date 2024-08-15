<template>
  <div>
    <AuthLoginPage />
    <AppsKwamiCanvas />
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
});

</script>

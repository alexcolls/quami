<template>
  <CommonBtn
    icon="i-heroicons-logout-16-solid"
    @click="logout"
  />
</template>

<script setup lang="ts">

const client = useSupabaseClient();
const { auth } = useStore();

const logout = async () => {
  try {
    await client.auth.signOut();
    auth.logout();
    navigateTo('login');
  } catch (error) {
    console.error(error);
  }
  await client.auth.signOut();
};
</script>

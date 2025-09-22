<template>
  <div v-if="auth.isAuth && auth.token.length > 10">
    <UTooltip
      :text="$t('logout')"
      :shortcuts="['⌘', 'O']"
    >
      <UButton
        variant="ghost"
        color="neutral"
        icon="i-heroicons-arrow-right-start-on-rectangle-16-solid"
        class="mx-2 h-[31px] w-[31px] pr-1 hover:bg-white hover:dark:bg-neutral-900
          hover:border border-neutral-300 dark:border-neutral-700 text-neutral-900
          dark:text-neutral-100"
        @click="onLogout"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import audFX from '~/assets/aud/check.flac';

defineShortcuts({
  meta_o: {
    usingInput: true,
    handler: () => onLogout()
  }
});

const { auth, ui } = useStore();
const { logout } = useAlerts();
const auidoLogout = new Audio(audFX);

const onLogout = () => {
  ui.playAudio(auidoLogout);
  auth.logout();
  navigateTo('login');
  logout.success();
};

</script>

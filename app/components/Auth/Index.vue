<template>
  <div
    class="relative flex items-center justify-center
      overflow-hidden z-0 h-screen w-screen m-0 p-0"
  >
    <CommonBackgroundVideos />
    <CommonMagicModal
      :window-name="$t('login')"
      :class="isValid(state.email) ? '!h-[240px]' : '!h-[180px]'"
    >
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 m-8"
      >
        <UFormGroup
          :label="$t('email')"
          :ui="{ label: { base: 'text-white' } }"
        >
          <UInput
            v-model="state.email"
            variant="none"
            required
            autocomplete="username"
            class="border border-primary rounded-md text-white"
            icon="i-heroicons-user"
            :ui="{ icon: { base: '!text-white' } }"
          />
        </UFormGroup>
        <transition name="fade">
          <div
            v-if="isValid(state.email)"
            class="flex justify-center pt-2.5"
          >
            <CommonBtnGradient
              type="submit"
              class="group px-12 pr-14 py-2 transition-all duration-300
                ease-in-out rounded-full hover:shadow-lg shadow-white"
              icon="i-heroicons-rocket-launch-16-solid"
              @click="signEmail"
            >
              {{ $t('btn.go') }}
            </CommonBtnGradient>
          </div>
        </transition>
      </UForm>
    </CommonMagicModal>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

const supabase = useSupabaseClient();

const isLoading = ref(false);
const signEmail = async () => {
  if (isLoading.value || !isValid(state.email)) { return; }
  isLoading.value = true;
  const res = await supabase.auth.signInWithOtp({ email: state.email });
  const domain = state.email.split('@')[1];
  navigateTo(`https://${domain}`, { replace: true, external: true });
  isLoading.value = false;
  return res;
};

const emailSchema = z.string().email();

const isValid = (email: string) => {
  return emailSchema.safeParse(email).success;
};

const state = reactive({
  email: ''
});

const schema = z.object({
  email: z.string().email()
});
</script>

<template>
  <CommonMagicWindow
    :title="$t('login')"
    :icon="'i-heroicons-user'"
    :default-position="{ x: 50, y: 50 }"
    :is-modal-open="true"
    :window-name="$t('login')"
    :class="isEmailValid(state.email) ? '!h-[240px]' : '!h-[180px]'"
    @width="modalRect!.width = $event"
    @height="modalRect!.height = $event"
  >
    <div class="p-8">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
      >
        <UFormGroup
          :label="$t('email')"
        >
          <UInput
            v-model="state.email"
            variant="none"
            required
            type="email"
            autocomplete="username"
            class="border border-primary rounded-md  shadow-black
              dark:shadow-white "
            icon="i-heroicons-user"
          />
        </UFormGroup>
        <transition name="fade">
          <div
            v-if="isPassInputDisabled"
            class="w-full justify-center pt-2.5 transition-all duration-300
                ease-in-out rounded-full hover:shadow-lg"
          >
            <UFormGroup :label="$t('password')">
              <UInput
                v-model="state.password"
                variant="none"
                required
                type="password"
                autocomplete="password"
                class="border border-primary rounded-md  shadow-black
                  dark:shadow-white "
                icon="i-heroicons-key"
              />
            </UFormGroup>
          </div>
        </transition>
        <transition name="fade">
          <div
            v-if="isBtnDisabled"
            class="w-full justify-center pt-2.5 transition-all duration-300
                ease-in-out rounded-full hover:shadow-lg"
          >
            <div class="flex justify-center">
              <CommonBtnGradient
                type="submit"
                class="group px-12 pr-14 py-2 shadow-black
                  dark:shadow-white mt-8"
                icon="i-heroicons-rocket-launch-16-solid"
                @click="signInUp"
              >
                {{ $t('btn.go') }}
              </CommonBtnGradient>
            </div>
          </div>
        </transition>
      </UForm>
    </div>
  </CommonMagicWindow>
</template>

<script setup lang="ts">
import { z } from 'zod';

const supabase = useSupabaseClient();

const isLoading = ref(false);

const signInUp = async () => {
  if (isLoading.value || !isEmailValid(state.email) ||
  !isPasswordValid(state.password)) { return; }
  isLoading.value = true;
  const res = await supabase.from('global.emails').select('*');
  out(res);
  isLoading.value = false;
  return res;
};

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

const isEmailValid = (email: string) => {
  return emailSchema.safeParse(email).success;
};

const isPasswordValid = (password: string) => {
  return passwordSchema.safeParse(password).success;
};

const isPassInputDisabled = computed(() => {
  return isEmailValid(state.email);
});

const isBtnDisabled = computed(() => {
  return isEmailValid(state.email) && isPasswordValid(state.password);
});

const state = reactive({
  email: '',
  password: ''
});

const schema = z.object({
  email: z.string().email()
});

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

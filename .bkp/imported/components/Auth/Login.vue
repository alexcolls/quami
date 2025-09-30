<template>
  <div
    class="w-96 min-h-28 relative overflow-hidden
      backdrop-filter backdrop-blur-md rounded-full
      transition-all duration-500 !bg-gray-200/20 dark:!bg-gray-800/20
      shadow-sm hover:shadow-smpx-8 sm:px-12 border"
    :class="[`border-${ui.color[ui.isDark ? 'dark' : 'light'].primary} shadow-${ui.color[ui.isDark ? 'dark' : 'light'].secondary}`, validEmail && (!emailExists || forgotNewPassword)  ? '!rounded-[55px] h-60' : 'h-28']"
    @mouseenter="handleHover(true)"
  >
    <transition name="fade-scale" mode="out-in">
      <div v-if="isError" key="error" class="w-full text-center pt-6">
        <UIcon
          name="i-heroicons-lock-closed-solid"
          class="h-16 w-16 text-red-500 animate-pulse"
        />
      </div>
      <div v-else-if="isLogin" key="success" class="w-full text-center pt-6">
        <UIcon
          name="i-heroicons-lock-open-solid"
          class="h-16 w-16 text-green-500 animate-pulse"
        />
      </div>
      <div v-else key="OrianeWelcome" class="w-full h-full flex flex-col items-center justify-center">
        <transition name="slide-up-out">
          <div v-if="!isHovered" class="flex items-center justify-center gap-2 h-28">
            <img :src="OrianeLogo" alt="Oriane Logo" class="h-10 w-10" >
            <CommonTxtColor
              class="text-center text-black dark:text-white text-4xl font-extrabold
              uppercase tracking-widest transition-all duration-500 ml-2"
            >
              ORIANE
            </CommonTxtColor>
          </div>
        </transition>
      </div>
    </transition>
    <transition :name="validEmail ? 'slide-up' : 'slide-down'" mode="out-in">
      <UForm
        v-if="isHovered"
        :schema="schema"
        :state="state"
        class="space-y-4 absolute inset-0 flex flex-col justify-center px-8 sm:px-12"
      >
        <div class="absolute top-3 right-12">
          <UIcon 
            :name="'i-heroicons-x-mark'"
            class="h-4 w-4 text-black dark:text-white transition-all duration-300"
            @click="validEmail ? goBackToEmail() : goBackToLogin()"
          />
        </div>
        <transition :name="validEmail ? 'slide-up' : 'slide-down'" mode="out-in">
          <div v-if="!validEmail" key="email-step" class="space-y-4 flex w-full">
            <UFormField
              :label="$t('auth.email')"
              class="mt-2 text-black dark:text-white"
            >
              <div class="flex justify-center items-center align-middle h-full w-full">
                <UInput
                  v-model="state.email"
                  variant="none"
                  type="email"
                  required
                  autocomplete="email"
                  class="shadow-sm rounded-full transition-all duration-500"
                  :class="[emailRegex.test(state.email) ? 'w-64' : 'w-72', `shadow-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`]"
                  icon="i-heroicons-envelope"
                  :ui="{ leadingIcon: `text-${ui.color[ui.isDark ? 'dark' : 'light'].primary}` }"
                  @keyup.enter="confirmEmail"
                />       
                <transition name="fade-scale">
                  <CommonBtnIcon
                    v-if="emailRegex.test(state.email)"
                    type="button"
                    class="ml-2 -mr-2 group p-2 h-8 w-8 from-white transition-all duration-300 ease-in-out rounded-full shadow-sm"
                    :class="`shadow-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`"
                    icon="i-heroicons-arrow-right"
                    size="xs"
                    @click="confirmEmail"
                  />
                </transition>
              </div>
            </UFormField>
          </div>
          <div 
            v-else-if="emailExists && emailConfirmed && (!forgotPasswordStep && !forgotNewPassword && !isLogin && !isError)"
            key="password-login-step"
            class="space-y-4 flex w-full"
          >
            <UFormField
              :label="$t('auth.pass')"
              class="mt-2 text-black dark:text-white"
            >
              <div class="flex justify-center items-center align-middle h-full w-full">
                <UInput
                  v-model="state.pass"
                  variant="none"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  :class="[
                    'shadow-sm rounded-full transition-all duration-500 text-black dark:text-white',
                    validPassword ? 'w-64' : 'w-72',
                    `shadow-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`
                  ]"
                  icon="i-heroicons-key"
                  :trailing-icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                  :ui="{ leadingIcon: `text-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`, trailingIcon: 'text-black dark:text-white' }"
                  :trailing-icon-click="togglePasswordVisibility"
                  @keyup.enter="logIn"
                />
                <transition name="fade-scale">
                  <CommonBtnIcon
                    v-if="validPassword"
                    type="submit"
                    class="ml-2 -mr-2 group p-2 h-8 w-8 from-white transition-all duration-300 ease-in-out rounded-full shadow-sm !border-t"
                    :class="`shadow-${ui.color[ui.isDark ? 'dark' : 'light'].primary} hover:bg-${ui.color[ui.isDark ? 'dark' : 'light'].primary}/70 hover:!text-white !border-${ui.color[ui.isDark ? 'dark' : 'light'].secondary}`"
                    icon="i-heroicons-rocket-launch-16-solid"
                    size="xs"
                    @click="logIn"
                  />
                </transition>
              </div>
              <div
                v-if="wrongPassword"
                class="pt-2 text-xs text-black dark:text-white/80 flex justify-center items-center align-middle w-full cursor-pointer"
                :class="`hover:text-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`"
                @click="forgotPassword"
              >
                {{ $t('auth.forgotPass') }}
              </div>
            </UFormField>
          </div>
          <div v-else-if="emailExists && (!emailConfirmed || forgotPasswordStep) && !isLogin && !isError" key="email-not-confirmed-step" class="space-y-4 flex w-full">
            <UFormField
              :label="$t('auth.verificationCode')"
              class="mt-2 text-black dark:text-white"
            >
              <div class="flex justify-center items-center align-middle h-full w-full">
                <UInput
                  v-model="emailCode"
                  type="password"
                  variant="none"
                  required
                  class="shadow-sm rounded-full transition-all duration-500"
                  :class="[emailRegex.test(state.email) ? 'w-64' : 'w-72', `shadow-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`]"
                  icon="i-heroicons-check-circle"
                  :ui="{ leadingIcon: `text-${ui.color[ui.isDark ? 'dark' : 'light'].primary}` }"
                  @keyup.enter="confirmEmailCode"
                />       
                <transition name="fade-scale">
                  <CommonBtnIcon
                    v-if="emailRegex.test(state.email)"
                    type="button"
                    class="ml-2 -mr-2 group p-2 h-8 w-8 from-white transition-all duration-300 ease-in-out rounded-full shadow-sm"
                    :class="`shadow-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`"
                    icon="i-heroicons-arrow-right"
                    size="xs"
                    @click="forgotPasswordStep ? verifyForgotasswordCode() : confirmEmailCode()"
                  />
                </transition>
              </div>
              <p class="mt-2 w-full text-xs text-black dark:text-white/80">
                {{ $t('auth.verificationCodeDescription') }}
              </p>
            </UFormField>
          </div>
          <div v-else-if="(!signedUp || forgotNewPassword) && !isLogin && !isError" key="password-signup-step" class="space-y-4">
            <div class="absolute top-3 right-12">
              <UIcon 
                :name="'i-heroicons-x-mark'"
                class="h-4 w-4 text-black dark:text-white transition-all duration-300"
                @click="goBackToEmail()"
              />
            </div>
            <UFormField
              :label="forgotNewPassword ? $t('auth.newPass') : $t('auth.createPass')"
              class="mt-2 text-black dark:text-white"
            >
              <div class="flex flex-col space-y-2">
                <div class="flex justify-center items-center align-middle h-full w-full">
                  <UInput
                    v-model="state.pass"
                    variant="none"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    autocomplete="current-password"
                    :class="[
                      'shadow-sm rounded-full transition-all duration-500 text-black dark:text-white',
                      validPassword ? 'w-64' : 'w-72',
                      `shadow-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`
                    ]"
                    icon="i-heroicons-key"
                    :trailing-icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    :ui="{ leadingIcon: `text-${ui.color[ui.isDark ? 'dark' : 'light'].primary}`, trailingIcon: 'text-black dark:text-white' }"
                    :trailing-icon-click="togglePasswordVisibility"
                    @keyup.enter="forgotNewPassword ? resetPassword() : signUp()"
                  />
                  <transition name="fade-scale">
                    <CommonBtnIcon
                      v-if="validPassword"
                      type="submit"
                      class="ml-2 -mr-2 group p-2 h-8 w-8 from-white transition-all duration-300 ease-in-out rounded-full shadow-sm"
                      :class="`shadow-${ui.color[ui.isDark ? 'dark' : 'light'].primary} hover:bg-${ui.color[ui.isDark ? 'dark' : 'light'].primary} hover:text-white border-none`"
                      icon="i-heroicons-rocket-launch-16-solid"
                      size="xs"
                      @click="forgotNewPassword ? resetPassword() : signUp()"
                    />
                  </transition>
                </div>
                <UProgress
                  :color="color"
                  :indicator="text"
                  :model-value="score"
                  :max="5"
                  size="xs"
                  class="w-full"
                />
                <ul class="space-y-1" aria-label="Password requirements">
                  <li
                    v-for="(req, index) in checkPasswordValidity(state.pass)"
                    :key="index"
                    class="flex items-center gap-0.5"
                    :class="req.met ? 'text-success' : 'text-muted'"
                  >
                    <UIcon :name="req.met ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="size-4 shrink-0" />
                    <span class="text-xs font-light text-black dark:text-white">
                      {{ req.text }}
                      <span class="sr-only">
                        {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </UFormField>
          </div>
        </transition>
      </UForm>

    </transition>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import audFX2 from '~/assets/aud/check.flac';
import audFX3 from '~/assets/aud/typing.mp3';
import OrianeLogo from '~/public/Oriane.svg';

const { auth, ui } = useStore();
const { login } = useAlerts();

const state = reactive({
  email: '',
  pass: ''
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validEmail = ref(false);
const emailExists = ref(false);
const emailConfirmed = ref(false);

const isHovered = ref(false);
const isHoveredAllowed = ref(true);
const audioLogin = new Audio(audFX2);

const showPassword = ref(false);

const checkPasswordValidity = (str: string) => {
  const requirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /\d/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    { regex: /[!@#$%^&*]/, text: 'At least 1 special character (!@#$%^&*)' }
  ]
  return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
}

const validPassword = computed(() => checkPasswordValidity(state.pass).every(req => req.met));
const score = computed(() => checkPasswordValidity(state.pass).filter(req => req.met).length);
const wrongPassword = ref(false);

const color = computed(() => {
  if (score.value === 0) return 'neutral'
  if (score.value <= 1) return 'error'
  if (score.value <= 2) return 'warning'
  if (score.value === 3) return 'warning'
  return 'success'
})

const text = computed(() => {
  if (score.value === 0) return 'Enter a password'
  if (score.value <= 2) return 'Weak password'
  if (score.value === 3) return 'Medium password'
  return 'Strong password'
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleHover = (hovering: boolean) => {
  if (hovering && isHoveredAllowed.value) {
    isHovered.value = true;
  }
};

const goBackToLogin = () => {
  isHovered.value = false;
  validEmail.value = false;
  state.email = '';
  state.pass = '';
};

const confirmEmail = async () => {
  if (emailRegex.test(state.email)) {
    const res = await $fetch<{ exists: boolean, isConfirmed: boolean }>('api/auth/email', {
      method: 'POST',
      body: {
        email: state.email
      }
    });
    if (res.exists) {
      emailExists.value = true;
      validEmail.value = true;
    }
    if (res.isConfirmed) {
      emailConfirmed.value = true;
    }
    signedUp.value = false;
    validEmail.value = true;
  }
};

const emailCode = ref('');

const confirmEmailCode = async () => {
  const res = await $fetch<{ success: boolean }>('api/auth/confirm-email', {
    method: 'POST',
    body: {
      email: state.email,
      code: emailCode.value
    }
  });
  if (res.success) {
    emailConfirmed.value = true;
  }
};

const signedUp = ref(false);

const signUp = async () => {
  const res = await $fetch<{ success: boolean }>('api/auth/signup', {
    method: 'POST',
    body: {
      email: state.email,
      pass: state.pass
    } 
  });
  if (res.success) {
    signedUp.value = true;
    emailExists.value = true;
    emailConfirmed.value = false;
  }
};

const isLogin = ref(false);
const isError = ref(false);

const logIn = async () => {
  try {
    const res = await $fetch<{
      success: boolean,
      accessToken: string,
      idToken: string,
      refreshToken: string,
      expiresIn: number,
      user: {
        email: string,
        type: string,
        createdAt: Date
      }
    }>('api/auth/login', {
      method: 'POST',
      body: {
        email: state.email,
        pass: state.pass
      } 
    });
    if (res.success) {
      auth.isAuth = true;
      auth.token = {
        accessToken: res.accessToken,
        idToken: res.idToken,
        refreshToken: res.refreshToken,
        issuedAt: new Date(),
        expiresIn: res.expiresIn,
        expiresAt: new Date(res.expiresIn * 1000)
      };
      auth.user = res.user;
      isLogin.value = true;
      audioLogin.play();
      login.success();
      setTimeout(() => {
        navigateTo('/');
      }, 2000);
      setTimeout(() => {
        isLogin.value = false;
      }, 4000);
      return;
    }
    isError.value = true;
  } catch {
    wrongPassword.value = true;
    isError.value = true;
    login.error();
  }
  setTimeout(() => {
    forgotPasswordStep.value = false;
    forgotNewPassword.value = false;
    isLogin.value = false;
    isError.value = false;
    emailExists.value = true;
    emailConfirmed.value = true;
  }, 2000);
};

const forgotPasswordStep = ref(false);
const forgotNewPassword = ref(false);

const verifyForgotasswordCode = () => {
  const codeRegex = /^[0-9]{6}$/;
  if (codeRegex.test(emailCode.value)) {
    forgotNewPassword.value = true;
    forgotPasswordStep.value = false;
  }
}

const forgotPassword = async () => {
  state.pass = '';
  forgotPasswordStep.value = true;
  await $fetch<{ success: boolean }>('api/auth/forgot-password', {
    method: 'POST',
    body: {
      email: state.email
    }
  });
};

const resetPassword = async () => {
  try {
    const res = await $fetch<{ success: boolean }>('api/auth/reset-password', {
      method: 'POST',
      body: {
        email: state.email,
        code: emailCode.value,
        newPassword: state.pass
      }
    });
    if (res.success) {
      emailConfirmed.value = true;
      forgotNewPassword.value = false;
      return;
    }
  } catch {
    login.error();
    forgotNewPassword.value = false;
    forgotPasswordStep.value = true;
  }
};

const goBackToEmail = () => {
  validEmail.value = false;
  state.pass = '';
};

const schema = z.object({
  email: z.string().email({ message: 'Invalid email format' }), // Added message for zod
  pass: z.string().min(1, { message: 'Password is required' }) // Ensure pass is not empty for schema
});

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

/* Next transition (email to password) */
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Back transition (password to email) */
.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-out-enter-active, /* For LOGIN text entering (if it re-appears) */
.slide-up-out-leave-active { /* For LOGIN text leaving */
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.slide-up-out-enter-from { /* If LOGIN text re-enters, it comes from top */
  transform: translateY(-100%);
  opacity: 0;
}
.slide-up-out-leave-to { /* LOGIN text leaves by going up */
  transform: translateY(-100%);
  opacity: 0;
}

.glass-border {
  position: relative;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.glass-border::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, v-bind('ui.color[ui.isDark ? 'dark' : 'light'].primary'), v-bind('ui.color[ui.isDark ? 'dark' : 'light'].secondary'));
  border-radius: inherit;
  z-index: -1;
}
</style>

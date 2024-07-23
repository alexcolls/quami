<template>
  <div
    :key="key"
    class="relative flex items-center justify-center h-[88vh] w-full
      overflow-hidden z-0"
  >
    <video
      v-show="showFirstVideo"
      autoplay
      muted
      loop
      class="fixed top-0 left-0 h-screen w-screen cursor-pointer
        z-[-1] object-cover transition-opacity duration-500 ease-in-out"
      :class="isBlurred ? 'blur' : 'no-blur'"
      :style="{ opacity: showFirstVideo ? 1 : 0 }"
      @click="getVideo"
      @loadeddata="handleVideoLoaded"
    >
      <source :src="video1" type="video/mp4">
      {{ $t('error.video') }}
    </video>
    <video
      v-show="!showFirstVideo"
      autoplay
      muted
      loop
      class="fixed top-0 left-0 h-screen w-screen cursor-pointer
        z-[-1] object-cover transition-opacity duration-500 ease-in-out"
      :class="isBlurred ? 'blur' : 'no-blur'"
      :style="{ opacity: showFirstVideo ? 0 : 1 }"
      @click="getVideo"
      @loadeddata="handleVideoLoaded"
    >
      <source :src="video2" type="video/mp4">
      {{ $t('error.video') }}
    </video>
    <div
      class="w-full max-w-md p-8 space-y-6 bg-opacity-10 border
        backdrop-filter backdrop-blur-md rounded-lg border-primary-500
        transition-all duration-500 !bg-gray-200/20 dark:!bg-gray-800/20
        shadow-lg shadow-primary-700/40 dark:shadow-primary-300/40"
      :class="isValid(state.user) ? 'h-[360px]' : 'h-[280px]'"
    >
      <CommonTxtColor
        class="text-center text-white mt-2 uppercase tracking-widest"
      >
        {{ $t('login') }}
      </CommonTxtColor>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup
          :label="$t('user')"
          :ui="{ label: { base: 'text-white' } }"
        >
          <UInput
            v-model="state.user"
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
            v-if="isValid(state.user)"
            class="flex justify-center pt-6"
          >
            <CommonBtnGradient
              type="submit"
              class="group px-12 pr-14 py-2 transition-all duration-300
                ease-in-out rounded-full hover:shadow-lg shadow-white"
              icon="i-heroicons-rocket-launch-16-solid"
              @click="signInWithOAuth"
            >
              {{ $t('btn.go') }}
            </CommonBtnGradient>
          </div>
        </transition>
        <div class="flex absolute bottom-5 justify-start w-full">
          <LayoutBtnLang />
          <LayoutBtnLight />
          <LayoutBtnTheme />
          <LayoutBtnLogout />
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import videos from 'assets/vid/links.json';

const supabase = useSupabaseClient();

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOtp({ email: state.user });
  if (error) { console.log(error); }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) { console.log(error); }
};

const NO_REPEAT = 40;

const config = useRuntimeConfig();
const loginUrl = cleanURL(`${config.public.API_URL}/document-types`);
const { auth, ui } = useStore();
const { login } = useAlerts();

const key = ref(0);
const video1 = ref(videos[ui.iVideo]);
const video2 = ref(videos[ui.iVideo]);
const showFirstVideo = ref(true);
const isBlurred = ref(true);

const isValid = (user: string) => {
  return user.length > 3;
};

const lastRandoms: number[] = [];
const getVideo = () => {
  const ln = videos.length;
  let n = getRandomInt(ln);
  while (lastRandoms.includes(n)) {
    n = getRandomInt(ln);
  }
  ui.iVideo = n;
  lastRandoms.push(n);
  if (lastRandoms.length > NO_REPEAT) {
    lastRandoms.shift();
  }
  isBlurred.value = true;
  setTimeout(() => {
    if (showFirstVideo.value) {
      video2.value = videos[n];
    } else {
      video1.value = videos[n];
    }
    showFirstVideo.value = !showFirstVideo.value;
    key.value++;
  }, 500);
};

const handleVideoLoaded = () => {
  setTimeout(() => {
    isBlurred.value = false;
  }, 300);
};

const state = reactive({
  user: '',
  pass: ''
});

const schema = z.object({
  user: z.string(),
  pass: z.string()
});

const onSubmit = async () => {
  const token = btoa(`${state.user}:${state.pass}`);
  try {
    const res = await $fetch<DocTypeRes[]>(loginUrl, {
      method: 'GET',
      headers: {
        Authorization: `${auth.type} ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (res && res.length) {
      auth.isAuth = true;
      auth.token = token;
      login.success();
      navigateTo('/');
    } else {
      throw new Error('Failed to login');
    }
  } catch (err) {
    state.user = '';
    state.pass = '';
    auth.isAuth = false;
    auth.token = '';
    data.docTypes = [];
    login.error();
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.blur {
  filter: blur(10px);
  transition: filter 1s;
}

.no-blur {
  filter: blur(0);
  transition: filter 0.5s;
}
</style>

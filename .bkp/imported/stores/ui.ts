export const useUIStore = defineStore('oriane.ui', {
  persist: true,
  state: () => ({
    key: 0,
    logoURL: 'https://oriane.xyz/',
    isDark: false,
    color: {
      dark: {
        primary: 'slate-500',
        secondary: 'purple-500',
        background: 'stone-900',
        neutral: 'stone-500',
      },
      light: {
        primary: 'slate-500',
        secondary: 'purple-500',
        background: 'stone-900',
        neutral: 'stone-500',
      },
    },
    flashlight: true,
    trunOnRGB: true,
    locale: 'es' as LangCode,
    iLocale: 0,
    showVideo: true,
    showVideoOptions: true,
    videoOpacity: 0.5,
    videoKey: 0,
    iVideo: 70,
    videoURL: '',
    isPlaying: false,
    isBlurred: false,
    isYouTubeReady: false,
    showFirstVideo: true,
    volumeVideo: 0.8,
    volumeFX: 0.1
  }),
  actions: {
    rerender () {
      this.key++;
    },
  }
});

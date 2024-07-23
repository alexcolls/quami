const useUIStore = defineStore('ui', {
  persist: true,
  state: () => ({
    isDark: false,
    size: 'md',
    logoURL: 'https://www.innocv.com/',
    langs: [
      { value: 'ca', label: 'Català' },
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
      { value: 'eu', label: 'Euskara' },
      { value: 'gl', label: 'Galego' }
    ],
    locale: 'es',
    notification: {
      position: 'bottom-0'
    },
    primary: 'orange',
    gray: 'stone',
    iLocale: 0,
    iVideo: 0,
    key: 0
  })
});

export default useUIStore;

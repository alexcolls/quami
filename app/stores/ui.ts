const useUIStore = defineStore('ui', {
  persist: true,
  state: () => ({
    isDark: false,
    size: 'md',
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
    navPath: '',
    uiKey: 0
  })
});

export default useUIStore;

const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    session: {},
    user: {}
  })
});

export default useAuthStore;

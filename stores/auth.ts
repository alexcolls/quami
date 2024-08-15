const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    session: {},
    user: {
      id: ''
    }
  })
});

export default useAuthStore;

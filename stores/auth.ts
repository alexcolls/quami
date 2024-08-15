const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    session: {},
    user: {
      id: ''
    }
  }),
  actions: {
    logout () {
      this.session = {};
      this.user = { id: '' };
    }
  }
});

export default useAuthStore;

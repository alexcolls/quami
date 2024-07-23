const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    isAuth: false,
    token: '',
    user: {} as User
  })
});

export default useAuthStore;

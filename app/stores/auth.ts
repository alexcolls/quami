const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    isAuth: false,
    relayState: '',
    samlRequest: '',
    authToken: '',
    user: {} as User
  })
});

export default useAuthStore;

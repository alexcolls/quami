export const useAuthStore = defineStore('oriane.auth', {
  persist: true,
  state: (): AuthState => ({
    isAuth: false,
    token: {
      accessToken: '',
      idToken: '',
      refreshToken: '',
      issuedAt: null,
      expiresIn: 0,
      expiresAt: null
    },
    user: {
      id: '',
      email: '',
      type: '',
      createdAt: null
    }
  }),
  actions: {
    logout () {
      this.isAuth = false;
      this.token = {
        accessToken: '',
        idToken: '',
        refreshToken: '',
        issuedAt: null,
        expiresIn: 0,
        expiresAt: null
      };
      this.user = {
        id: '',
        email: '',
        type: '',
        createdAt: null
      };
      navigateTo('/login');
    }
  }
});

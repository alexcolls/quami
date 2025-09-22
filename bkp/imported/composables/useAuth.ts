
export const useAuth = () => {
  const { auth: authStore } = useStore();

  const { 
    isAuth: storeIsAuthenticated, // Renaming to avoid conflict if we keep a local isAuthenticated for some reason
    user: storeUser,
    // If you also manage tokens in Pinia and they are returned by /api/auth/me or login
    // token: storeToken 
  } = storeToRefs(authStore);

  // isLoading can remain a local ref for the composable's operations
  const isLoading: Ref<boolean> = ref(true); // Start as true for initial check

  async function fetchUser() {
    isLoading.value = true;
    // If store already indicates authenticated and has user data,
    // and we don't need to force a refresh, we could potentially skip.
    // However, it's often good to verify with the backend on app load.
    // The original logic: if (isAuthenticated.value) { isLoading.value = false; return; }
    // will now use storeIsAuthenticated.value

    if (storeIsAuthenticated.value && storeUser.value?.id) {
        // Optionally, if you trust the persisted store state on initial load
        // and don't want to hit /api/auth/me every time:
        // isLoading.value = false;
        // return;
    }

    try {
      // The /api/auth/me endpoint returns { user: { id, username, email } }
      const data = await $fetch<{ user: { id: string; username: string; email: string; } }>('/api/auth/me', {
        retry: 0, // Don't retry on 401
        ignoreResponseError: true, // Handle errors manually
      });

      if (data && data.user && data.user.id) {
        // Update Pinia store
        authStore.user = {
          id: data.user.id,
          email: data.user.email,
          // 'type' and 'createdAt' are not in the /api/auth/me response.
          // You'll need to decide how to populate these.
          // For now, keeping them as their default from the store or null.
          type: authStore.user?.type || '', // Or a default value
          createdAt: authStore.user?.createdAt || null, // Or a default value
        };
        authStore.isAuth = true;

        // If /api/auth/me also returned tokens (which it currently doesn't, as they are HttpOnly)
        // you would update authStore.token here.
        // e.g., authStore.token = { accessToken: data.tokens.accessToken,... };

      } else {
        // If API call fails or returns no user, ensure store reflects unauthenticated state
        // This might be redundant if error handling below calls authStore.logout()
        authStore.isAuth = false;
        authStore.user = { id: '', email: '', type: '', createdAt: null };
        authStore.token = { accessToken: '', idToken: '', refreshToken: '' };
      }
    } catch (error: unknown) {
      // console.debug('Fetch user failed, likely not authenticated:', error);
      // Call the store's logout action to ensure consistent state clearing and navigation
      // Check if it's a 401 or similar indicating not logged in, otherwise it might be a network error
      if ((error as { response?: { status: number } }).response?.status === 401 
        || (error as { response?: { status: number } }).response?.status === 403
      ) {
        // If logout action navigates, this might be too aggressive for an initial fetchUser call
        // So, just clear the state manually here.
        authStore.isAuth = false;
        authStore.user = { id: '', email: '', type: '', createdAt: null };
        authStore.token = { accessToken: '', idToken: '', refreshToken: '' };
      } else {
        // Handle other errors (e.g., network issues) appropriately
        console.error('Error fetching user:', error);
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function login(credentials: { username?: string, password?: string }) {
    isLoading.value = true;
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials,
      });
      // After successful login, cookies are set by the server.
      // Now fetch user info to populate the store.
      await fetchUser(); 
      
      if (authStore.isAuth) {
        // Navigate to the desired redirect path after login
        // The previous example used '/', adjust if needed.
        return navigateTo('/'); 
      } else {
        // This case should ideally not happen if login API succeeded and fetchUser worked
        // but as a fallback:
        throw new Error("Authentication failed after login attempt.");
      }
    } catch (error: unknown) {
      console.error('Login failed:', error);
      // Clear any potentially partially authenticated state in the store
      authStore.isAuth = false;
      authStore.user = { id: '', email: '', type: '', createdAt: null };
      authStore.token = { accessToken: '', idToken: '', refreshToken: '' };
      throw error; // Re-throw for the component to handle and display message
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    isLoading.value = true;
    try {
      // Call the server endpoint to clear HttpOnly cookies
      await $fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
        console.error('API logout call failed:', error);
        // Proceed with client-side logout even if API fails,
        // as the store's logout action will clear local state and redirect.
    } finally {
      // Use the store's logout action, which handles state reset and navigation
      authStore.logout(); 
      isLoading.value = false;
    }
  }

  // Return reactive properties from the store and the composable's methods/state
  return {
    user: storeUser, // Reactive ref from storeToRefs
    isAuthenticated: storeIsAuthenticated, // Reactive ref from storeToRefs
    isLoading, // Local reactive ref for loading state of these operations
    fetchUser,
    login,
    logout,
    // You can also expose the store instance if needed, though generally not recommended
    // authStoreInstance: authStore 
  };
};
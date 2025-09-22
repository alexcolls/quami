// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server side for initial load, let useAuth handle it client-side
  // or if you want SSR auth check, you'd need to adapt useAuth or call /api/auth/me here server-side
  if (import.meta.server) {
    return;
  }

  const { isAuthenticated, isLoading, fetchUser } = useAuth();

  // If auth state is not yet loaded, fetch it.
  // This ensures that on direct navigation or page refresh, auth status is checked.
  if (isLoading.value &&!isAuthenticated.value) {
    await fetchUser();
  }
  
  const publicPages = ['/login', '/signup', '/forgot-password']; // Add any other public pages
  const authRequired =!publicPages.includes(to.path);

  if (authRequired &&!isAuthenticated.value &&!isLoading.value) {
    // If trying to access a protected page and not authenticated (and not loading)
    // console.log(`Not authenticated, redirecting from ${to.path} to /login`);
    return navigateTo('/login');
  }

  if (!authRequired && isAuthenticated.value &&!isLoading.value) {
    // If trying to access a public page (like /login) but already authenticated (and not loading)
    // console.log(`Already authenticated, redirecting from ${to.path} to /`);
    if (to.path === '/login') { // Only redirect from /login if authenticated
        return navigateTo('/'); // Or your default authenticated route
    }
  }
});

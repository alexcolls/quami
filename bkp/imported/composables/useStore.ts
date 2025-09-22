export const useStore = () => {
  return {
    ui: useUIStore(),
    auth: useAuthStore(),
  };
};

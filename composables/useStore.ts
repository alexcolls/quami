import useKwami from '~/stores/q';
import useAuth from '~/stores/auth';
import useUI from '~/stores/ui';

export const useStore = () => {
  return {
    q: useKwami(),
    auth: useAuth(),
    ui: useUI()
  };
};

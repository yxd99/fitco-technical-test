import { useMutation } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

import { loginAction, registerAction } from '@app/actions/auth.action';
import { Paths } from '@app/lib/constants/paths';
import { useAuthStore } from '@app/lib/store';

export const useLogin = () =>
  useMutation({
    mutationFn: loginAction,
    onSuccess: (data) => {
      const { setAuthenticated, setUser, setToken } = useAuthStore.getState();
      setAuthenticated(true);
      setUser(data.user);
      setToken(data.token);
      toast.success('Login successful');
    },
    onError: () => {
      toast.error('Error logging in');
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: registerAction,
    onSuccess: (data) => {
      const { setAuthenticated, setUser, setToken } = useAuthStore.getState();
      setAuthenticated(true);
      setUser(data.user);
      setToken(data.token);
      toast.success('Registration successful');
    },
    onError: () => {
      toast.error('Error registering');
    },
  });

export const useLogout = () => {
  const { logout } = useAuthStore();
  logout();
  redirect(Paths.HOME);
};

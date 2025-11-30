import { useServiceMutation } from "@/hooks/mutations/use-service-mutation";
import { useServiceQuery } from "@/hooks/queries/use-service-query";
import { useAuthStore } from "../store/auth-store";
import { authService } from "../services/auth-service";
import type { LoginCredentials, RegisterData, AuthResponse } from "../types/auth.types";

export const useLogin = () => {
  const { login } = useAuthStore();

  return useServiceMutation<AuthResponse, LoginCredentials>({
    queryKey: ["currentUser"],
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    options: {
      onSuccess: (data) => {
        login(data.user, data.token);
      },
    },
  });
};

export const useRegister = () => {
  const { login } = useAuthStore();

  return useServiceMutation<AuthResponse, RegisterData>({
    queryKey: ["currentUser"],
    mutationFn: (data: RegisterData) => authService.register(data),
    options: {
      onSuccess: (data) => {
        login(data.user, data.token);
      },
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();

  return useServiceMutation<void, void>({
    queryKey: ["currentUser"],
    mutationFn: () => authService.logout(),
    options: {
      onSuccess: () => {
        logout();
      },
    },
  });
};

export const useCurrentUser = () => {
  const { user, token } = useAuthStore();

  return useServiceQuery<AuthResponse["user"]>({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    options: {
      enabled: !!token && !user,
      initialData: user || undefined,
    },
  });
};


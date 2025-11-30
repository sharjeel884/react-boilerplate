import { useServiceQuery } from "@/hooks/queries/use-service-query";
import { useServiceMutation } from "@/hooks/mutations/use-service-mutation";
import { userService } from "../services/user-service";
import type { CreateUserData, UpdateUserData, UsersResponse, User } from "../types/user.types";

export const useUsers = (params?: { page?: number; limit?: number; search?: string }) => {
  return useServiceQuery<UsersResponse>({
    queryKey: params ? ["users", params] : ["users"],
    queryFn: () => userService.getUsers(params),
  });
};

export const useUser = (id: string) => {
  return useServiceQuery<User>({
    queryKey: ["user", id],
    queryFn: () => userService.getUserById(id),
    options: {
      enabled: !!id,
    },
  });
};

export const useCreateUser = () => {
  return useServiceMutation<User, CreateUserData>({
    queryKey: ["users"],
    mutationFn: (variables: CreateUserData) => userService.createUser(variables),
  });
};

export const useUpdateUser = () => {
  return useServiceMutation<User, { id: string; data: UpdateUserData }>({
    queryKey: ["users"],
    mutationFn: async (variables) => {
      const { id, data } = variables;
      return await userService.updateUser(id, data);
    },
  });
};

export const useDeleteUser = () => {
  return useServiceMutation<void, string>({
    queryKey: ["users"],
    mutationFn: (id: string) => userService.deleteUser(id),
  });
};


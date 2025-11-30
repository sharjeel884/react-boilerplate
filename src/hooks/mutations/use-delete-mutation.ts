import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/config/axios-instance";
import type { AxiosError, AxiosResponse } from "axios";

interface DeleteMutationOptions<TData = void, TError = AxiosError> {
  queryKey: unknown[];
  endpoint: string | ((id: string) => string);
  customMutationFn?: (id: string) => Promise<AxiosResponse<TData>>;
  options?: Omit<
    UseMutationOptions<AxiosResponse<TData>, TError, string, unknown>,
    "mutationFn"
  >;
}

export function useDeleteMutation<TData = void>(
  config: DeleteMutationOptions<TData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: config.customMutationFn
      ? config.customMutationFn
      : async (id: string) => {
          const endpoint =
            typeof config.endpoint === "function"
              ? config.endpoint(id)
              : `${config.endpoint}/${id}`;
          const response = await axiosInstance.delete<TData>(endpoint);
          return response;
        },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: config.queryKey });
    },
    ...config.options,
  });
}


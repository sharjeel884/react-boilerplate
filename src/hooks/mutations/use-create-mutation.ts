import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/config/axios-instance";
import type { AxiosError, AxiosResponse } from "axios";

interface CreateMutationOptions<TData, TVariables, TError = AxiosError> {
  queryKey: unknown[];
  endpoint: string;
  customMutationFn?: (variables: TVariables) => Promise<AxiosResponse<TData>>;
  options?: Omit<
    UseMutationOptions<AxiosResponse<TData>, TError, TVariables, unknown>,
    "mutationFn"
  >;
}

export function useCreateMutation<TData = unknown, TVariables = unknown>(
  config: CreateMutationOptions<TData, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: config.customMutationFn
      ? config.customMutationFn
      : async (variables: TVariables) => {
          const response = await axiosInstance.post<TData>(config.endpoint, variables);
          return response;
        },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: config.queryKey });
    },
    ...config.options,
  });
}


import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/config/axios-instance";
import type { AxiosError, AxiosResponse } from "axios";

interface UpdateMutationOptions<TData, TVariables, TError = AxiosError> {
  queryKey: unknown[];
  endpoint: string | ((variables: TVariables & { id: string }) => string);
  customMutationFn?: (variables: TVariables & { id: string }) => Promise<AxiosResponse<TData>>;
  options?: Omit<
    UseMutationOptions<AxiosResponse<TData>, TError, TVariables & { id: string }, unknown>,
    "mutationFn"
  >;
}

export function useUpdateMutation<TData = unknown, TVariables = unknown>(
  config: UpdateMutationOptions<TData, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: config.customMutationFn
      ? config.customMutationFn
      : async (variables: TVariables & { id: string }) => {
          const endpoint =
            typeof config.endpoint === "function"
              ? config.endpoint(variables)
              : `${config.endpoint}/${variables.id}`;
          const response = await axiosInstance.put<TData>(endpoint, variables);
          return response;
        },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: config.queryKey });
      queryClient.invalidateQueries({ queryKey: [...config.queryKey, variables.id] });
    },
    ...config.options,
  });
}


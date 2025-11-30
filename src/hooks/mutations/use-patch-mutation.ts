import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/config/axios-instance";
import type { AxiosError, AxiosResponse } from "axios";

interface PatchMutationOptions<TData, TVariables, TError = AxiosError> {
  queryKey: string[];
  endpoint: string | ((variables: TVariables & { id: string }) => string);
  options?: Omit<
    UseMutationOptions<AxiosResponse<TData>, TError, TVariables & { id: string }, unknown>,
    "mutationFn"
  >;
}

export function usePatchMutation<TData = unknown, TVariables = unknown>(
  config: PatchMutationOptions<TData, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables & { id: string }) => {
      const endpoint =
        typeof config.endpoint === "function"
          ? config.endpoint(variables)
          : `${config.endpoint}/${variables.id}`;
      const response = await axiosInstance.patch<TData>(endpoint, variables);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: config.queryKey });
      queryClient.invalidateQueries({ queryKey: [...config.queryKey, variables.id] });
    },
    ...config.options,
  });
}


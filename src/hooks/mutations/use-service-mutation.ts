import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

interface ServiceMutationOptions<TData, TVariables, TError = Error> {
  queryKey: unknown[];
  mutationFn: (variables: TVariables) => Promise<TData>;
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, unknown>,
    "mutationFn"
  >;
}

/**
 * Simplified mutation hook that works directly with service functions
 * Returns data directly (not AxiosResponse)
 */
export function useServiceMutation<TData = unknown, TVariables = unknown>(
  config: ServiceMutationOptions<TData, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: config.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: config.queryKey });
    },
    ...config.options,
  });
}


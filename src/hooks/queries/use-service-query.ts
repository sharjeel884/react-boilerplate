import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

interface ServiceQueryOptions<TData, TError = Error> {
  queryKey: unknown[];
  queryFn: () => Promise<TData>;
  options?: Omit<UseQueryOptions<TData, TError, TData, unknown[]>, "queryKey" | "queryFn">;
}

/**
 * Simplified query hook that works directly with service functions
 * Returns data directly (not AxiosResponse)
 */
export function useServiceQuery<TData = unknown>(
  config: ServiceQueryOptions<TData>
) {
  return useQuery({
    queryKey: config.queryKey,
    queryFn: config.queryFn,
    ...config.options,
  });
}


import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "@/config/axios-instance";
import type { AxiosError, AxiosResponse } from "axios";

interface GetQueryOptions<TData, TError = AxiosError> {
  queryKey: unknown[];
  endpoint: string;
  customQueryFn?: () => Promise<AxiosResponse<TData>>;
  options?: Omit<
    UseQueryOptions<AxiosResponse<TData>, TError, AxiosResponse<TData>, unknown[]>,
    "queryKey" | "queryFn"
  >;
}

export function useGetQuery<TData = unknown>(
  config: GetQueryOptions<TData>
) {
  return useQuery({
    queryKey: config.queryKey,
    queryFn: config.customQueryFn
      ? config.customQueryFn
      : async () => {
          const response = await axiosInstance.get<TData>(config.endpoint);
          return response;
        },
    ...config.options,
  });
}


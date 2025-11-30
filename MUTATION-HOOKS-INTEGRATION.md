# Mutation Hooks Integration Guide

## Overview

All user hooks now use the centralized mutation and query helpers from `src/hooks/mutations` and `src/hooks/queries`. This provides consistency, automatic query invalidation, and better error handling.

## Updated Hooks

### useUsers (GET Query)

Uses `useGetQuery` helper with custom query function that wraps the service:

```tsx
import { useGetQuery } from "@/hooks/queries";
import { userService } from "../services/user-service";

export const useUsers = (params?: { page?: number; limit?: number; search?: string }) => {
  const query = useGetQuery<UsersResponse>({
    queryKey: params ? ["users", params] : ["users"],
    endpoint: "/users",
    customQueryFn: async () => {
      const data = await userService.getUsers(params);
      return {
        data,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      } as AxiosResponse<UsersResponse>;
    },
  });

  // Transform AxiosResponse to direct data for easier consumption
  return {
    ...query,
    data: query.data?.data,
  };
};
```

**Benefits:**
- Uses centralized query helper
- Automatic query key management
- Consistent error handling
- Returns data directly (not AxiosResponse)

### useUser (GET Query)

Similar pattern for single user:

```tsx
export const useUser = (id: string) => {
  const query = useGetQuery<User>({
    queryKey: ["user", id],
    endpoint: `/users/${id}`,
    customQueryFn: async () => {
      const data = await userService.getUserById(id);
      return { data, status: 200, ... } as AxiosResponse<User>;
    },
    options: { enabled: !!id },
  });

  return { ...query, data: query.data?.data };
};
```

### useCreateUser (POST Mutation)

Uses `useCreateMutation` helper:

```tsx
export const useCreateUser = () => {
  const mutation = useCreateMutation<User, CreateUserData>({
    queryKey: ["users"],
    endpoint: "/users",
    customMutationFn: async (variables: CreateUserData) => {
      const data = await userService.createUser(variables);
      return { data, status: 201, ... } as AxiosResponse<User>;
    },
  });

  // Transform to return data directly
  return {
    ...mutation,
    mutate: (variables, options) => {
      mutation.mutate(variables, {
        ...options,
        onSuccess: (response, vars, context) => {
          options?.onSuccess?.(response.data, vars, context);
        },
      });
    },
  };
};
```

**Benefits:**
- Automatic query invalidation
- Consistent error handling
- Returns data directly in callbacks

### useUpdateUser (PUT Mutation)

Uses `useUpdateMutation` helper:

```tsx
export const useUpdateUser = () => {
  const mutation = useUpdateMutation<User, UpdateUserData>({
    queryKey: ["users"],
    endpoint: (variables) => `/users/${variables.id}`,
    customMutationFn: async (variables: UpdateUserData & { id: string }) => {
      const { id, ...data } = variables;
      const result = await userService.updateUser(id, data);
      return { data: result, status: 200, ... } as AxiosResponse<User>;
    },
  });

  // Transform to accept { id, data } format
  return {
    ...mutation,
    mutate: (variables: { id: string; data: UpdateUserData }, options?) => {
      mutation.mutate({ id: variables.id, ...variables.data }, {
        ...options,
        onSuccess: (response, vars, context) => {
          options?.onSuccess?.(response.data, vars, context);
        },
      });
    },
  };
};
```

**Benefits:**
- Automatic query invalidation for both list and single item
- Accepts `{ id, data }` format for easier usage
- Returns data directly

### useDeleteUser (DELETE Mutation)

Uses `useDeleteMutation` helper:

```tsx
export const useDeleteUser = () => {
  return useDeleteMutation({
    queryKey: ["users"],
    endpoint: (id: string) => `/users/${id}`,
    customMutationFn: async (id: string) => {
      await userService.deleteUser(id);
      return { data: undefined, status: 200, ... } as AxiosResponse<void>;
    },
  });
};
```

## Enhanced Mutation Helpers

All mutation helpers now support `customMutationFn` and `customQueryFn`:

### useCreateMutation
- `customMutationFn?: (variables: TVariables) => Promise<AxiosResponse<TData>>`
- Allows using services instead of direct axios calls

### useUpdateMutation
- `customMutationFn?: (variables: TVariables & { id: string }) => Promise<AxiosResponse<TData>>`
- Supports function-based endpoints

### useDeleteMutation
- `customMutationFn?: (id: string) => Promise<AxiosResponse<TData>>`
- Supports function-based endpoints

### useGetQuery
- `customQueryFn?: () => Promise<AxiosResponse<TData>>`
- Allows using services instead of direct axios calls

## Usage in Components

The hooks maintain the same API, so components don't need changes:

```tsx
// Still works the same way
const { data, isLoading, error } = useUsers({ page: 1, limit: 10, search: "john" });
const { mutate: createUser, isPending } = useCreateUser();
const { mutate: updateUser } = useUpdateUser();
const { mutate: deleteUser } = useDeleteUser();

// Data is returned directly, not as AxiosResponse
console.log(data.users); // ✅ Works
console.log(data.total); // ✅ Works

// Mutations work the same
createUser({ name: "John", email: "john@example.com", ... });
updateUser({ id: "1", data: { name: "John Updated" } });
deleteUser("1");
```

## Migration Benefits

1. **Consistency** - All hooks use the same pattern
2. **Automatic Invalidation** - Query cache updates automatically
3. **Error Handling** - Centralized error handling
4. **Type Safety** - Full TypeScript support
5. **Flexibility** - Can use services or direct API calls
6. **Future-Proof** - Easy to switch from mock services to real API

## Service Integration

The hooks use `customMutationFn` and `customQueryFn` to integrate with mock services while maintaining the mutation helper structure. When you're ready to switch to real APIs:

1. Remove `customMutationFn` and `customQueryFn`
2. The helpers will automatically use `axiosInstance`
3. Update endpoints if needed
4. Components remain unchanged

## Example: Switching to Real API

**Before (with mock service):**
```tsx
customMutationFn: async (variables) => {
  const data = await userService.createUser(variables);
  return { data, ... } as AxiosResponse<User>;
}
```

**After (with real API):**
```tsx
// Just remove customMutationFn - it will use axiosInstance.post automatically
useCreateMutation<User, CreateUserData>({
  queryKey: ["users"],
  endpoint: "/api/users", // Real API endpoint
});
```


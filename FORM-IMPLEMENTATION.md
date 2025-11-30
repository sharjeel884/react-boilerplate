# Form Implementation Guide

## Overview

All forms in the application now use React Hook Form with Zod validation and a consistent `FormWrapper` component pattern.

## FormWrapper Component

The `FormWrapper` component (`src/components/form/form-wrapper.tsx`) provides:

- Automatic form state management via React Hook Form
- Error handling and display
- Root error display
- Form submission handling

### Usage

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "@/components/form/form-wrapper";
import { yourSchema } from "./schemas/your.schema";

const form = useForm({
  resolver: zodResolver(yourSchema),
  defaultValues: {
    // your default values
  },
});

const onSubmit = async (data) => {
  // Handle submission
};

<FormWrapper form={form} onSubmit={onSubmit}>
  {/* Form fields */}
</FormWrapper>
```

## FormFieldWrapper Components

Simplified form field components that handle all validation, error display, and styling:

### FormFieldInput

For text, email, password, and other input types:

```tsx
import { FormFieldInput } from "@/components/form/form-field-wrapper";

<FormFieldInput
  name="email"
  label="Email address"
  type="email"
  placeholder="Enter your email"
  icon={<FiMail className="h-5 w-5" />}
  required
/>
```

### FormFieldTextarea

For multi-line text input:

```tsx
import { FormFieldTextarea } from "@/components/form/form-field-wrapper";

<FormFieldTextarea
  name="description"
  label="Description"
  placeholder="Enter description"
  rows={5}
  required
/>
```

### FormFieldSelect

For dropdown selections:

```tsx
import { FormFieldSelect } from "@/components/form/form-field-wrapper";

<FormFieldSelect
  name="role"
  label="Role"
  options={[
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ]}
  required
/>
```

## Mutation Hooks

All API mutations use helper functions from `src/hooks/mutations/`:

### useCreateMutation (POST)

```tsx
import { useCreateMutation } from "@/hooks/mutations";

const { mutate, isPending, error } = useCreateMutation({
  queryKey: ["users"],
  endpoint: "/api/users",
  options: {
    onSuccess: (data) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    },
  },
});

mutate({ name: "John", email: "john@example.com" });
```

### useUpdateMutation (PUT)

```tsx
import { useUpdateMutation } from "@/hooks/mutations";

const { mutate, isPending } = useUpdateMutation({
  queryKey: ["users"],
  endpoint: "/api/users",
});

mutate({ id: "1", name: "John Updated", email: "john@example.com" });
```

### usePatchMutation (PATCH)

```tsx
import { usePatchMutation } from "@/hooks/mutations";

const { mutate, isPending } = usePatchMutation({
  queryKey: ["users"],
  endpoint: "/api/users",
});

mutate({ id: "1", name: "John Updated" });
```

### useDeleteMutation (DELETE)

```tsx
import { useDeleteMutation } from "@/hooks/mutations";

const { mutate, isPending } = useDeleteMutation({
  queryKey: ["users"],
  endpoint: "/api/users",
});

mutate("user-id-123");
```

### useGetQuery (GET)

```tsx
import { useGetQuery } from "@/hooks/queries";

const { data, isLoading, error } = useGetQuery({
  queryKey: ["users"],
  endpoint: "/api/users",
  options: {
    enabled: true,
    // other react-query options
  },
});
```

## Complete Form Example

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormWrapper } from "@/components/form/form-wrapper";
import { FormFieldInput, FormFieldSelect } from "@/components/form/form-field-wrapper";
import { useCreateMutation } from "@/hooks/mutations";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "user"]),
});

type FormData = z.infer<typeof formSchema>;

export function UserForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });

  const { mutate, isPending } = useCreateMutation({
    queryKey: ["users"],
    endpoint: "/api/users",
    options: {
      onSuccess: () => {
        toast.success("User created successfully");
        form.reset();
      },
      onError: (error: any) => {
        form.setError("root", {
          message: error.response?.data?.message || "Failed to create user",
        });
      },
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormFieldInput
        name="name"
        label="Name"
        required
        placeholder="Enter name"
      />

      <FormFieldInput
        name="email"
        label="Email"
        type="email"
        required
        placeholder="Enter email"
      />

      <FormFieldSelect
        name="role"
        label="Role"
        required
        options={[
          { value: "user", label: "User" },
          { value: "admin", label: "Admin" },
        ]}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create User"}
      </Button>
    </FormWrapper>
  );
}
```

## Updated Forms

All forms have been updated to use:

✅ **FormWrapper** - Consistent form handling
✅ **FormFieldWrapper components** - Simplified field creation
✅ **Zod validation** - Type-safe schemas
✅ **Mutation hooks** - Consistent API calls
✅ **Error handling** - Automatic error display

### Forms Updated:

1. **Login Page** (`src/modules/auth/components/login-page.tsx`)
   - Uses FormWrapper
   - Uses FormFieldInput components
   - Zod validation schema

2. **Register Page** (`src/modules/auth/components/register-page.tsx`)
   - Uses FormWrapper
   - Uses FormFieldInput components
   - Zod validation schema

3. **User Modal** (`src/modules/users/components/user-modal.tsx`)
   - Uses FormWrapper
   - Uses FormFieldInput and FormFieldSelect
   - Separate schemas for create/update
   - Uses mutation hooks

## Benefits

1. **Consistency** - All forms follow the same pattern
2. **Type Safety** - Full TypeScript support with Zod
3. **Validation** - Automatic client-side validation
4. **Error Handling** - Automatic error display
5. **Less Boilerplate** - FormFieldWrapper reduces code
6. **Maintainability** - Changes in one place affect all forms


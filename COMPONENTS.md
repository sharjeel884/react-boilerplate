# UI Components & Form Integration Guide

## Overview

This project now includes a complete set of shadcn/ui-style components with variants, React Hook Form integration, and professional mutation hooks.

## UI Components

All components are located in `src/components/ui/` and follow shadcn/ui patterns with variants using `class-variance-authority`.

### Available Components

#### Button (`button.tsx`)
- **Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **Sizes**: `default`, `sm`, `lg`, `icon`
- **Usage**:
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
```

#### Input (`input.tsx`)
- **Variants**: `default`, `error`, `success`
- **Sizes**: `default`, `sm`, `lg`
- **Usage**:
```tsx
import { Input } from '@/components/ui/input';

<Input variant="default" size="lg" placeholder="Enter text" />
<Input variant="error" placeholder="Error state" />
```

#### Textarea (`textarea.tsx`)
- **Variants**: `default`, `error`, `success`
- **Sizes**: `default`, `sm`, `lg`
- **Usage**:
```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea variant="default" placeholder="Enter description" />
```

#### Select (`select.tsx`)
- **Variants**: `default`, `error`, `success`
- **Sizes**: `default`, `sm`, `lg`
- **Usage**:
```tsx
import { Select } from '@/components/ui/select';

<Select variant="default">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

#### Label (`label.tsx`)
- **Variants**: `default`, `error`, `success`
- **Sizes**: `default`, `sm`, `lg`
- **Usage**:
```tsx
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email</Label>
```

#### Card (`card.tsx`)
- **Variants**: `default`, `outlined`, `elevated`
- **Sub-components**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Usage**:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

#### Badge (`badge.tsx`)
- **Variants**: `default`, `secondary`, `destructive`, `outline`, `success`, `warning`
- **Usage**:
```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="default">New</Badge>
<Badge variant="success">Active</Badge>
```

#### FormError (`form-error.tsx`)
- **Usage**:
```tsx
import { FormError } from '@/components/ui/form-error';

<FormError message="This field is required" />
```

## Form Components with React Hook Form

All form components are located in `src/components/form/` and integrate seamlessly with React Hook Form.

### FormField (`form-field.tsx`)
Core component for form field management with validation.

### Form Components

#### FormInput (`form-input.tsx`)
- Automatically handles error states
- Integrates with React Hook Form validation
- **Usage**:
```tsx
import { FormField, FormItem, FormLabel, FormControl, FormInput, FormMessage } from '@/components/form/form-field';

<FormField
  control={control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <FormInput {...field} type="email" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

#### FormTextarea (`form-textarea.tsx`)
- Same pattern as FormInput
- **Usage**: Similar to FormInput but for textarea fields

#### FormSelect (`form-select.tsx`)
- Same pattern as FormInput
- **Usage**: Similar to FormInput but for select fields

### Complete Form Example

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormInput, FormMessage } from '@/components/form/form-field';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <FormInput {...field} type="email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <FormInput {...field} type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Mutation Hooks

Professional mutation hooks are located in `src/hooks/mutations/`:

### useCreateMutation
For POST requests to create resources.

```tsx
import { useCreateMutation } from '@/hooks/mutations/use-create-mutation';

const { mutate, isPending, error } = useCreateMutation({
  queryKey: ['users'],
  endpoint: '/api/users',
  options: {
    onSuccess: (data) => {
      console.log('User created:', data);
    },
  },
});

// Usage
mutate({ name: 'John', email: 'john@example.com' });
```

### useUpdateMutation
For PUT requests to update resources.

```tsx
import { useUpdateMutation } from '@/hooks/mutations/use-update-mutation';

const { mutate, isPending } = useUpdateMutation({
  queryKey: ['users'],
  endpoint: '/api/users',
});

// Usage
mutate({ id: '1', name: 'John Updated', email: 'john@example.com' });
```

### usePatchMutation
For PATCH requests to partially update resources.

```tsx
import { usePatchMutation } from '@/hooks/mutations/use-patch-mutation';

const { mutate, isPending } = usePatchMutation({
  queryKey: ['users'],
  endpoint: '/api/users',
});

// Usage
mutate({ id: '1', name: 'John Updated' });
```

### useDeleteMutation
For DELETE requests to remove resources.

```tsx
import { useDeleteMutation } from '@/hooks/mutations/use-delete-mutation';

const { mutate, isPending } = useDeleteMutation({
  queryKey: ['users'],
  endpoint: '/api/users',
});

// Usage
mutate('user-id-123');
```

## File Naming Convention

All files are now in **kebab-case**:
- ✅ `button.tsx`, `input.tsx`, `form-field.tsx`
- ✅ `use-create-mutation.ts`, `use-update-mutation.ts`
- ✅ `auth-store.ts`, `user-service.ts`
- ✅ `login-page.tsx`, `dashboard-page.tsx`

## Utilities

### cn() Function
Located in `src/lib/utils.ts`, combines `clsx` and `tailwind-merge` for conditional class names.

```tsx
import { cn } from '@/lib/utils';

<div className={cn('base-class', condition && 'conditional-class')} />
```

## Validation with Zod

All forms should use Zod schemas for validation:

```tsx
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18 or older'),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

## Best Practices

1. **Always use FormField** for form inputs with validation
2. **Use mutation hooks** instead of direct axios calls
3. **Define Zod schemas** for all form validation
4. **Use variants** to maintain consistent styling
5. **Follow kebab-case** for all file names
6. **Type everything** with TypeScript

## Example: Complete CRUD Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateMutation, useUpdateMutation } from '@/hooks/mutations';
import { FormField, FormItem, FormLabel, FormControl, FormInput, FormMessage } from '@/components/form/form-field';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm({ user, onClose }: { user?: User; onClose: () => void }) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user || { name: '', email: '' },
  });

  const createMutation = useCreateMutation({
    queryKey: ['users'],
    endpoint: '/api/users',
  });

  const updateMutation = useUpdateMutation({
    queryKey: ['users'],
    endpoint: '/api/users',
  });

  const onSubmit = (data: UserFormData) => {
    if (user) {
      updateMutation.mutate({ id: user.id, ...data });
    } else {
      createMutation.mutate(data);
    }
    onClose();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user ? 'Edit User' : 'Create User'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <FormInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <FormInput {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-2">
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {user ? 'Update' : 'Create'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```


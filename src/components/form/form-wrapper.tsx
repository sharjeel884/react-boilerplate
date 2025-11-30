import * as React from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormWrapperProps<TFieldValues extends Record<string, any> = Record<string, any>> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  showRootError?: boolean;
}

export function FormWrapper<TFieldValues extends Record<string, any>>({
  form,
  onSubmit,
  children,
  className,
  showRootError = true,
}: FormWrapperProps<TFieldValues>) {
  const handleSubmit = async (data: TFieldValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-6", className)}
      >
        {showRootError && form.formState.errors.root && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
            {form.formState.errors.root.message as string}
          </div>
        )}
        {children}
      </form>
    </FormProvider>
  );
}


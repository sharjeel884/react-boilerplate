import * as React from "react";
import { useFormField } from "./form-field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FormInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {}

const FormInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  FormInputProps
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Input
      ref={ref}
      id={formItemId}
      variant={error ? "error" : undefined}
      aria-invalid={!!error}
      className={cn(error && "border-error-500", className)}
      {...props}
    />
  );
});
FormInput.displayName = "FormInput";

export { FormInput };


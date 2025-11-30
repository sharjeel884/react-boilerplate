import * as React from "react";
import { useFormField } from "./form-field";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface FormSelectProps
  extends React.ComponentPropsWithoutRef<typeof Select> {}

const FormSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  FormSelectProps
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Select
      ref={ref}
      id={formItemId}
      variant={error ? "error" : undefined}
      aria-invalid={!!error}
      className={cn(error && "border-error-500", className)}
      {...props}
    />
  );
});
FormSelect.displayName = "FormSelect";

export { FormSelect };


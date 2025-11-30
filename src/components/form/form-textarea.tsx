import * as React from "react";
import { useFormField } from "./form-field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface FormTextareaProps
  extends React.ComponentPropsWithoutRef<typeof Textarea> {}

const FormTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  FormTextareaProps
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Textarea
      ref={ref}
      id={formItemId}
      variant={error ? "error" : undefined}
      aria-invalid={!!error}
      className={cn(error && "border-error-500", className)}
      {...props}
    />
  );
});
FormTextarea.displayName = "FormTextarea";

export { FormTextarea };


import * as React from "react";
import { useFormField } from "./form-field";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import type { InputWithIconProps } from "@/components/ui/input-with-icon";

export interface FormInputWithIconProps
  extends Omit<InputWithIconProps, "id" | "aria-invalid" | "aria-describedby"> {}

const FormInputWithIcon = React.forwardRef<
  React.ElementRef<typeof InputWithIcon>,
  FormInputWithIconProps
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <InputWithIcon
      ref={ref}
      id={formItemId}
      variant={error ? "error" : undefined}
      aria-invalid={!!error}
      className={className}
      {...props}
    />
  );
});
FormInputWithIcon.displayName = "FormInputWithIcon";

export { FormInputWithIcon };


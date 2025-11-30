import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "./form-field";
import { FormInputWithIcon } from "./form-input-with-icon";
import { FormInput } from "./form-input";
import { FormTextarea } from "./form-textarea";
import { FormSelect } from "./form-select";

interface BaseFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

interface FormFieldInputProps extends BaseFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
}

interface FormFieldTextareaProps extends BaseFieldProps {
  placeholder?: string;
  rows?: number;
}

interface FormFieldSelectProps extends BaseFieldProps {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export function FormFieldInput({
  name,
  label,
  description,
  required,
  type = "text",
  placeholder,
  icon,
  autoComplete,
}: FormFieldInputProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-error-600 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            {icon ? (
              <FormInputWithIcon
                {...field}
                type={type}
                placeholder={placeholder}
                icon={icon}
                autoComplete={autoComplete}
              />
            ) : (
              <FormInput
                {...field}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormFieldTextarea({
  name,
  label,
  description,
  required,
  placeholder,
  rows,
}: FormFieldTextareaProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-error-600 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <FormTextarea
              {...field}
              placeholder={placeholder}
              rows={rows}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormFieldSelect({
  name,
  label,
  description,
  required,
  options,
  placeholder,
}: FormFieldSelectProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-error-600 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <FormSelect {...field}>
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}


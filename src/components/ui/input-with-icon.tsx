import * as React from "react";
import { Input, type InputProps } from "./input";
import { cn } from "@/lib/utils";

export interface InputWithIconProps extends InputProps {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon, iconPosition = "left", ...props }, ref) => {
    return (
      <div className="relative">
        <div
          className={cn(
            "absolute inset-y-0 flex items-center pointer-events-none",
            iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3"
          )}
        >
          <div className="text-gray-400">{icon}</div>
        </div>
        <Input
          ref={ref}
          className={cn(
            iconPosition === "left" ? "pl-10" : "pr-10",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";


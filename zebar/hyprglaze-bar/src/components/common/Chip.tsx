import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { buttonStyles } from "./Button";

interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "div" | "button";
}

export const Chip = forwardRef<HTMLElement, ChipProps>(
  ({ className, children, as = "div", ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          buttonStyles,
          "px-2 py-1 rounded-lg text-sm font-medium text-text flex items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Chip.displayName = "Chip";

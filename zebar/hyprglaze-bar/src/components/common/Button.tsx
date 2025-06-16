import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const buttonStyles = "bg-background/50 border border-button-border/50 hover:bg-background/70 hover:border-button-border/70 transition-colors duration-200";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonStyles,
          "px-2 py-1 rounded-lg text-sm font-medium text-text flex items-center justify-center h-full min-h-[28px]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

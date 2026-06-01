import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-medium transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-black/10 dark:border-white/15 bg-black/[0.05] dark:bg-white/[0.11] text-black dark:text-white shadow-glass backdrop-blur-2xl hover:border-lime-500/45 dark:hover:border-lime-300/45 hover:bg-lime-500/15 dark:hover:bg-lime-300/15",
        secondary:
          "border border-black/10 dark:border-white/12 bg-black/5 dark:bg-black/25 text-black dark:text-white backdrop-blur-2xl hover:border-black/20 dark:hover:border-white/28 hover:bg-black/10 dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-8 text-[0.95rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, children, ...props }, ref) => {
    const Comp = asChild ? Slot : href ? "a" : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        href={href}
        {...(props as any)}
      >
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/70 to-transparent opacity-70" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

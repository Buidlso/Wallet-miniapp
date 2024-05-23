import { Loader, LucideIcon } from "lucide-react";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: LucideIcon | false;
  iconPosition?: "left" | "right";
  state?: "default" | "loading" | "disabled";
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon: Icon,
      iconPosition = "left",
      children,
      state = "default",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const classname = cn(
      className,
      `flex items-center gap-2 ${
        iconPosition === "right" && "flex-row-reverse"
      }`
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className: classname }))}
        ref={ref}
        {...props}
      >
        {state === "loading" ? (
          <Loader className="icon-size-16 animate-spin" />
        ) : (
          Icon && <Icon className={"icon-size-16"} />
        )}
        {children}
      </Comp>
    );
  }
);
ButtonIcon.displayName = "ButtonIcon";

export { ButtonIcon };

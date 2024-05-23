import { ButtonProps, buttonVariants } from "../ui/button";
import Link, { LinkProps } from "next/link";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconLinkProps = ButtonProps &
  LinkProps & {
    icon?: LucideIcon;
    testId?: string;
    href: string;
    iconPosition?: "left" | "right";
    isExternalLink?: boolean;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  };

export const IconLink = ({
  testId,
  href,
  icon: Icon,
  variant,
  children,
  isExternalLink,
  iconPosition,
  size,
  className,
  ...props
}: IconLinkProps) => {
  const classname = cn(
    `flex items-center gap-2 ${iconPosition === "right" && "flex-row-reverse"}`,
    className
  );

  return (
    <Link
      data-testid={testId}
      className={cn(
        buttonVariants({ variant: variant, size: size, className: classname })
      )}
      href={href}
      target={isExternalLink ? "_blank" : ""}
    >
      {Icon && <Icon className="icon-size-16" />}
      {children}
    </Link>
  );
};

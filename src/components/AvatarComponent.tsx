import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./custom-avatar";

type sm = "sm";
type xs = "xs";
type md = "md";
type lg = "lg";
type xl = "xl";

type AvatarComponentProps = {
  avatarUrl: string | LucideIcon;
  avatarFallback: string;
  className?: React.ComponentProps<"span">["className"];
  size?: sm | md | lg | xs | xl;
};

export const AvatarComponent = ({
  avatarUrl,
  avatarFallback,
  className,
  size,
}: AvatarComponentProps) => {
  return (
    <Avatar
      className={cn(
        size === "xs" && "avatar-global-xs",
        size === "sm" && "avatar-global-sm",
        size === "md" && "avatar-global-md",
        size === "lg" && "avatar-global-lg",
        size === "xl" && "h-full rounded-none"
      )}
    >
      <AvatarImage
        src={avatarUrl as string}
        className={cn("object-cover p-2", className)}
      />
      <AvatarFallback className={cn("p-2 uppercase", className)}>
        {avatarFallback?.length > 1 ? avatarFallback?.[0] : avatarFallback?.[0]}
      </AvatarFallback>
    </Avatar>
  );
};

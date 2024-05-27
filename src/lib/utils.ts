import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatEnum = (enumValue: string): string => {
  // Check if the string contains underscores
  if (enumValue.includes("_")) {
    return enumValue
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  } else {
    // If no underscores, handle as a single word
    return enumValue.charAt(0) + enumValue.slice(1).toLowerCase();
  }
};

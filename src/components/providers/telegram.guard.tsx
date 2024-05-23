"use client";

import { PropsWithChildren } from "react";
import { useTelegram } from "./telegram.provider";

export function TelegramGuard({ children }: PropsWithChildren) {
  const { user } = useTelegram();

  if (!user) {
    return <div>Not authorized</div>;
  }

  return <div>{children}</div>;
}

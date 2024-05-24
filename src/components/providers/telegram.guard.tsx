"user client";

import React, { PropsWithChildren } from "react";
import { useAppDispatch, useTelegramStore } from "@/redux/hooks";

import { Loading } from "../Loading";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { telegramActions } from "@/redux/actions";

export function TelegramGuard(props: PropsWithChildren) {
  const { telegramUserId } = useTelegramStore();
  const { initData } = retrieveLaunchParams();
  const dispath = useAppDispatch();

  React.useEffect(() => {
    if (!telegramUserId && !!initData?.user?.id) {
      dispath(telegramActions.setTelegramUserId(initData.user.id.toString()));
    }
  }, [telegramUserId, initData?.user?.id]);

  if (!telegramUserId) {
    return <Loading />;
  }

  return <>{props.children}</>;
}

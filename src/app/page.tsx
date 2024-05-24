"use client";

import React, { useState } from "react";
import { telegramActions, walletActions } from "@/redux/actions";
import { useAppDispatch, useTelegramStore } from "@/redux/hooks";

import { Button } from "@/components/ui/button";
import { ButtonIcon } from "@/components/button/ButtonIcon";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import { Loader } from "@/components/loader";
import { Me } from "@/components/me";
import Wallet from "@/components/wallet";
import { retrieveLaunchParams } from "@tma.js/sdk";

export default function Home() {
  const [sendTransaction, setSendTransaction] = useState(false);

  function handleSendTransaction() {
    setSendTransaction((prev) => !prev);
  }

  const { telegramUserId } = useTelegramStore();
  const { initData } = retrieveLaunchParams();
  const dispath = useAppDispatch();

  React.useEffect(() => {
    if (!telegramUserId && !!initData?.user?.id) {
      dispath(telegramActions.setTelegramUserId(initData.user.id.toString()));
    }
  }, [telegramUserId, initData?.user?.id]);

  return (
    <>
      <Wallet sendTransaction={sendTransaction} />
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ButtonIcon } from "@/components/button/ButtonIcon";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import { Loader } from "@/components/loader";
import { Me } from "@/components/me";
import SelectUser from "@/components/SelectUser";
import Wallet from "@/components/wallet";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { walletActions } from "@/redux/actions";

export const dummyUser = [
  {
    id: 1,
    username: "somidh",
    firstName: "Somidh",
  },
  {
    id: 2,
    username: "Johndoe",
    firstName: "John",
  },
  {
    id: 3,
    username: "Janedoe",
    firstName: "Jane",
  },
];

export default function Home() {
  // const sendTransactionToId = props?.chatUser?.id?.value?.toString();
  // const sendTransactionToUsername = props?.chatUser?.username;
  // const sendTransactionToFirstName = props?.chatUser?.firstName;

  // function handleSendTransaction() {
  //   dispatch(
  //     walletActions.setSendTransactionTo({
  //       telegramId: sendTransactionToId,
  //       username: sendTransactionToUsername,
  //       firstName: sendTransactionToFirstName,
  //     })
  //   );
  // }

  const [sendTransaction, setSendTransaction] = useState(false);

  function handleSendTransaction() {
    setSendTransaction((prev) => !prev);
  }

  return (
    <>
      <Wallet sendTransaction={sendTransaction} />
      <div>
        <ButtonIcon
          data-testid="sendCryptoButton"
          className="py-5 w-full"
          variant={"destructive"}
          onClick={handleSendTransaction}
          icon={DollarSign}
        >
          {false ? <Loader className="size-4 animate-spin" /> : "Send"}
        </ButtonIcon>
      </div>
    </>
  );
}

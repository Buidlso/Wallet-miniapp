"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBalanceQuery, useGetWalletQuery } from "@/server/api/wallet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NetworkEnum } from "@/types/enums";
import SelectUser from "./SelectUser";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/Typography";
import WalletBalanceCard from "@/components/WalletBalanceCard";
import { useAppDispatch } from "@/redux/hooks";
import { useSendTransactionMutation } from "@/server/api/wallet";
import { useTelegram } from "@/components/providers";
import { useWalletStore } from "@/redux/hooks";

type WalletBalance = {
  ETH_MAINNET: number;
  SEPOLIA: number;
  OPTIMISM_MAINNET: number;
  ARBITRUM_MAINNET: number;
  POLYGON_MAINNET: number;
};

const Wallet = ({ sendTransaction }: { sendTransaction: boolean }) => {
  const { user } = useTelegram();
  const { wallet, sendTransactionToUser, walletBalance } = useWalletStore();
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkEnum>(
    NetworkEnum.ETH_MAINNET
  );
  const [selectedToken, setSelectedToken] = useState<string>();
  const [errorTransaction, setErrorTransaction] = useState<string>();

  const { isLoading: isGetWalletLoading } = useGetWalletQuery(
    user?.id?.toString()!,
    !wallet?.walletAddress
  );

  const { isLoading: isGetWalletBalanceLoading } = useGetBalanceQuery(
    wallet?.telegramId!,
    selectedNetwork,
    !isGetWalletLoading && !!wallet?.walletAddress
  );
  const { data } = useSendTransactionMutation();

  return (
    <div className="bg-muted h-wull min-w-96 py-4 px-5 space-y-6 flex flex-col items-center overflow-x-auto border border-border rounded-tr-[12px] rounded-br-[12px] border-l-0">
      <SwitchNetwork
        selectedNetwork={selectedNetwork}
        setSelectNetwork={setSelectedNetwork}
      />

      {/* {!!sendTransactionToUser?.telegramId ? ( */}
      {sendTransaction ? (
        <SendTransaction
          selectedToken={selectedToken!}
          selectedNetwork={selectedNetwork!}
          setErrorTransaction={setErrorTransaction}
          errorTransaction={errorTransaction!}
        />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="text-primary">Wallet Balance</p>
          <h1 className="text-pink-600 font-extrabold text-4xl">
            {walletBalance?.ETH?.toFixed(4) ?? 0} ETH
          </h1>
        </div>
      )}

      <Separator />
      <div className="w-full space-y-2">
        {walletBalance &&
          Object?.keys(walletBalance! as WalletBalance)
            ?.filter(
              (wallet: string | null) =>
                (walletBalance as WalletBalance)[
                  wallet as keyof WalletBalance
                ] !== null
            )
            .map((token) => (
              <WalletBalanceCard
                showIsSelected={!!sendTransactionToUser?.telegramId}
                key={token}
                token={token}
                amount={
                  walletBalance
                    ? (walletBalance as WalletBalance)[
                        token as keyof WalletBalance
                      ]
                    : 0
                }
                setSelectedToken={setSelectedToken}
                selectedToken={selectedToken}
                setErrorTransaction={setErrorTransaction}
              />
            ))}
      </div>
    </div>
  );
};

export default Wallet;

export const SwitchNetwork = ({
  selectedNetwork,
  setSelectNetwork,
}: {
  selectedNetwork: NetworkEnum;
  setSelectNetwork: (network: NetworkEnum) => void;
}) => {
  return (
    <Select
      onValueChange={(network: NetworkEnum) => {
        setSelectNetwork(network as NetworkEnum);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ethereum Mainnet" />
      </SelectTrigger>
      <SelectContent>
        {Object?.keys(NetworkEnum)?.map((network) => (
          <SelectItem key={network} value={network}>
            {network}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const SendTransaction = ({
  selectedToken,
  selectedNetwork,
  errorTransaction,
  setErrorTransaction,
}: {
  selectedToken: string;
  selectedNetwork: NetworkEnum;
  errorTransaction: string;
  setErrorTransaction: (message: string) => void;
}) => {
  const { user } = useTelegram();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>();
  const [ethAmount, setEthAmount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { wallet, sendTransactionToUser, walletBalance } = useWalletStore();
  const [hash, setHash] = useState<string>();

  const {
    data,
    isSuccess,
    mutateAsync: sendTransaction,
    isError,
    error,
  } = useSendTransactionMutation();

  const handleSendCrypto = async () => {
    if (!selectedToken) {
      setErrorTransaction("Please select a token");
      return;
    }

    const { hash } = await sendTransaction({
      amount: ethAmount!,
      from: user?.id.toString()!,
      network: selectedNetwork,
      to: sendTransactionToUser?.telegramId!,
      asset: selectedToken!,
    });
    setHash(hash);
    setErrorTransaction("");
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Input
        value={ethAmount}
        type="number"
        onChange={(e) => setEthAmount(parseFloat(e.target.value))}
        className="text-pink-600 font-extrabold text-4xl outline-none border-none shadow-none text-center focus:outline-none focus-visible:ring-0"
      />
      <p className="text-muted-foreground">Enter Amount</p>
      <Button onClick={handleSendCrypto}>Send</Button>
      {errorTransaction && (
        <Typography className="text-red-600">{errorTransaction}</Typography>
      )}
      <Separator />

      <div className="text-center space-y-3">
        <div>
          <p className="text-muted-foreground">Sending to:</p>
          <SelectUser />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{sendTransactionToUser?.firstName}</p>
        </div>
        <Typography className="break-all text-muted-foreground">
          {hash}
        </Typography>
      </div>
    </div>
  );
};

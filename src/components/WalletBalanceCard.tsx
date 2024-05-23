"use client";

import React, { useState } from "react";

import CryptoLogo from "./CryptoLogo";

interface CardProps {
  logo?: string;
  token: string;
  amount: number;
  setSelectedToken: (token: string) => void;
  showIsSelected?: boolean;
  selectedToken?: string;
  setErrorTransaction: (message: string) => void;
}

const WalletBalanceCard = ({
  logo,
  token,
  amount,
  setSelectedToken,
  showIsSelected,
  selectedToken,
  setErrorTransaction,
}: CardProps) => {
  function handleSelectedToken() {
    if (amount === 0) {
      setErrorTransaction("Insufficient Balance");
    } else {
      setErrorTransaction("");
    }
    setSelectedToken(token);
  }

  return (
    <div
      onClick={handleSelectedToken}
      className={` ${
        selectedToken === token && "border border-gray-900"
      } w-full flex items-center justify-between px-4 py-3 border  rounded-xl  bg-background  ${
        showIsSelected && "cursor-pointer"
      } `}
    >
      <div className="flex items-center gap-4">
        <CryptoLogo token={token} />
        <div>
          <p>{token}</p>
        </div>
      </div>
      <p className="text-pink-600">{amount.toFixed(4)}</p>
    </div>
  );
};

export default WalletBalanceCard;

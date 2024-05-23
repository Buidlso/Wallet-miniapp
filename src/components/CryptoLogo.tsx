import EthIcon from "/public/images/eth.png";
import { Hexagon } from "lucide-react";
import Image from "next/image";
import MaticIcon from "/public/images/maticIcon.svg";
import React from "react";
import USDCIcon from "/public/images/usdc.png";
import USDTIcon from "/public/images/usdt.png";

const CryptoLogo = ({ token }: { token: string }) => {
  const logos = {
    ETH: EthIcon,
    MATIC: MaticIcon,
    USDC: USDCIcon,
    USDT: USDTIcon,
  };

  return (
    <div>
      <Image className="size-4" src={(logos as any)?.[token]} alt="token" />
    </div>
  );
};

export default CryptoLogo;

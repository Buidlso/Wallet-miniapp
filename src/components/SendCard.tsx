// "use client";

// import { Check, LucideIcon } from "lucide-react";

// import { ButtonIcon } from "./button/ButtonIcon";
// import React from "react";

// interface SendCardProps {
//   icon?: LucideIcon | false;
//   cryptoAmount: string;
//   amount: string;
//   cryptoName: string;
//   selected: boolean;
//   setSelectedCrypto: any;
//   selectedCrypto: string | null;
// }

// const SendCard = ({
//   icon: Icon,
//   cryptoAmount,
//   amount,
//   cryptoName,
//   selected,
//   setSelectedCrypto,
//   selectedCrypto,
// }: SendCardProps) => {
//   const handleSelectedCrypto = (crypto: string) => {
//     setSelectedCrypto(crypto);
//   };

//   return (
//     <div className="w-full flex items-center justify-between px-4 py-3 border  rounded-xl  bg-background ">
//       <div className="flex items-center gap-4">
//         <div
//           className="w-5 h-5 rounded-full border border-foreground/100 flex items-center justify-center cursor-pointer"
//           onClick={() => handleSelectedCrypto(cryptoName)}
//         >
//           {selectedCrypto === cryptoName && <Check className="w-4 h-4" />}
//         </div>
//         <ButtonIcon
//           icon={Icon}
//           variant={"outline"}
//           className="bg-secondary"
//         ></ButtonIcon>
//         <div>
//           <p>{cryptoName}</p>
//           <p className="text-muted-foreground">{cryptoAmount}</p>
//         </div>
//       </div>
//       <p className="text-pink-600">${amount}</p>
//     </div>
//   );
// };

// export default SendCard;

// "use client";

// import { ButtonIcon } from "./button/ButtonIcon";
// import CryptoLogo from "./CryptoLogo";
// import { LucideIcon } from "lucide-react";
// import React from "react";

// interface HistoryCardProps {
//   icon?: LucideIcon | false;
//   cryptoAmount: string;
//   amount: string;
//   type: "DEBIT" | "CREDIT";
// }

// const HistoryCard = ({
//   icon: Icon,
//   cryptoAmount,
//   amount,
//   type,
// }: HistoryCardProps) => {
//   return (
//     <div className=" w-full flex items-center justify-between px-4 py-3 border  rounded-xl  bg-background ">
//       <div className="flex items-center gap-4">
//         <ButtonIcon
//           icon={Icon}
//           variant={"outline"}
//           className="bg-secondary"
//         ></ButtonIcon>
//         <div>
//           <p className="text-muted-foreground">${cryptoAmount}</p>
//         </div>
//       </div>
//       <p className={`${type === "DEBIT" ? "text-pink-600" : "text-green-600"}`}>
//         ${amount}
//       </p>
//     </div>
//   );
// };

// export default HistoryCard;

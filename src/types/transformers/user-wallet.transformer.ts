import { TokenEnum } from "../enums/token-enum";
import { z } from "zod";

// Create User Wallet //
export const CreateUserWalletReqTransformer = z.object({
  telegramId: z.string(),
});

// Get User Wallet //
export const GetUserWalletReqTransformer = z.object({
  telegramId: z.string(),
});

export const GetUserWalletResTransformer = z.object({
  id: z.string(),
  telegramId: z.string(),
  walletAddress: z.string(),
  createdAt: z.date(),
});

// Get Balance //
// export const GetBalanceResTransformer = z.object({
//   MAINNET: z.string().transform((value) => parseFloat(value)),
//   SEPOLIA: z.string().transform((value) => parseFloat(value)),
//   OPTIMISM_MAINNET: z.string().transform((value) => parseFloat(value)),
//   OPTIMISM_SEPOLIA: z.string().transform((value) => parseFloat(value)),
//   ARBITRUM_MAINNET: z.string().transform((value) => parseFloat(value)),
//   ARBITRUM_SEPOLIA: z.string().transform((value) => parseFloat(value)),
//   POLYGON_MAINNET: z.string().transform((value) => parseFloat(value)),
//   POLYGON_SEPOLIA: z.string().transform((value) => parseFloat(value)),
// });
export const GetBalanceResTransformer = z.record(
  z.nativeEnum(TokenEnum),
  z.string().transform((val) => parseFloat(val))
);

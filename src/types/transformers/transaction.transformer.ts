import { NetworkEnum } from "../enums";
import { TokenEnum } from "../enums/token-enum";
import { z } from "zod";

export const TransferCryptoCurrencyReqTransformer = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.number(),
  asset: z.string(),
  network: z.nativeEnum(NetworkEnum),
});

export const TransferCryptoCurrencyResTransformer = z.object({
  hash: z.string(),
});

import type { z } from "zod";

import type {
  TransferCryptoCurrencyReqTransformer,
  TransferCryptoCurrencyResTransformer,
} from "../transformers";

export type TTransferCryptoCurrencyReqDto = z.infer<
  typeof TransferCryptoCurrencyReqTransformer
>;

export type TTransferCryptoCurrencyResDto = z.infer<
  typeof TransferCryptoCurrencyResTransformer
>;

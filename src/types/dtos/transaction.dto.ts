import type {
  TransferCryptoCurrencyByAddressReqTransformer,
  TransferCryptoCurrencyByAddressResTransformer,
  TransferCryptoCurrencyReqTransformer,
  TransferCryptoCurrencyResTransformer,
} from "../transformers";

import type { z } from "zod";

export type TTransferCryptoCurrencyReqDto = z.infer<
  typeof TransferCryptoCurrencyReqTransformer
>;

export type TTransferCryptoCurrencyResDto = z.infer<
  typeof TransferCryptoCurrencyResTransformer
>;
export type TTransferCryptoCurrencyByAddressReqDto = z.infer<
  typeof TransferCryptoCurrencyByAddressReqTransformer
>;

export type TTransferCryptoCurrencyByAddressResDto = z.infer<
  typeof TransferCryptoCurrencyByAddressResTransformer
>;

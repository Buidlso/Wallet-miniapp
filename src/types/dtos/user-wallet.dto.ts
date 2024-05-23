import type { z } from 'zod';

import type {
  CreateUserWalletReqTransformer,
  GetBalanceResTransformer,
  GetUserWalletResTransformer,
} from '../transformers';

// Create User Wallet //
export type TCreateUserWalletReqDto = z.infer<
  typeof CreateUserWalletReqTransformer
>;

// Get User Wallet //
export type TGetUserWalletResDto = z.infer<typeof GetUserWalletResTransformer>;

// Get Balance //
export type TGetBalanceResDto = z.infer<typeof GetBalanceResTransformer>;

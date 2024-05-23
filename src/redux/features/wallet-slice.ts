import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TGetBalanceResDto, TGetUserWalletResDto } from "@/types/dtos";

type TWalletState = {
  wallet?: TGetUserWalletResDto;
  walletBalance?: TGetBalanceResDto;
  sendTransactionToUser?: {
    telegramId: string;
    username: string;
    firstName: string;
  };
};

const initialState: TWalletState = {
  wallet: undefined,
  sendTransactionToUser: undefined,
};

const walletSlice = createSlice({
  name: "Wallet",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<any>) => {
      state.wallet = action.payload;
    },
    setWalletBalance: (state, action: PayloadAction<TGetBalanceResDto>) => {
      state.walletBalance = action.payload;
    },
    setSendTransactionTo: (
      state,
      action: PayloadAction<
        | {
            telegramId: string;
            username: string;
            firstName: string;
          }
        | undefined
      >
    ) => {
      state.sendTransactionToUser = action.payload;
    },
  },
});

export default walletSlice.reducer;
export const walletActions = walletSlice.actions;

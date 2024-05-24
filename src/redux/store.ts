import miniappSlice, { telegramActions } from "./features/telegram-slice";

import { configureStore } from "@reduxjs/toolkit";
import telegramReducer from "./features/telegram-slice";
import walletReducer from "./features/wallet-slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    wallet: walletReducer,
    telegram: telegramReducer,
  },
});

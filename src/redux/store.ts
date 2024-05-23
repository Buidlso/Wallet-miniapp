import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./features/wallet-slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    wallet: walletReducer,
  },
});

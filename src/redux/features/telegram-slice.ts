import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IState {
  telegramUserId: string;
}

const initialState: IState = {
  telegramUserId: "",
};

export const telegramSlice = createSlice({
  name: "miniApp",
  initialState,
  reducers: {
    setTelegramUserId(state, action: PayloadAction<IState["telegramUserId"]>) {
      state.telegramUserId = action.payload;
    },
  },
});

export default telegramSlice.reducer;
export const telegramActions = telegramSlice.actions;

import { AppDispatch, RootState } from ".";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selector hooks for utilization
export const useWalletStore = () => useAppSelector((state) => state.wallet);
export const useTelegramStore = () => useAppSelector((state) => state.telegram);

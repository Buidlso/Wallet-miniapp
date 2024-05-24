import {
  TCreateUserWalletReqDto,
  TGetBalanceResDto,
  TGetUserWalletResDto,
  TTransferCryptoCurrencyByAddressReqDto,
  TTransferCryptoCurrencyReqDto,
  TTransferCryptoCurrencyResDto,
} from "@/types/dtos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { NetworkEnum } from "@/types/enums";
import axios from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { walletActions } from "@/redux/features/wallet-slice";

// import { _1Min } from "@/types/time";

export const useSendTransactionMutation = () => {
  const queryClient = useQueryClient();

  async function sendTransaction(payload: TTransferCryptoCurrencyReqDto) {
    const { data } = await axios.post<TTransferCryptoCurrencyResDto>(
      "/transactions/send",
      payload
    );
    return data;
  }

  // on success
  function onSuccess(resp?: TTransferCryptoCurrencyResDto) {
    // queryClient.invalidateQueries(["SEND_TRANSACTION"]);
    toast({
      title: "Transaction Successfull",
      variant: "default",
    });
  }

  function onError(err?: AxiosError) {
    toast({
      title: "Transaction failed",
      variant: "destructive",
    });
  }

  return useMutation({
    mutationKey: ["SEND_TRANSACTION"],
    mutationFn: sendTransaction,
    onSuccess,
    onError,
  });
};
export const useSendTransactionByAddressMutation = () => {
  const queryClient = useQueryClient();

  async function sendTransactionByAddress(
    payload: TTransferCryptoCurrencyByAddressReqDto
  ) {
    const { data } = await axios.post<TTransferCryptoCurrencyResDto>(
      "/transactions/send-by-address",
      payload
    );
    return data;
  }

  // on success
  function onSuccess(resp?: TTransferCryptoCurrencyResDto) {
    // queryClient.invalidateQueries(["SEND_TRANSACTION"]);
    toast({
      title: "Transaction Successfull",
      variant: "default",
    });
  }

  function onError(err?: AxiosError) {
    toast({
      title: "Transaction failed",
      variant: "destructive",
    });
  }

  return useMutation({
    mutationKey: ["SEND_TRANSACTION_BY_ADDRESS"],
    mutationFn: sendTransactionByAddress,
    onSuccess,
    onError,
  });
};

export const useGetBalanceQuery = (
  address: string,
  network: NetworkEnum,
  dependsOn?: boolean
) => {
  const dispatch = useAppDispatch();

  async function getBalance() {
    const { data } = await axios.get<TGetBalanceResDto>(
      `/wallets/balance/${address}?network=${network}`
    );
    return data;
  }

  // on success
  function onSuccess(resp?: TGetBalanceResDto) {
    dispatch(walletActions.setWalletBalance(resp!));
  }

  function onError(err?: AxiosError) {
    toast({
      title: "Could not fetch balance",
      variant: "destructive",
    });
  }

  return useQuery({
    queryKey: ["GET_BALANCE", network],
    queryFn: getBalance,
    retry: 0,
    onSuccess,
    onError,
    enabled: dependsOn,
  });
};

export const useCreateWalletMutation = () => {
  const queryClient = useQueryClient();

  async function createWallet(payload: TCreateUserWalletReqDto) {
    const { data } = await axios.post(`/wallets`, payload);

    return;
  }

  // on success
  function onSuccess() {
    // queryClient.invalidateQueries(["WALLET"]);
    toast({
      title: "Wallet successfully created",
      variant: "default",
    });
  }

  function onError(err?: AxiosError) {
    toast({
      title: "Wallet creation failed",
      variant: "destructive",
    });
  }

  return useMutation({
    mutationKey: ["CREATE_WALLET"],
    mutationFn: createWallet,
    onSuccess,
    onError,
  });
};

export const useGetWalletQuery = (
  telegramUserId: string,
  dependsOn?: boolean
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function getWallet() {
    const { data } = await axios.get<TGetUserWalletResDto>(
      `/wallets/${telegramUserId}`
    );
    return data;
  }

  function onSuccess(resp?: TGetUserWalletResDto) {
    dispatch(walletActions.setWallet(resp));
    router.push("/");
  }

  function onError(err?: AxiosError) {
    toast({
      title: "Cannot fetch wallet",
      variant: "destructive",
    });
  }

  return useQuery({
    queryKey: ["GET_WALLET"],
    queryFn: getWallet,
    onSuccess,
    onError,
    enabled: dependsOn,
  });
};

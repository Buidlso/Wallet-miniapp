"use client";

import {
  BaseSyntheticEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useCreateWalletMutation,
  useGetWalletQuery,
} from "@/server/api/wallet";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { StringSession } from "telegram/sessions";
import { TelegramClient } from "telegram";
import { Typography } from "../Typography";
import { set } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useWalletStore } from "@/redux/hooks";

// import { sendLoginCode } from "@/lib/telegram/auth";

// types //
type TUser = {
  id: number;
  isBot: boolean;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
};

type TTelegramCtx = {
  client: TelegramClient;
  user: TUser | null;
};

interface IInitialState {
  phoneNumber: string;
  password: string;
  phoneCode: string;
}

// context //
const TelegramCtx = createContext<TTelegramCtx>({
  client: {} as TelegramClient,
  user: null,
});

const initialState: IInitialState = {
  phoneNumber: "",
  password: "",
  phoneCode: "",
};

function getTelegramClient(session: string): TelegramClient {
  const sessionStore = new StringSession(session);
  return new TelegramClient(
    sessionStore,
    25195361,
    "b14701ec05bec4a87a27936b89887ca6",
    {}
  );
}

// provider //
export function TelegramProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const { wallet } = useWalletStore();
  const [session, setSession] = useState<string>("");
  const [isClientConnected, setIsClientConnected] = useState<boolean>(false);
  const [isOtpLoading, setIsOtpLoading] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [client, setClient] = useState<TelegramClient>(
    getTelegramClient(session)
  );
  const { mutateAsync: createWallet } = useCreateWalletMutation();

  const [{ phoneNumber, password, phoneCode }, setAuthInfo] =
    useState(initialState);

  function loadSession() {
    const session = localStorage.getItem("TELEGRAM_SESSION");
    if (session) {
      setSession(JSON.parse(session));
    }
  }

  function loadClient() {
    if (!session) return;
    const client = getTelegramClient(session);

    setClient(client);
    startClient(client);
  }

  async function startClient(client: TelegramClient) {
    if (!client.connected) {
      await client.connect();
      setIsClientConnected(true);
    }
  }

  async function fetchUser() {
    if (!isClientConnected) return;
    const user = await client.getMe();
    setUser({
      id: user.id.toJSNumber(),
      firstName: user?.firstName,
      lastName: user?.lastName,
      isBot: user?.bot ?? false,
      phone: user?.phone,
      username: user?.username,
    });
  }

  function loadUser() {
    fetchUser();
  }

  function redirectToDashboard() {
    if (!!session && !!wallet?.id) router.push("/");
  }

  useEffect(loadSession, []);
  useEffect(loadClient, [session]);
  useEffect(redirectToDashboard, [session]);
  useEffect(loadUser, [isClientConnected]);

  // async function sendCodeHandler() {
  //   if (!client) return;
  //   setShowOtpForm(true);
  //   try {
  //     await sendLoginCode(client, phoneNumber);
  //   } catch (error) {
  //     setShowOtpForm(false);
  //   }
  // }

  async function clientStartHandler(): Promise<void> {
    if (!client) return;

    setIsOtpLoading(true);
    await client.start({
      phoneNumber,
      password: userAuthPasswordCallback(password),
      phoneCode: userAuthOTPCallback(phoneCode),
      onError: (err) => {
        console.log(err);
      },
    });

    const session = client.session.save();
    localStorage.setItem("TELEGRAM_SESSION", JSON.stringify(session));
    setSession(session as unknown as string);

    const user = await client.getMe();
    const userId = user?.id?.toJSNumber()?.toString();

    if (!!userId) {
      await createWallet({
        telegramId: userId,
      });
    }

    setIsOtpLoading(false);
    router.push("/");
  }

  function inputChangeHandler({
    target: { name, value },
  }: BaseSyntheticEvent): void {
    setAuthInfo((authInfo) => ({ ...authInfo, [name]: value }));
  }

  function userAuthOTPCallback<T>(param: T): () => Promise<T> {
    return async function () {
      return await new Promise<T>((resolve) => {
        resolve(param);
      });
    };
  }
  function userAuthPasswordCallback<T>(param: T): () => Promise<T> {
    return async function () {
      return await new Promise<T>((resolve) => {
        resolve(param);
      });
    };
  }

  if (!session)
    return (
      <div className="flex flex-col gap-4 items-center justify-center max-w-96 mx-auto h-screen">
        {/* <div className="w-full">
          <LoginForm
            handleOnChange={inputChangeHandler}
            onClick={clientStartHandler}
          />
        </div> */}

        <h2 className="text-3xl font-semibold mb-2 text-center">
          {showOtpForm ? "Verify Otp" : "Let's Get Started"}
        </h2>

        {!showOtpForm ? (
          <div className="w-full space-y-4">
            <div className="w-full space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={inputChangeHandler}
                placeholder="Enter your phone number with country code"
              />
              <Typography variant={"muted"}>eg. 91xxxxxxxxxx</Typography>
            </div>
            <div className="w-full space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={inputChangeHandler}
                placeholder="Enter password"
              />
              <Typography variant={"muted"}>
                Enter Password if 2FA enabled
              </Typography>
            </div>

            {/* <Button
              type="button"
              value="start client"
              onClick={sendCodeHandler}
              className="w-full"
            >
              Continue
            </Button> */}
          </div>
        ) : (
          <>
            <div className="w-full space-y-2">
              <Label>Otp</Label>
              <Input
                type="text"
                name="phoneCode"
                value={phoneCode}
                onChange={inputChangeHandler}
                placeholder="Enter the otp sent to your phone number"
              />
            </div>
            <Button
              type="button"
              value="insert code"
              onClick={clientStartHandler}
              className="w-full"
            >
              Continue
            </Button>
          </>
        )}
      </div>
    );

  return (
    <TelegramCtx.Provider
      value={{
        client,
        user,
      }}
    >
      {children}
    </TelegramCtx.Provider>
  );
}

// hooks //
export function useTelegram() {
  return useContext(TelegramCtx);
}

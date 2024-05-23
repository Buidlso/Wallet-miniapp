import { Loader } from "lucide-react";
import Card from "./WalletBalanceCard";

type LoadingProps = {};

export function Loading(props: LoadingProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/70 backdrop-blur-md">
      <Loader className="size-8 animate-spin" />
    </div>
  );
}

export function TabsLoading() {
  return (
    <div
      className={
        " display-card flex h-96 w-full items-center justify-center shadow-none"
      }
    >
      <Loader className="size-8 animate-spin" />
    </div>
  );
}

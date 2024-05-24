"use client";

import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Inter } from "next/font/google";
import React from "react";
import { ReduxProvider } from "@/redux/reduxProvider";
import { TelegramGuard } from "@/components/providers";
import { TmaSDKProvider } from "@/components/tma";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client] = React.useState(new QueryClient());
  return (
    <html lang="en">
      <body className={inter.className}>
        <TmaSDKProvider>
          <ReduxProvider>
            <TelegramGuard>
              <QueryClientProvider client={client}>
                <ReduxProvider>{children}</ReduxProvider>
              </QueryClientProvider>
            </TelegramGuard>
          </ReduxProvider>
        </TmaSDKProvider>
      </body>
    </html>
  );
}

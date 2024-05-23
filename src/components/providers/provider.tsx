"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function QueryProviders({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default QueryProviders;

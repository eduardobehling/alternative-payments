"use client";

import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import createApolloClient from "@/lib/apolloClient";

export function ApolloProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createApolloClient(), []);

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}

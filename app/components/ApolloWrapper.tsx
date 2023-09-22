import React from "react";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import makeClient from "@/lib/apolloClient";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

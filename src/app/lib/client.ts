"use client";
import { ApolloLink, createHttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import { WebSocketLink } from "@apollo/client/link/ws";

const multiApiLink = ApolloLink.from([
  new MultiAPILink({
    endpoints: {
      forbole: process.env.NEXT_PUBLIC_FORBOLE_GQL,
      desmos: process.env.NEXT_PUBLIC_DESMOS_GQL,
      bondscape: process.env.NEXT_PUBLIC_BONDSCAPE_GQL,
    } as any,
    httpSuffix: "/v1/graphql",
    wsSuffix: "/v1/graphql",
    createHttpLink,
    createWsLink: (uri) =>
      new WebSocketLink({
        uri,
        options: {
          reconnect: true,
        },
      }),
  }),
]);

function makeClient() {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: multiApiLink,
  });
}

export default makeClient;

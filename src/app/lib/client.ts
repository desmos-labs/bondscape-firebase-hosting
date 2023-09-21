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
      forbole: "https://gql.desmos.forbole.com",
      desmos: "https://gql.mainnet.desmos.network",
      bondscape: "https://gql-bondscape.mainnet.desmos.network",
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

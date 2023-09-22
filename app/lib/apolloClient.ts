"use client";
import { ApolloLink, createHttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { parseCookies } from "nookies";

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
  const bearerToken = parseCookies().bearer_token;
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: bearerToken ? `Bearer ${bearerToken}` : "",
      },
    };
  });
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            multiApiLink.concat(authLink),
          ])
        : multiApiLink.concat(authLink),
    connectToDevTools: true,
  });
}

export default makeClient;

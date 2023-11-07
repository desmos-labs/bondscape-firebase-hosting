"use client";
import { ApolloLink, concat, createHttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import { WebSocketLink } from "@apollo/client/link/ws";
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

const authMiddleware = new ApolloLink((operation, forward) => {
  const bearerToken = parseCookies().bearer_token;
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: bearerToken ? `Bearer ${bearerToken}` : "",
    },
  }));

  return forward(operation);
});

function makeClient() {
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
            multiApiLink,
            authMiddleware,
          ])
        : concat(authMiddleware, multiApiLink),
    connectToDevTools: true,
  });
}

export default makeClient;

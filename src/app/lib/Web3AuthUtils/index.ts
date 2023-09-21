import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OPENLOGIN_NETWORK } from "@toruslabs/openlogin-utils";

export const chainConfig = {
  chainNamespace: "other" as any,
  blockExplorer: "https://bigdipper.live/desmos",
  displayName: "Desmos",
  chainId: "desmos-mainnet",
  ticker: "DSM",
  tickerName: "Desmos",
  rpcTarget: "https://rpc.mainnet.desmos.network",
};
export const newWeb3AuthClient = () =>
  new Web3AuthNoModal({
    clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID_MAINNET,
    web3AuthNetwork: OPENLOGIN_NETWORK.CYAN,
    chainConfig,
  });

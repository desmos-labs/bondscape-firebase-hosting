import { useCallback, useState } from "react";
import useGetOnChainProfile from "../profile/useGetOnChainProfile";
import { Web3AuthLoginProvider } from "@/types/web3auth";
import { SupportedChain } from "@/types/chains";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { PrivateKeyType } from "@desmoslabs/desmjs";
import { fromHex } from "@cosmjs/encoding";
import { generateWeb3AuthWallet } from "@/lib/WalletUtils";
import { useWeb3AuthClient } from "@/recoil/web3auth";
import usePerformLogin from "../apis/usePerformLogin";
import { setCookie } from "nookies";
import axiosInstance from "../../services/axios";
import useUser from "@/hooks/user/useUser";
import { useRouter } from "next/navigation";
import { err, ok, Result } from "neverthrow";

/**
 * Hook that allows to log in using the Web3Auth protocol.
 * @param chain the chain to use.
 */
const useLoginWithWeb3Auth = (chain: SupportedChain) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const web3authClient = useWeb3AuthClient();
  const fetchProfile = useGetOnChainProfile();
  const performLogin = usePerformLogin();
  const router = useRouter();
  const { saveUser } = useUser();

  const generatePrivateKey = useCallback(
    async (
      loginProvider: string,
      provider: IProvider,
    ): Promise<Result<void, Error>> => {
      const hexEncodedPrivateKey = (await provider?.request({
        method: "private_key",
      })) as string;
      const pKey = {
        type: PrivateKeyType.Secp256k1,
        key: fromHex(hexEncodedPrivateKey),
      };
      const account = await generateWeb3AuthWallet(
        chain.prefix,
        loginProvider,
        pKey?.key!,
      );

      if (account) {
        const profile = await fetchProfile(account.wallet.address);
        if (profile) {
          const loginResult = await performLogin(account.wallet);
          if (loginResult.isOk()) {
            const bearer = loginResult.value;
            if (bearer) {
              console.log("[TOKEN]:", bearer);
              // We use a cookie to store the bearer token for the apollo client
              setCookie(null, "bearer_token", bearer);
              axiosInstance.defaults.headers.common = {
                Authorization: `Bearer ${bearer}`,
              };
              await saveUser({
                profile: profile,
                account: account.account,
                isLoggedIn: true,
                bearer: bearer,
              }).then(() => {
                router.push("/");
              });
            }
          }
        } else {
          web3authClient?.logout();
          setLoginLoading(false);
          return err(
            new Error("Profile not found", { cause: "profile_not_found" }),
          );
        }
      }
      web3authClient?.logout();
      setLoginLoading(false);
      return ok(undefined);
    },
    [
      chain.prefix,
      fetchProfile,
      performLogin,
      router,
      saveUser,
      web3authClient,
    ],
  );

  /**
   * Function called when the user wants to log in using the Web3Auth protocol.
   * @param loginProvider the login provider to use (google/apple).
   */
  const login = useCallback(
    async (
      loginProvider: Web3AuthLoginProvider,
    ): Promise<Result<void, Error>> => {
      if (!web3authClient) {
        return err(new Error("Web3Auth client not initialized"));
      }
      // Wait a bit to let the button complete its animation.
      setLoginLoading(true);
      if (web3authClient.status !== "connected") {
        await web3authClient.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
          loginProvider,
        });
      }
      return generatePrivateKey(loginProvider, web3authClient.provider!);
    },
    [generatePrivateKey, web3authClient],
  );

  return {
    login,
    loginLoading,
  };
};

export default useLoginWithWeb3Auth;

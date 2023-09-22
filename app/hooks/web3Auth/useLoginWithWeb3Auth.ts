import { useCallback, useState } from "react";
import useGetOnChainProfile from "../profile/useGetOnChainProfile";
import { Web3AuthLoginProvider } from "../../types/web3auth";
import { SupportedChain } from "../../types/chains";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { PrivateKeyType } from "@desmoslabs/desmjs";
import { fromHex } from "@cosmjs/encoding";
import { generateWeb3AuthWallet } from "../../lib/WalletUtils";
import {
  useSetActiveAccountAddress,
  useStoreAccount,
} from "../../recoil/accounts";
import { useSetActiveProfile, useStoreProfile } from "../../recoil/profiles";
import { useRouter } from "next/navigation";
import { useWeb3AuthClient } from "../../recoil/web3auth";
import usePerformLogin from "../apis/usePerformLogin";
import Login from "../../services/axios/requests/Login";
import { setCookie } from "nookies";
import axiosInstance from "../../services/axios";

/**
 * Hook that allows to log in using the Web3Auth protocol.
 * @param chain the chain to use.
 */
const useLoginWithWeb3Auth = (chain: SupportedChain) => {
  const fetchProfile = useGetOnChainProfile();
  const storeAccount = useStoreAccount();
  const storeProfile = useStoreProfile();
  const setActiveAccountAddress = useSetActiveAccountAddress();
  const setActiveProfile = useSetActiveProfile();
  const [loginLoading, setLoginLoading] = useState(false);
  const router = useRouter();
  const web3authClient = useWeb3AuthClient();
  const generateLoginParams = usePerformLogin();

  const generatePrivateKey = useCallback(
    async (loginProvider: string, provider: IProvider) => {
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
        const params = await generateLoginParams(account.wallet);
        if (params.isOk()) {
          const bearer = await Login(params.value);
          if (bearer.isOk()) {
            setCookie(null, "bearer_token", bearer.value);
            axiosInstance.defaults.headers.common = {
              Authorization: `Bearer ${bearer.value}`,
            };
          }
        }
      }

      const profile = await fetchProfile(account.wallet.address);
      if (profile) {
        storeAccount(account.account);
        storeProfile(profile);
        setActiveAccountAddress(account.account.address);
        setActiveProfile(profile);
        router.replace("/");
      }
      setLoginLoading(false);
    },
    [
      chain.prefix,
      fetchProfile,
      generateLoginParams,
      router,
      setActiveAccountAddress,
      setActiveProfile,
      storeAccount,
      storeProfile,
    ],
  );

  /**
   * Function called when the user wants to log in using the Web3Auth protocol.
   * @param loginProvider the login provider to use (google/apple).
   */
  const login = useCallback(
    async (loginProvider: Web3AuthLoginProvider) => {
      if (!web3authClient) {
        return;
      }
      // Wait a bit to let the button complete its animation.
      setLoginLoading(true);
      try {
        if (web3authClient.status !== "connected") {
          await web3authClient.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider,
          });
        }
        await generatePrivateKey(loginProvider, web3authClient.provider!);
      } catch (e: any) {
        console.error(e);
        setLoginLoading(false);
        return;
      }
    },
    [generatePrivateKey, web3authClient],
  );

  return {
    login,
    loginLoading,
  };
};

export default useLoginWithWeb3Auth;

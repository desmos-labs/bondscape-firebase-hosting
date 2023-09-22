import { chainConfig, newWeb3AuthClient } from "@/lib/Web3AuthUtils";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useCallback, useEffect } from "react";
import { useSetWeb3AuthClient } from "@/recoil/web3auth";

export const useInitWeb3Auth = () => {
  const setWeb3AuthClient = useSetWeb3AuthClient();
  const init = useCallback(async () => {
    const web3authClient = newWeb3AuthClient();
    const privateKeyProvider = new CommonPrivateKeyProvider({
      config: { chainConfig },
    });

    const openloginAdapter = new OpenloginAdapter({ privateKeyProvider });
    web3authClient.configureAdapter(openloginAdapter);
    await web3authClient.init();
    setWeb3AuthClient(web3authClient);
  }, [setWeb3AuthClient]);

  useEffect(() => {
    init();
  }, [init]);
};

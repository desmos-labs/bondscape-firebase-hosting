import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Web3AuthNoModal } from "@web3auth/no-modal";

export const web3authAppState = atom<Web3AuthNoModal | undefined>({
  key: "web3auth",
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const useWeb3AuthClient = () => useRecoilValue(web3authAppState);

export const useSetWeb3AuthClient = () => useSetRecoilState(web3authAppState);

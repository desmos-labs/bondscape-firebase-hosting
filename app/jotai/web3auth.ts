"use client";

import { Web3AuthNoModal } from "@web3auth/no-modal";
import { atom, useAtomValue, useSetAtom } from "jotai";

export const web3authAppState = atom<Web3AuthNoModal | undefined>(undefined);

export const useWeb3AuthClient = () => useAtomValue(web3authAppState);

export const useSetWeb3AuthClient = () => useSetAtom(web3authAppState);

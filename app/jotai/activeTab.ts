"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";

export const activeTabState = atom<number>(0);

export const useActiveTab = () => useAtomValue(activeTabState);

export const useSetActiveTab = () => useSetAtom(activeTabState);

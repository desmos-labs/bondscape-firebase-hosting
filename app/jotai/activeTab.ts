"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const activeTabState = atomWithStorage<number>("activeTab", 0);

export const useActiveTab = () => useAtomValue(activeTabState);

export const useSetActiveTab = () => useSetAtom(activeTabState);

import { atomWithStorage } from "jotai/utils";
import { useAtomValue, useSetAtom } from "jotai";

export const activeTabState = atomWithStorage<number>("activeTab", 0);

export const useActiveTab = () => useAtomValue(activeTabState);

export const useSetActiveTab = () => useSetAtom(activeTabState);

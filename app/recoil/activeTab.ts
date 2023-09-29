import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const activeTabState = atom<number>({
  key: "activeTab",
  default: 0,
});

export const useActiveTab = () => useRecoilValue(activeTabState);

export const useSetActiveTab = () => useSetRecoilState(activeTabState);

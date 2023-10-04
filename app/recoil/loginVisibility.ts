import { atom } from "recoil";

export const loginVisibilityState = atom<boolean>({
  key: "loginVisibility",
  default: false,
});

import { atomWithStorage } from "jotai/utils";

export const loginVisibilityState = atomWithStorage<boolean>(
  "loginVisibility",
  false,
);

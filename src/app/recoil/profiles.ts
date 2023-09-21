import React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useActiveAccountAddress } from "./accounts";
import { DesmosProfile } from "@/types/desmos";
import { recoilPersist } from "recoil-persist";

/**
 * Atom that holds the data of all the cached profiles.
 */

const { persistAtom } = recoilPersist();

const profilesState = atom<Record<string, DesmosProfile>>({
  key: "profilesState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

/**
 * Hook that allows to get the profile for the given user.
 */
export const useGetStoredProfile = () => {
  const profiles = useRecoilValue(profilesState);
  return React.useCallback((user: string) => profiles[user], [profiles]);
};

/**
 * Hook that allows to get the profiles stored on the device.
 */
export const useStoredProfiles = () => useRecoilValue(profilesState);

/**
 * Hook that allows to easily store a new profile inside the profilesState Atom.
 */
/**
 * Hook that allows to store a new account inside the app state.
 */
export const useStoreProfile = () => {
  const setAccounts = useSetRecoilState(profilesState);
  return React.useCallback(
    (profile: DesmosProfile) => {
      setAccounts((curValue) => {
        const newValue: Record<string, DesmosProfile> = {
          ...curValue,
        };
        newValue[profile.address] = profile;
        return newValue;
      });
    },
    [setAccounts],
  );
};

/**
 * Hook that allows to easily delete a cached profile.
 */
export const useDeleteCachedProfile = () => {
  const setProfiles = useSetRecoilState(profilesState);
  return React.useCallback(
    (address: string) => {
      setProfiles((storedProfiles) => {
        const newValue = {
          ...storedProfiles,
        };
        delete newValue[address];
        return newValue;
      });
    },
    [setProfiles],
  );
};

/**
 * Hook that allows to easily delete every cached profile.
 */
export const useDeleteCachedProfiles = () => {
  const setProfiles = useSetRecoilState(profilesState);
  return React.useCallback(() => setProfiles({}), [setProfiles]);
};

/**
 * Atom that holds the address of the currently active wallet.
 * This should be used as the unique reference across the entire application to determine
 * whether the user is logged in or not.
 */
export const activeProfileState = atom<DesmosProfile | undefined>({
  key: "activeProfileState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const useSetActiveProfile = () => useSetRecoilState(activeProfileState);

/**
 * Hook that allows to get the currently active account of the user.
 */
export const useActiveProfile = (): DesmosProfile | undefined => {
  const activeAddress = useActiveAccountAddress();
  const profiles = useRecoilValue(profilesState);
  return React.useMemo(() => {
    if (!activeAddress) {
      return undefined;
    }
    return profiles[activeAddress];
  }, [activeAddress, profiles]);
};

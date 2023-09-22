import React, { useCallback } from "react";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { Account } from "../types/account";
import { recoilPersist } from "recoil-persist";

// -------------------------------------------------------------------------------------------------------------------
// --- STORED ACCOUNTS
// -------------------------------------------------------------------------------------------------------------------

const { persistAtom } = recoilPersist();

/**
 * An atom that holds all the accounts stored in the application.
 */
export const accountsAppState = atom<Record<string, Account>>({
  key: "accounts",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

/**
 * Hook that allows to store a new account inside the app state.
 */
export const useStoreAccount = () => {
  const setAccounts = useSetRecoilState(accountsAppState);
  return React.useCallback(
    (account: Account) => {
      setAccounts((curValue) => {
        const newValue: Record<string, Account> = {
          ...curValue,
        };
        newValue[account.address] = account;
        return newValue;
      });
    },
    [setAccounts],
  );
};

/**
 * Hook that allows to get the accounts stored on the device.
 */
export const useStoredAccounts = () => useRecoilValue(accountsAppState);

/**
 * Hook that allows to easily delete the account of a user having a given address.
 */
export const useDeleteCachedAccount = () => {
  const setAccounts = useSetRecoilState(accountsAppState);
  return useCallback(
    (address: string) => {
      setAccounts((storedAccounts) => {
        const newValue: Record<string, Account> = {
          ...storedAccounts,
        };
        delete newValue[address];
        return newValue;
      });
    },
    [setAccounts],
  );
};

/**
 * Hook that allows to easily delete every account.
 */
export const useDeleteCachedAccounts = () => {
  const setAccounts = useSetRecoilState(accountsAppState);
  return useCallback(() => {
    setAccounts({});
  }, [setAccounts]);
};

// -------------------------------------------------------------------------------------------------------------------
// --- ACCOUNTS EXISTENCE CHECK
// -------------------------------------------------------------------------------------------------------------------

/**
 * Recoil select that allows to easily know if there is at least one account stored in the device or not.
 */
const hasAccountAppState = selector({
  key: "hasAccount",
  get: ({ get }) => {
    const accounts = get(accountsAppState);
    return Object.keys(accounts).length > 0;
  },
});

/**
 * Hook that allows to easily know if there is at least one account stored inside the device or not.
 */
export const useHasAccount = () => useRecoilValue(hasAccountAppState);

// -------------------------------------------------------------------------------------------------------------------
// --- ACCOUNTS ADDRESSES
// -------------------------------------------------------------------------------------------------------------------

/**
 * An atom that holds all the accounts addresses.
 */
const accountsAddressesAppState = selector<string[]>({
  key: "accountsAddressesAppState",
  get: ({ get }) => {
    const accounts = get(accountsAppState);
    return Object.values(accounts).map((account) => account.address);
  },
});

/**
 * Hook that allows to get the currently stored accounts HD paths.
 */
export const useStoredAccountsAddresses = () =>
  useRecoilValue(accountsAddressesAppState);

// -------------------------------------------------------------------------------------------------------------------
// --- ACTIVE ACCOUNT
// -------------------------------------------------------------------------------------------------------------------

/**
 * Atom that holds the address of the currently active wallet.
 * This should be used as the unique reference across the entire application to determine
 * whether the user is logged in or not.
 */
export const activeAccountAddressState = atom<string | undefined>({
  key: "activeAccountAddressState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const useActiveAccountAddress = () =>
  useRecoilValue(activeAccountAddressState);

export const useSetActiveAccountAddress = () =>
  useSetRecoilState(activeAccountAddressState);

/**
 * Hook that allows to get the currently active account of the user.
 */
export const useActiveAccount = (): Account | undefined => {
  const activeAddress = useActiveAccountAddress();
  const accounts = useRecoilValue(accountsAppState);
  return React.useMemo(() => {
    if (!activeAddress) {
      return undefined;
    }
    return accounts[activeAddress];
  }, [activeAddress, accounts]);
};

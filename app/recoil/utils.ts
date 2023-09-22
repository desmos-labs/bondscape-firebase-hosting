export enum LocalStorageKeys {
  ACCOUNT = "account",
  ACTIVE_ACCOUNT = "activeAccount",
  PROFILE = "profile",
  ACTIVE_PROFILE = "activeProfile",
}

const store = typeof window !== "undefined" ? window.localStorage : null;

/*export const localStorageEffect =
  (key: string) =>
  // @ts-ignore
  ({ setSelf, onSet }) => {
    if (store) {
      const savedValue = store.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue: any, _: any, isReset: any) => {
        isReset
          ? store.removeItem(key)
          : store.setItem(key, JSON.stringify(newValue));
      });
    }
  };*/

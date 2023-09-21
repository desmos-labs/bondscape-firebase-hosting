import { Algo } from "@cosmjs/amino";
import { Wallet, WalletType } from "@/types/wallet";

export enum AccountSerializationVersion {
  Web3Auth = 1,
  PrivateKey = 1,
}

/**
 * Interface representing a base user account.
 */
export interface BaseAccount {
  /**
   * Type of the wallet associated with this account.
   */
  readonly walletType: WalletType;
  /**
   * Account bech32 address.
   */
  readonly address: string;
  /**
   * Account public key.
   */
  readonly pubKey: Uint8Array;
  /**
   * Account public key type.
   */
  readonly algo: Algo;
  /**
   * Date of account creation.
   */
  readonly creationDate: Date;
}

/**
 * Interface representing an account imported through Web3Auth.
 */
export interface Web3AuthAccount extends BaseAccount {
  readonly walletType: WalletType.Web3Auth;
  /**
   * Login provider used to obtain the user's private key.
   */
  readonly loginProvider: string;
}

/**
 * Interface representing a [Web3AuthAccount] that can be serialized into JSON
 * and stored in the device's storage.
 */
export type SerializableWeb3AuthAccount = Omit<
  Web3AuthAccount,
  "pubKey" | "hdPath"
> & {
  readonly version: AccountSerializationVersion.Web3Auth;
  /**
   * hex encoded public key.
   */
  readonly pubKey: string;
};

/**
 * Interface representing an account imported with a private key.
 */
export interface PrivateKeyAccount extends BaseAccount {
  readonly walletType: WalletType.PrivateKey;
}

/**
 * Interface representing a [PrivateKeyAccount] that can be serialized into JSON
 * and stored in the device's storage.
 */
export type SerializablePrivateKeyAccount = PrivateKeyAccount & {
  readonly version: AccountSerializationVersion.PrivateKey;
};

/**
 * Type union that represents the accounts supported from
 * the application.
 */
export type Account = Web3AuthAccount | PrivateKeyAccount;

/**
 * Type that represents an account with its associated wallet.
 */
export interface AccountWithWallet {
  readonly account: Account;
  readonly wallet: Wallet;
}

/**
 * Type union that represents the accounts that can be serialized into JSON
 * and stored in the device's storage.
 */
export type SerializableAccount =
  | SerializableWeb3AuthAccount
  | SerializablePrivateKeyAccount;

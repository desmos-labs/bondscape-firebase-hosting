import { DesmosProfile } from "@/types/desmos";
import { Account } from "@/types/account";

export type User = {
  profile: DesmosProfile | undefined;
  account: Account | undefined;
  isLoggedIn: boolean;
  bearer: string;
};

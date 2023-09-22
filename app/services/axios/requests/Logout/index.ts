import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

export interface LogoutParams {
  /**
   * The all query parameter represents whether the user wants to log out from all sessions or just the current one.
   */
  readonly all?: boolean;
}

/**
 * Logout from the current session.
 */
const Logout = ({ all }: LogoutParams): ResultAsync<string, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.post(`/logout?all=${all}`),
    (e: any) => e ?? Error("Error performing logout"),
  ).map((response) => response.data);
};

export default Logout;

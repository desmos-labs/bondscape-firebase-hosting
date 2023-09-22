import useSWR from "swr";
import { User } from "@/types/user";
import { ResultAsync } from "neverthrow";

/**
 * Hook that allows to perform the logout.
 */
export default function useLogout() {
  const { mutate: mutateUser } = useSWR<User>("/api/user");

  return async () => {
    return ResultAsync.fromPromise(
      mutateUser(
        await fetch("/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      ),
      (e: any) => Error("Error storing the user", e),
    ).map((response) => response);
  };
}

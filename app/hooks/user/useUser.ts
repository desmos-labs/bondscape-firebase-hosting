import useSWR from "swr";
import { User } from "@/types/user";
import { ResultAsync } from "neverthrow";

/**
 * Hook that allows to get the user data and to mutate it.
 * Behind the scenes, it uses SWR to fetch the data.
 */
export default function useUser() {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user");

  const saveUser = async (user: User) => {
    return ResultAsync.fromPromise(
      mutateUser(
        await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...user,
          }),
        }),
      ),
      (e: any) => Error("Error storing the user", e),
    ).map((response) => response);
  };

  return { user, saveUser };
}

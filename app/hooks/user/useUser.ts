import useSWR from "swr";
import { User } from "@/types/user";
import fetchJson from "@/lib/fetchJson";
import { ResultAsync } from "neverthrow";

export default function useUser() {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user");

  const saveUser = async (user: User) => {
    return ResultAsync.fromPromise(
      mutateUser(
        await fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...user,
          }),
        }),
      ),
      (e) => Error("Error storing the user"),
    ).map((response) => response);
  };

  return { user, saveUser };
}

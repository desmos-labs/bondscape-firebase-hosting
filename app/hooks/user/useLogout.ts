import useSWR from "swr";
import { User } from "@/types/user";
import fetchJson from "@/lib/fetchJson";
import { ResultAsync } from "neverthrow";

export default function useLogout() {
  const { mutate: mutateUser } = useSWR<User>("/api/user");

  return async () => {
    return ResultAsync.fromPromise(
      mutateUser(
        await fetchJson("/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      ),
      (e) => Error("Error storing the user"),
    ).map((response) => response);
  };
}

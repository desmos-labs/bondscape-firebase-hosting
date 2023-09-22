import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

/**
 * Get a nonce, a uuid used to identify a login request
 */
const GetNonce = (address: string): ResultAsync<string, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.get(`/nonce/${address}`),
    (e: any) => e ?? Error("Error getting the nonce"),
  ).map((response) => response.data.nonce);
};

export default GetNonce;

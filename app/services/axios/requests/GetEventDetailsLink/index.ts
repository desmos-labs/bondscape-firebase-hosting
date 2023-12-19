import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

const GetEventDetailsLink = (eventId: string): ResultAsync<string, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.get(`/events/${eventId}/links/details`),
    (e: any) => e ?? Error("Error getting the link"),
  ).map((response) => response.data);
};

export default GetEventDetailsLink;

import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

export interface DeleteEventParams {
  readonly eventId: string;
}

/**
 * Delete an event.
 */
const DeleteEvent = ({
  eventId,
}: DeleteEventParams): ResultAsync<string, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.delete(`/events/${eventId}`),
    (e: any) => e ?? Error("Error deleting an event"),
  ).map((response) => response.data);
};

export default DeleteEvent;

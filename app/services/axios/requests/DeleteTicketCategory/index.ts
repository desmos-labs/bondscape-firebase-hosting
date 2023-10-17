import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

interface DeleteTicketParams {
  eventId: string;
  categoryId: string;
}

/**
 * Delete a ticket category.
 */
const DeleteTicketCategory = ({
  eventId,
  categoryId,
}: DeleteTicketParams): ResultAsync<string, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.delete(`/events/${eventId}/tickets/categories/${categoryId}`),
    (e: any) => e ?? Error("Error deleting category"),
  ).map((response) => response.data);
};

export default DeleteTicketCategory;

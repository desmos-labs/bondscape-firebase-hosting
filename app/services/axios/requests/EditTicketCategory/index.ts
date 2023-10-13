import { TicketCategoryRequestParams } from "@/types/event";
import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

const EditTicketCategory = (
  eventId: string,
  categoryId: string,
  ticketCategoryValues: TicketCategoryRequestParams,
): ResultAsync<any, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.put(
      `/events/${eventId}/tickets/categories/${categoryId}`,
      ticketCategoryValues,
    ),
    (e: any) => e ?? Error("Error editing ticket category"),
  ).map((response) => {
    return {
      data: response.data,
      type: "edit",
    };
  });
};

export default EditTicketCategory;

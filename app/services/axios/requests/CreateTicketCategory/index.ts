import { TicketCategoryRequestParams } from "@/types/event";
import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

const CreateTicketCategory = (
  eventId: string,
  ticketCategoryValues: TicketCategoryRequestParams,
): ResultAsync<any, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.post(
      `/events/${eventId}/tickets/categories`,
      ticketCategoryValues,
    ),
    (e: any) => e ?? Error("Error creating ticket category"),
  ).map((response) => {
    return {
      data: response.data,
      type: "create",
    };
  });
};

export default CreateTicketCategory;

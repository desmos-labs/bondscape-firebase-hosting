import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";
import { EventRequestParams } from "@/types/event";

const EditEvent = ({
  eventId,
  status,
  coverPicUrl,
  eventName,
  eventDetails,
  startDate,
  endDate,
  organizersAddresses,
  categoriesIds,
  placeId,
  tags,
  website,
}: EventRequestParams & {
  eventId: string;
}): ResultAsync<any, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.put(`/events/${eventId}`, {
      status,
      name: eventName,
      description: eventDetails,
      cover_picture_url: coverPicUrl,
      start_date: startDate,
      end_date: endDate,
      website: website,
      google_place_id: placeId,
      organizers_addresses: organizersAddresses,
      categories_ids: categoriesIds,
      tags: tags,
    }),
    (e: any) => e ?? Error("Error saving the file"),
  ).map((response) => {
    return {
      data: response.data,
      type: "edit",
    };
  });
};

export default EditEvent;

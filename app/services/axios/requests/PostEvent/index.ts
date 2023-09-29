import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

export interface CreateEventParams {
  status: string;
  eventName: string;
  eventDetails: string;
  coverPicUrl?: string;
  startDate?: string;
  endDate?: string;
  categoriesIds?: number[];
  website?: string;
  placeId?: string;
  organizersAddresses: string[];
  tags?: string[];
}

const PostImage = ({
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
}: CreateEventParams): ResultAsync<any, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.post("/events", {
      status,
      name: eventName,
      description: eventDetails,
      cover_picture_url: coverPicUrl,
      start_date: startDate,
      end_date: endDate,
      website: website,
      google_place_id: placeId,
      organizers_addresses: organizersAddresses,
      categories: categoriesIds,
      tags: tags,
    }),
    (e: any) => e ?? Error("Error saving the file"),
  ).map((response) => response.data);
};

export default PostImage;

import { ResultAsync } from "neverthrow";
import axios from "axios";

interface GooglePlaceDetailsResponse {
  result: {
    formatted_address?: string;
    address_components?: any;
    url?: string;
    name?: string;
  };
}

/**
 * Get Google place's details by a given place ID.
 * @param placeId The place ID to get the details of.
 * @returns The place's details.
 */
const GetPlaceDetailsByPlaceId = (
  placeId: string,
): ResultAsync<GooglePlaceDetailsResponse, Error> => {
  return ResultAsync.fromPromise(
    axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address%2Caddress_components%2Cname%2Curl&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
      },
    ),
    (e: any) => e ?? Error("Error retrieving place details"),
  ).map((response) => response.data);
};

export default GetPlaceDetailsByPlaceId;

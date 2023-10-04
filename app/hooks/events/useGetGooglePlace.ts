import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export interface GooglePlace {
  formattedAddress: string;
  name?: string;
  country?: string;
  url: string | undefined;
}

const useGetGooglePlace = (placeId?: string) => {
  const [googlePlace, setGooglePlace] = useState<GooglePlace | undefined>({
    formattedAddress: "",
    url: undefined,
  });

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
    version: "weekly",
  });

  /**
   * Get the google place details by place id
   */
  useEffect(() => {
    if (!placeId) {
      setGooglePlace(undefined);
      return;
    }
    loader.importLibrary("places").then(() => {
      const service = new google.maps.places.PlacesService(
        document.createElement("div"),
      );
      service.getDetails(
        {
          placeId: placeId,
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setGooglePlace({
              formattedAddress: place?.formatted_address ?? "Unavailable",
              url: place?.url ?? undefined,
              name: place?.name ?? "Unavailable",
              country:
                place?.address_components?.find((component: any) =>
                  component.types.includes("country"),
                )?.long_name ?? "Unavailable",
            });
          }
        },
      );
    });
  }, [loader, placeId]);

  return {
    googlePlace,
  };
};

export default useGetGooglePlace;

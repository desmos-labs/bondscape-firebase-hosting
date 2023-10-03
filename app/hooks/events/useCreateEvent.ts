import { useCallback } from "react";
import PostImage from "@/services/axios/requests/PostImage";
import { toast } from "react-toastify";
import CreateEvent from "../../services/axios/requests/CreateEvent";
import useUser from "@/hooks/user/useUser";
import { useRouter } from "next/navigation";
import { CreateEventValues } from "@/types/event";
import EditEvent from "@/services/axios/requests/EditEvent";

export const useCreateEvent = () => {
  const { user } = useUser();
  const router = useRouter();

  /**
   * Uploads the cover picture and creates the event
   * @param values The values of the event
   * @param eventId The id of the event to edit
   */
  const uploadPictureAndCreateEvent = useCallback(
    async (values: CreateEventValues, eventId?: string) => {
      // If the user is not logged in, we can't create an event
      if (!user || !user.profile) return;
      // Get the addresses of the organizers
      const organizersAddresses = values.organizers.map(
        (organizer) => organizer.organizerAddress,
      );
      // Add the user's address to the list of organizers
      organizersAddresses.unshift(user.profile.address);
      // Load the cover picture if it exists
      let coverPicUrl = values.coverPicUrl;
      if (values.coverPic) {
        const result = await PostImage({
          file: values.coverPic,
        });
        if (result.isOk()) {
          coverPicUrl = result.value.url;
        } else {
          toast.error(result.error.message);
          return;
        }
      }

      let eventCreationResult;

      if (eventId) {
        eventCreationResult = await EditEvent({
          eventId,
          status: values.status,
          coverPicUrl,
          eventName: values.eventName,
          eventDetails: values.eventDetails,
          organizersAddresses: organizersAddresses,
          startDate: values.startDate,
          endDate: values.endDate,
          categoriesIds: values.categories?.map((category) => category.id),
          website: values.website,
          placeId: values.placeId,
          tags: values.tags,
        });
      } else {
        eventCreationResult = await CreateEvent({
          status: values.status,
          coverPicUrl,
          eventName: values.eventName,
          eventDetails: values.eventDetails,
          organizersAddresses: organizersAddresses,
          startDate: values.startDate,
          endDate: values.endDate,
          categoriesIds: values.categories?.map((category) => category.id),
          website: values.website,
          placeId: values.placeId,
          tags: values.tags,
        });
      }

      // Check the result: if it's ok, redirect to the events page and show a success toast, otherwise show an error toast
      if (eventCreationResult.isOk()) {
        toast.success(
          eventCreationResult.value.type === "create"
            ? "Event created successfully"
            : "Event updated successfully",
        );
        router.replace(`/creator/events`);
      } else {
        toast.error(eventCreationResult.error.message);
      }
    },
    [router, user],
  );

  return {
    uploadPictureAndCreateEvent,
  };
};

export default useCreateEvent;

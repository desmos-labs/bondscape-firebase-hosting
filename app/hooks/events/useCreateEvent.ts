import { useCallback } from "react";
import PostImage from "@/services/axios/requests/PostImage";
import { toast } from "react-toastify";
import CreateEvent from "../../services/axios/requests/CreateEvent";
import useUser from "@/hooks/user/useUser";
import { useRouter } from "next/navigation";
import { CreateEventValues } from "@/types/event";

export const useCreateEvent = () => {
  const { user } = useUser();
  const router = useRouter();

  const uploadPictureAndCreateEvent = useCallback(
    async (values: CreateEventValues) => {
      // If the user is not logged in, we can't create an event
      if (!user || !user.profile) return;
      // The user is logged in, so we can create the event and add him as creator
      values.organizers.push(user.profile.address);
      // Load the cover picture if it exists
      let coverPicUrl = undefined;
      if (values.coverPic.preview !== "") {
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
      // Create the event
      const eventCreationResult = await CreateEvent({
        status: values.status,
        coverPicUrl,
        eventName: values.eventName,
        eventDetails: values.eventDetails,
        organizersAddresses: values.organizers,
        startDate: values.startDate,
        endDate: values.endDate,
        categoriesIds: values.categoriesIds,
        website: values.website,
        placeId: values.placeId,
        tags: values.tags,
      });

      // Check the result: if it's ok, redirect to the events page and show a success toast, otherwise show an error toast
      if (eventCreationResult.isOk()) {
        toast.success("Event created successfully");
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

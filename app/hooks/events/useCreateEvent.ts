import useUser from "@/hooks/user/useUser";
import CreateTicketCategory from "@/services/axios/requests/CreateTicketCategory";
import DeleteTicketCategory from "@/services/axios/requests/DeleteTicketCategory";
import EditEvent from "@/services/axios/requests/EditEvent";
import EditTicketCategory from "@/services/axios/requests/EditTicketCategory";
import PostImage from "@/services/axios/requests/PostImage";
import {
  CreateEventValues,
  TicketCategoryRequestParams,
  TicketCategoryValues,
} from "@/types/event";
import { err } from "neverthrow";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import CreateEvent from "../../services/axios/requests/CreateEvent";

export const useCreateEvent = () => {
  const [ticketCategoriesToDelete, setTicketCategoriesToDelete] = useState<
    string[]
  >([]);
  const { user } = useUser();
  const router = useRouter();

  const createTicketCategory = useCallback(
    async (
      eventId: string,
      values: TicketCategoryValues,
      categoryId?: string,
    ) => {
      // If the user is not logged in, we can't create an event
      if (!user || !user.profile) return;
      // Get the addresses of the organizers
      const validatorsAddresses = values.validators.map(
        (validator) => validator.validatorAddress,
      );
      // Add the user's address to the list of organizers
      if (
        validatorsAddresses.find(
          (address) => address === user.profile?.address,
        ) === undefined
      ) {
        validatorsAddresses.unshift(user.profile.address);
      }
      // Load the cover picture if it exists
      let ticketCoverPicUrl = values.coverPicUrl;
      if (values.coverPic) {
        const result = await PostImage({
          file: values.coverPic,
        });
        if (result.isOk()) {
          ticketCoverPicUrl = result.value.url;
        } else {
          toast.error(result.error.message);
          return;
        }
      }

      const ticketCreationParams: TicketCategoryRequestParams = {
        name: values.category,
        description: values.description,
        tickets_image_url: ticketCoverPicUrl,
        start_date: values.availableFrom,
        end_date: values.availableTill,
        tickets_per_user: values.maxQuantityPerPerson,
        total_tickets_available: values.maxQuantityPerCategory,
        validators_addresses: validatorsAddresses,
      };
      if (categoryId) {
        const result = await EditTicketCategory(
          eventId,
          categoryId,
          ticketCreationParams,
        );
        if (result.isOk()) {
          console.log("Ticket category edited successfully", result.value);
        } else {
          return err(result.error);
        }
      } else {
        const result = await CreateTicketCategory(
          eventId,
          ticketCreationParams,
        );
        if (result.isOk()) {
          console.log("Ticket category created successfully", result.value);
        } else {
          return err(result.error);
        }
      }
    },
    [user],
  );

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
      if (
        organizersAddresses.find(
          (address) => address === user.profile?.address,
        ) === undefined
      ) {
        organizersAddresses.unshift(user.profile.address);
      }
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

      let eventCreationResult: any;

      const eventParams = {
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
      };

      if (eventId) {
        eventCreationResult = await EditEvent({
          eventId,
          ...eventParams,
        });
      } else {
        eventCreationResult = await CreateEvent({
          ...eventParams,
        });
      }

      // Check the result: if it's ok, create ticket categories and then redirect to the events page and show a success toast, otherwise show an error toast
      if (eventCreationResult.isOk() || eventId) {
        console.log(ticketCategoriesToDelete.length);
        if (ticketCategoriesToDelete.length > 0) {
          console.log(ticketCategoriesToDelete.length);
          await Promise.all(
            ticketCategoriesToDelete.map(async (ticketCategoryId) => {
              console.log(ticketCategoryId);
              const result = await DeleteTicketCategory({
                eventId: eventCreationResult.value.data.event_id ?? eventId,
                categoryId: ticketCategoryId,
              });
              if (result.isOk()) {
                console.log(
                  "Ticket category deleted successfully",
                  result.value,
                );
              } else {
                return err(result.error);
              }
            }),
          );
        }
        if (values.ticketsCategories) {
          try {
            await Promise.all(
              values.ticketsCategories.map((ticketCategory) => {
                return createTicketCategory(
                  eventCreationResult.value.data.event_id ?? eventId,
                  ticketCategory,
                  ticketCategory.id,
                );
              }),
            );
          } catch (e) {
            console.error(e);
            return;
          }
        }

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
    [createTicketCategory, router, ticketCategoriesToDelete, user],
  );

  return {
    uploadPictureAndCreateEvent,
    setTicketCategoriesToDelete,
  };
};

export default useCreateEvent;

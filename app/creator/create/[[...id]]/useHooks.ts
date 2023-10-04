import { useCallback, useEffect, useMemo, useState } from "react";
import { FormikProps } from "formik";
import { CreateEventValues } from "@/types/event";
import * as Yup from "yup";
import { useGetEvent } from "@/jotai/liveEvents";

const useHooks = (eventId?: string) => {
  const [initialValues, setInitialValues] = useState<CreateEventValues>({
    status: "draft",
    eventName: "",
    eventDetails: "",
    organizers: [],
    website: "",
    tags: [],
    categories: [],
    coverPicUrl: "",
    coverPic: undefined,
    startDate: undefined,
    endDate: undefined,
    placeId: undefined,
  });
  const getEvent = useGetEvent();

  // Memoized values
  const title = useMemo(() => {
    if (eventId) return "Edit Event";
    return "Create Event";
  }, [eventId]);

  const draftButtonText = useMemo(() => {
    if (eventId) return "Edit Draft";
    return "Save as Draft";
  }, [eventId]);

  const publishButtonText = useMemo(() => {
    if (eventId) return "Edit and Publish";
    return "Publish";
  }, [eventId]);

  // Callbacks
  /**
   * Set initial values from recoil state
   */
  const setInitialValuesFromQuery = useCallback(async () => {
    if (!eventId) return;
    const event = getEvent(eventId);
    if (!event) return;

    setInitialValues((prev) => {
      return {
        ...prev,
        eventName: event.name,
        eventDetails: event.description,
        coverPicUrl: event.coverPic,
        startDate: event.startDate,
        endDate: event.endDate,
        categories: event.categories.map((category) => category.category),
        placeId: event.googlePlaceId,
        organizers: event.organizers,
        tags: event.tags,
        website: event.website,
      };
    });
  }, [eventId, getEvent]);

  const handleButtonClick = async (
    formikProps: FormikProps<CreateEventValues>,
  ) => {
    const { submitForm } = formikProps;
    await submitForm();
  };

  // Effects
  useEffect(() => {
    setInitialValuesFromQuery();
  }, [setInitialValuesFromQuery]);

  // Form validation
  const validateSchema = Yup.object().shape({
    eventName: Yup.string().required("The event name is required."),
    eventDetails: Yup.string().required("Event's details are required."),
  });

  return {
    draftButtonText,
    publishButtonText,
    title,
    initialValues,
    validateSchema,
    handleButtonClick,
  };
};

export default useHooks;

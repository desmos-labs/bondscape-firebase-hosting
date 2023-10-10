import { Formik } from "formik";
import React from "react";
import useHooks from "@/creator/create/[[...id]]/useHooks";
import useUser from "@/hooks/user/useUser";
import useCreateEvent from "@/hooks/events/useCreateEvent";
import { Button } from "primereact/button";

interface MainSectionProps {
  eventId?: string;
  setActiveSection: (section: number) => void;
}

const TicketSection = ({ eventId, setActiveSection }: MainSectionProps) => {
  const {
    title,
    draftButtonText,
    publishButtonText,
    initialValues,
    validateSchema,
    handleButtonClick,
  } = useHooks(eventId);

  const { user } = useUser();
  const { uploadPictureAndCreateEvent } = useCreateEvent();

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validateSchema}
      validateOnChange={true}
      validateOnMount={false}
      initialValues={initialValues}
      onSubmit={(values) => uploadPictureAndCreateEvent(values, eventId)}
    >
      {(formikProps) => {
        const { values, setFieldValue, isSubmitting } = formikProps;
        const requiredDraftValuesSet =
          values.eventName !== "" && values.eventDetails !== "";
        const requiredSubmitValuesSet =
          requiredDraftValuesSet && values.startDate && values.endDate;
        return (
          <div className="lg:pb-12 xl:pb-24 max-w-[70rem] xl:max-w-[90rem] mx-auto">
            Test section
            <Button onClick={() => setActiveSection(0)}>Back</Button>
          </div>
        );
      }}
    </Formik>
  );
};

export default TicketSection;

"use client";
import MainLayout from "../../../layouts/MainLayout";
import React from "react";
import bgOverlay from "../../../../public/eventsBgOverlay.png";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import CoverPicDropZone from "@/creator/create/CoverPicDropZone";
import BigTextInput from "@/creator/create/BigTextInput";
import { ErrorMessage, Form, Formik } from "formik";
import BondscapeDateTimePicker from "@/creator/create/BondscapeDateTimePicker/BondscapeDateTimePicker";
import BondscapeSelectCategory from "@/creator/create/BondscapeSelectCategory";
import SmallTextInput from "@/creator/create/SmallTextInput";
import LocationInput from "@/creator/create/LocationInput";
import BondscapeSelectCoHosts from "@/creator/create/BondscapeSelectCoHosts";
import BondscapeSelectTags from "@/creator/create/BondscapeSelectTags";
import BondscapeButton from "@/components/BondscapeButton";
import useCreateEvent from "@/hooks/events/useCreateEvent";
import useUser from "@/hooks/user/useUser";
import useHooks from "@/creator/create/[[...id]]/useHooks";

/**
 * Page for creating an event
 * @param params - The event id if the event is being edited
 */
interface PageProps {
  params: {
    id?: string[];
  };
}

export default function CreateEvent({ params }: PageProps) {
  const eventId = params && params.id ? params.id[0] : undefined;

  // Hooks
  const {
    title,
    draftButtonText,
    publishButtonText,
    initialValues,
    validateSchema,
    handleButtonClick,
  } = useHooks(eventId);
  const [isMobile, isMd] = useBreakpoints();
  const { user } = useUser();
  const { uploadPictureAndCreateEvent } = useCreateEvent();

  if (isMobile || isMd) {
    return (
      <div className="flex flex-1 h-screen justify-center items-center px-xMobile">
        <div className="text-white">
          This page is not supported on mobile devices. Please use a desktop
        </div>
      </div>
    );
  }

  return (
    <MainLayout
      customClasses={"bg-[#020014]"}
      backgroundOverlay={bgOverlay}
      forceNavbarBgVisible={true}
      statusBarMode={"goBack"}
    >
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
              <div className="relative flex flex-col">
                <div className="flex flex-1 flex-col bg-bondscape-surface rounded-[24px] p-[40px]">
                  <div className="text-bondscape-text_neutral_900 text-[30px] font-semibold leading-10 tracking-normal pb-[1.5rem]">
                    {title}
                  </div>
                  <Form className="flex flex-col">
                    <div className="flex flex-1 flex-row gap-[2rem]">
                      <div className="flex flex-col w-[31.75rem] xl:w-[41.5rem] gap-[1rem]">
                        <CoverPicDropZone
                          fileToUpload={values.coverPic}
                          coverPicUrl={values.coverPicUrl}
                          setCoverPic={(coverPic) =>
                            setFieldValue("coverPic", coverPic)
                          }
                        />
                        <ErrorMessage name={"eventName"}>
                          {(msg) => (
                            <div className="text-feedback-error text-[14px] font-normal">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <BigTextInput
                          title={"Event Name"}
                          inputName={"eventName"}
                          placeholder={
                            "Write a short event summary to get attendees excited."
                          }
                          inputClassName="text-[24px] font-semibold"
                          required={true}
                          rows={1}
                        />
                        <ErrorMessage name={"eventDetails"}>
                          {(msg) => (
                            <div className="text-feedback-error text-[14px] font-normal">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <BigTextInput
                          title={"Event Details"}
                          inputName={"eventDetails"}
                          placeholder={
                            "Provide all the informations needed for your events."
                          }
                          required={true}
                          rows={5}
                        />
                      </div>
                      <div className="flex flex-col w-[31.75rem] xl:w-[41.5rem] gap-[1rem]">
                        {(!values.startDate || !values.endDate) && (
                          <div className="text-feedback-warning text-[12px] font-normal">
                            {
                              "The event can only be published if the dates are entered; otherwise, it can only be saved as a draft."
                            }
                          </div>
                        )}
                        <BondscapeDateTimePicker
                          initialStartValue={values.startDate}
                          initialEndValue={values.endDate}
                          required={false}
                          onChangeStart={(value) =>
                            setFieldValue("startDate", value)
                          }
                          onChangeEnd={(value) =>
                            setFieldValue("endDate", value)
                          }
                        />
                        <BondscapeSelectCategory
                          initialCategories={values.categories}
                          required={false}
                          onChange={(value) =>
                            setFieldValue("categories", value)
                          }
                        />
                        <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] gap-[0.75rem] py-[16px]">
                          <SmallTextInput
                            inputName={"website"}
                            title={"Website"}
                            placeholder={"Add an external link"}
                            required={false}
                          />
                          <LocationInput
                            defaultValue={values.placeId}
                            title={"Location"}
                            required={false}
                            onChange={(placeId) =>
                              setFieldValue("placeId", placeId)
                            }
                          />
                          <BondscapeSelectCoHosts
                            initialCoHosts={values.organizers.filter(
                              (organizer) =>
                                organizer.organizerAddress !==
                                user?.profile?.address,
                            )}
                            required={false}
                            onChange={(organizers) =>
                              setFieldValue("organizers", organizers)
                            }
                          />
                          <BondscapeSelectTags
                            initialTags={values.tags}
                            required={false}
                            onChange={(tags) => setFieldValue("tags", tags)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 justify-center gap-[40px] mt-20">
                      <BondscapeButton
                        className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
                        textClassName="text-base font-semibold"
                        text={draftButtonText}
                        disabled={isSubmitting || !requiredDraftValuesSet}
                        loading={isSubmitting && values.status === "draft"}
                        onClick={() => {
                          setFieldValue("status", "draft").then(() =>
                            handleButtonClick(formikProps),
                          );
                        }}
                      />
                      <BondscapeButton
                        className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
                        textClassName="text-base font-semibold"
                        text={publishButtonText}
                        disabled={isSubmitting || !requiredSubmitValuesSet}
                        loading={isSubmitting && values.status === "published"}
                        onClick={() => {
                          setFieldValue("status", "published").then(() =>
                            handleButtonClick(formikProps),
                          );
                        }}
                      />
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </MainLayout>
  );
}

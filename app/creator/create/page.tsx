"use client";
import MainLayout from "../../layouts/MainLayout";
import React from "react";
import bgOverlay from "../../../public/eventsBgOverlay.png";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import CreateEventHeader from "@/components/CreateEventHeader";
import { useRouter } from "next/navigation";
import CoverPicDropZone from "@/creator/create/CoverPicDropZone";
import BigTextInput from "@/creator/create/BigTextInput";
import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import BondscapeDateTimePicker from "@/creator/create/BondscapeDateTimePicker/BondscapeDateTimePicker";
import BondscapeSelectCategory from "@/creator/create/BondscapeSelectCategory";
import SmallTextInput from "@/creator/create/SmallTextInput";
import LocationInput from "@/creator/create/LocationInput";
import BondscapeSelectCoHosts from "@/creator/create/BondscapeSelectCoHosts";
import BondscapeSelectTags from "@/creator/create/BondscapeSelectTags";
import * as Yup from "yup";
import BondscapeButton from "@/components/BondscapeButton";
import { CreateEventValues } from "@/types/event";
import useCreateEvent from "@/hooks/events/useCreateEvent";
import { BondscapePreviewImage } from "@/types/image";

export default function CreateEvent() {
  const [isMobile, isMd] = useBreakpoints();
  const router = useRouter();
  const { createEvent } = useCreateEvent();

  const handleButtonClick = async (
    formikProps: FormikProps<CreateEventValues>,
  ) => {
    const { submitForm } = formikProps;
    await submitForm();
  };

  const initialValues: CreateEventValues = {
    status: "draft",
    coverPic: {
      preview: "",
    } as BondscapePreviewImage,
    eventName: "",
    eventDetails: "",
    organizers: [],
  };

  const validateSchema = Yup.object().shape({
    eventName: Yup.string().required("The event name is required."),
    eventDetails: Yup.string().required("Event's details are required."),
  });

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
    >
      <Formik
        validationSchema={validateSchema}
        validateOnChange={true}
        validateOnMount={false}
        initialValues={initialValues}
        onSubmit={(values) => createEvent(values)}
      >
        {(formikProps) => {
          const { values, setFieldValue, isSubmitting } = formikProps;
          const requiredDraftValuesSet =
            values.eventName !== "" && values.eventDetails !== "";
          const requiredSubmitValuesSet =
            requiredDraftValuesSet && values.startDate && values.endDate;
          return (
            <div className="lg:pb-12 xl:pb-24 max-w-[70rem] xl:max-w-[90rem] mx-auto">
              <div className="relative flex flex-col mt-[24px]">
                <CreateEventHeader onPressGoBack={router.back} />
                <div className="flex flex-1 flex-col bg-bondscape-surface rounded-[24px] p-[40px]">
                  <div className="text-bondscape-text_neutral_900 text-[30px] font-semibold leading-10 tracking-normal pb-[1.5rem]">
                    Create Event
                  </div>
                  <Form className="flex flex-col">
                    <div className="flex flex-1 flex-row gap-[2rem]">
                      <div className="flex flex-col w-[31.75rem] xl:w-[41.5rem] gap-[1rem]">
                        <CoverPicDropZone
                          coverPic={values.coverPic}
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
                          required={false}
                          onChangeStart={(value) =>
                            setFieldValue("startDate", value)
                          }
                          onChangeEnd={(value) =>
                            setFieldValue("endDate", value)
                          }
                        />
                        <BondscapeSelectCategory
                          required={false}
                          onChange={(value) =>
                            setFieldValue("categoriesIds", value)
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
                            title={"Location"}
                            required={false}
                            onChange={(placeId) =>
                              setFieldValue("placeId", placeId)
                            }
                          />
                          <BondscapeSelectCoHosts
                            required={false}
                            onChange={(organizers) =>
                              setFieldValue("organizers", organizers)
                            }
                          />
                          <BondscapeSelectTags
                            required={false}
                            onChange={(tags) => setFieldValue("tags", tags)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 justify-center gap-[40px]">
                      <BondscapeButton
                        text={"Save as Draft"}
                        disabled={isSubmitting || !requiredDraftValuesSet}
                        loading={isSubmitting && values.status === "draft"}
                        onClick={() => {
                          setFieldValue("status", "draft").then(() =>
                            handleButtonClick(formikProps),
                          );
                        }}
                      />
                      <BondscapeButton
                        text={"Publish"}
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

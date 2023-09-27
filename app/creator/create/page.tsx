"use client";
import MainLayout from "../../layouts/MainLayout";
import React, { useCallback } from "react";
import bgOverlay from "../../../public/eventsBgOverlay.png";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import CreateEventHeader from "@/components/CreateEventHeader";
import { useRouter } from "next/navigation";
import CoverPicDropZone from "@/creator/create/CoverPicDropZone";
import BigTextInput from "@/creator/create/BigTextInput";
import { Form, Formik } from "formik";
import BondscapeDateTimePicker from "@/creator/create/BondscapeDateTimePicker/BondscapeDateTimePicker";
import BondscapeSelectCategory from "@/creator/create/BondscapeSelectCategory";
import SmallTextInput from "@/creator/create/SmallTextInput";
import LocationInput from "@/creator/create/LocationInput";
import BondscapeSelectCoHosts from "@/creator/create/BondscapeSelectCoHosts";
import BondscapeSelectTags from "@/creator/create/BondscapeSelectTags";
import { BondscapePreviewImage } from "@/types/image";
import { ClipLoader } from "react-spinners";
import PostImage from "@/services/axios/requests/PostImage";
import useUser from "@/hooks/user/useUser";
import PostEvent from "@/services/axios/requests/PostEvent";

export interface CreateEventValues {
  coverPic: BondscapePreviewImage;
  eventName: string;
  eventDetails: string;
  startDate?: string;
  endDate?: string;
  categoriesIds?: number[];
  website?: string;
  placeId?: string;
  coHosts: string[];
  tags?: string[];
}

export default function CreateEvent() {
  const { user } = useUser();
  const [isMobile, isMd] = useBreakpoints();
  const router = useRouter();

  const submitForm = useCallback(
    async (values: CreateEventValues) => {
      if (!user || !user.profile) return;
      values.coHosts.push(user.profile.address || "");
      let coverPicUrl = undefined;
      if (values.coverPic) {
        const result = await PostImage({
          file: values.coverPic,
        });
        console.log(result);
        if (result.isOk()) {
          coverPicUrl = result.value.url;
        }
      }
      await PostEvent({
        coverPicUrl,
        eventName: values.eventName,
        eventDetails: values.eventDetails,
        organizersAddresses: values.coHosts,
        startDate: values.startDate,
        endDate: values.endDate,
        categoriesIds: values.categoriesIds,
        website: values.website,
        placeId: values.placeId,
        tags: values.tags,
      }).then(() => router.replace("/creator/events"));
    },
    [router, user],
  );

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
        initialValues={{
          coverPic: {
            preview: "",
          } as BondscapePreviewImage,
          eventName: "",
          eventDetails: "",
          coHosts: [],
        }}
        onSubmit={async (values: CreateEventValues) => {
          await submitForm(values);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
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
                      <BondscapeDateTimePicker
                        required={false}
                        onChangeStart={(value) =>
                          setFieldValue("startDate", value)
                        }
                        onChangeEnd={(value) => setFieldValue("endDate", value)}
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
                          onChange={(coHosts) =>
                            setFieldValue("coHosts", coHosts)
                          }
                        />
                        <BondscapeSelectTags
                          required={false}
                          onChange={(tags) => setFieldValue("tags", tags)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-64 h-11 px-6 py-3 mt-12 self-center bg-violet-400 rounded-lg justify-center items-center gap-2 inline-flex"
                  >
                    <ClipLoader
                      size={20}
                      color={"white"}
                      loading={isSubmitting}
                    />
                    <div className="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
                      Submit
                    </div>
                  </button>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </MainLayout>
  );
}

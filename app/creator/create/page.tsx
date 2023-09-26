"use client";
import MainLayout from "../../layouts/MainLayout";
import React, { useState } from "react";
import bgOverlay from "../../../public/eventsBgOverlay.png";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import CreateEventHeader from "@/components/CreateEventHeader";
import { useRouter } from "next/navigation";
import CoverPicDropZone from "@/creator/create/CoverPicDropZone";
import BigTextInput from "@/creator/create/BigTextInput";
import { Form, Formik } from "formik";
import BondscapeDateTimePicker from "@/creator/create/BondscapeDateTimePicker/BondscapeDateTimePicker";
import BondscapeSelect from "@/creator/create/BondscapeSelect";

export default function Events() {
  const [coverPic, setCoverPic] = useState({
    preview: "",
  });
  const [isMobile, isMd] = useBreakpoints();
  const router = useRouter();

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
          eventName: "",
          eventDetails: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <div className="lg:pb-12 xl:pb-24 max-w-[70rem] xl:max-w-[90rem] mx-auto">
          <div className="relative flex flex-col mt-[24px]">
            <CreateEventHeader onPressGoBack={router.back} />
            <div className="flex flex-1 flex-col bg-bondscape-surface rounded-[24px] p-[40px]">
              <div className="text-bondscape-text_neutral_900 text-[30px] font-semibold leading-10 tracking-normal pb-[1.5rem]">
                Create Event
              </div>
              <Form className="flex flex-1 flex-row gap-[2rem]">
                <div className="flex flex-col w-[31.75rem] gap-[1rem]">
                  <CoverPicDropZone
                    coverPic={coverPic}
                    setCoverPic={setCoverPic}
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
                    required={false}
                    rows={5}
                  />
                </div>
                <div className="flex flex-col w-[31.75rem] gap-[1rem]">
                  <BondscapeDateTimePicker
                    required={true}
                    onChange={() => console.log("test")}
                  />
                  <BondscapeSelect
                    required={false}
                    onChange={() => console.log("test")}
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </MainLayout>
  );
}

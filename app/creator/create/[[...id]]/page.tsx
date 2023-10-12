"use client";
import MainSection from "@/creator/create/[[...id]]/MainSection";
import TicketSection from "@/creator/create/[[...id]]/TicketSection";
import useHooks from "@/creator/create/[[...id]]/useHooks";
import useCreateEvent from "@/hooks/events/useCreateEvent";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import { Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import bgOverlay from "../../../../public/eventsBgOverlay.png";
import MainLayout from "../../../layouts/MainLayout";

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
  const [activeSection, setActiveSection] = useState(0);
  // Hooks
  const [isMobile, isMd] = useBreakpoints();
  const {
    title,
    initialValues,
    validateSchema,
    draftButtonText,
    publishButtonText,
    isLoading,
    handleButtonClick,
  } = useHooks(eventId);
  const { uploadPictureAndCreateEvent } = useCreateEvent();

  const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    function updatePosition() {
      setPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  if (isMobile || isMd) {
    return (
      <div className="flex flex-1 h-screen justify-center items-center px-xMobile">
        <div className="text-white">
          This page is not supported on mobile devices. Please use a desktop
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <MainLayout
        customClasses={"bg-[#020014]"}
        backgroundOverlay={bgOverlay}
        forceNavbarBgVisible={true}
        statusBarMode={"goBack"}
      >
        <div className="flex flex-1 lg:pb-12 xl:pb-24 max-w-[70rem] xl:max-w-[90rem] mx-auto items-center justify-center">
          <PuffLoader
            color={"#A579FF"}
            loading={true}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="mt-36"
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      customClasses={"bg-[#020014]"}
      backgroundOverlay={bgOverlay}
      forceNavbarBgVisible={true}
      statusBarMode={"goBack"}
      statusBarBackOverride={
        activeSection === 0
          ? undefined
          : () => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              setActiveSection(0);
            }
      }
    >
      <div className="overflow-x-hidden">
        <Formik
          enableReinitialize={true}
          validationSchema={validateSchema}
          validateOnChange={true}
          validateOnMount={false}
          initialValues={initialValues}
          onSubmit={(values) => uploadPictureAndCreateEvent(values, eventId)}
        >
          {(formikProps) => {
            return (
              <AnimatePresence mode={"wait"}>
                <motion.div
                  className="lg:pb-12 xl:pb-24 max-w-[70rem] xl:max-w-[90rem] mx-auto"
                  key={activeSection}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: scrollPosition.scrollY > 0 ? 0.3 : 0,
                  }}
                >
                  <motion.div className="relative flex flex-col">
                    <motion.div className="flex flex-1 flex-col bg-bondscape-surface rounded-[24px] p-[40px]">
                      <motion.div>
                        {activeSection === 0 ? (
                          <MainSection
                            title={title}
                            formikProps={formikProps}
                            setActiveSection={setActiveSection}
                          />
                        ) : (
                          <TicketSection
                            formikProps={formikProps}
                            handleButtonClick={handleButtonClick}
                            draftButtonText={draftButtonText}
                            publishButtonText={publishButtonText}
                            initialValues={initialValues}
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            );
          }}
        </Formik>
      </div>
    </MainLayout>
  );
}

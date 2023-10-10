"use client";
import MainLayout from "../../../layouts/MainLayout";
import React, { useState } from "react";
import bgOverlay from "../../../../public/eventsBgOverlay.png";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import { PuffLoader } from "react-spinners";
import useHooks from "@/creator/create/[[...id]]/useHooks";
import { AnimatePresence, motion } from "framer-motion";
import MainSection from "@/creator/create/[[...id]]/MainSection";
import TicketSection from "@/creator/create/[[...id]]/TicketSection";

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
  const { isLoading } = useHooks(eventId);
  const [isMobile, isMd] = useBreakpoints();

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

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <MainLayout
      customClasses={"bg-[#020014]"}
      backgroundOverlay={bgOverlay}
      forceNavbarBgVisible={true}
      statusBarMode={"goBack"}
    >
      <AnimatePresence mode={"wait"}>
        <motion.div
          key={activeSection}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeSection === 0 ? (
            <MainSection
              eventId={eventId}
              setActiveSection={setActiveSection}
            />
          ) : (
            <TicketSection
              eventId={eventId}
              setActiveSection={setActiveSection}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}

"use client";
import MainLayout from "../../layouts/MainLayout";
import React, { Suspense, useState } from "react";
import bgOverlay from "../../../public/eventsBgOverlay.png";
import Tabs from "@/components/Tabs";
import EventsHeader from "@/components/EventsHeader";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import EventsTabs from "@/creator/events/EventsTabs";
import { PuffLoader } from "react-spinners";

export default function Events() {
  const [activeTab, setActiveTab] = useState(0);
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

  return (
    <MainLayout
      customClasses={"bg-[#020014]"}
      backgroundOverlay={bgOverlay}
      forceNavbarBgVisible={true}
    >
      <div className=" lg:px-xLg xl:px-xXl">
        <div className="relative flex flex-col w-full gap-[24px]">
          <EventsHeader
            onPressCreateEvent={() => console.log("create event")}
          />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <Suspense
            fallback={
              <div className="flex justify-center items-center mt-48">
                <PuffLoader size={100} color={"white"} />
              </div>
            }
          >
            <EventsTabs activeTab={activeTab} />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}

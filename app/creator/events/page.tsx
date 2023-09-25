"use client";
import MainLayout from "../../layouts/MainLayout";
import React, { useState } from "react";
import bgOverlay from "../../../public/eventsBgOverlay.png";
import Tabs from "@/components/Tabs";
import EventsHeader from "@/components/EventsHeader";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import EventsTabs from "@/creator/events/EventsTabs";
import { PuffLoader } from "react-spinners";
import useHooks from "@/creator/events/useHooks";

export default function Events() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, isMd] = useBreakpoints();
  const { data, loading } = useHooks(activeTab);

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
      <div className="lg:px-xLg xl:px-[240px]">
        <div className="relative flex flex-col gap-[24px]">
          <EventsHeader
            onPressCreateEvent={() => console.log("create event")}
          />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {loading ? (
            <div className="flex justify-center items-center mt-48">
              <PuffLoader size={100} color={"white"} />
            </div>
          ) : (
            <EventsTabs activeTab={activeTab} events={data?.events} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

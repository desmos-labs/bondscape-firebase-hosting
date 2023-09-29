"use client";
import MainLayout from "../../layouts/MainLayout";
import React from "react";
import bgOverlay from "../../../public/eventsBgOverlay.png";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import EventsTabs from "@/creator/events/EventsTabs";
import { PuffLoader } from "react-spinners";
import useHooks from "@/creator/events/useHooks";
import { useActiveTab } from "@/recoil/activeTab";

export default function Events() {
  const activeTab = useActiveTab();
  const [isMobile, isMd] = useBreakpoints();
  const { data, loading, fetchingMore, lastElementRef } = useHooks();

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
      <div className="lg:pb-12 xl:pb-24 max-w-[70rem] xl:max-w-[90rem] mx-auto mt-[32px]">
        <div className="relative flex flex-1 flex-col">
          {loading ? (
            <div className="flex justify-center items-center mt-12">
              <PuffLoader size={100} color={"white"} />
            </div>
          ) : (
            <>
              <EventsTabs
                activeTab={activeTab}
                events={data?.events}
                lastElementRef={lastElementRef}
              />
              {fetchingMore && (
                <div className="flex justify-center items-center mt-12">
                  <PuffLoader size={100} color={"white"} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

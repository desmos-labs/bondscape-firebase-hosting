"use client";
import MainLayout from "../../layouts/MainLayout";
import React from "react";
import bgOverlay from "../../../public/eventsBgOverlay.png";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import CreateEventHeader from "@/components/CreateEventHeader";
import { useRouter } from "next/navigation";

export default function Events() {
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
      <div className="lg:pb-12 xl:pb-24 max-w-[70rem] xl:max-w-[90rem] mx-auto">
        <div className="relative flex flex-col mt-[24px]">
          <CreateEventHeader onPressGoBack={router.back} />
          <div className="flex flex-1 bg-bondscape-surface rounded-[24px] p-[40px]"></div>
        </div>
      </div>
    </MainLayout>
  );
}

"use client";
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import heroImage from "../../../public/bondscape-home-bg.png";
import useBreakpoints from "@/hooks/useBreakpoints";

export default function Privacy() {
  const [isMobile, isMd, isLg, isXl, isBreakpointReady] = useBreakpoints();

  return (
    <MainLayout backgroundImage={true} backgroundImageSrc={heroImage}>
      <div className="relative items-center w-full h-screen min-h-mobile md:min-h-md lg:min-h-lg xl:min-h-xl">
        <div className="flex flex-col lg:flex-row relative md:justify-center">
          <div className="w-[27rem] flex-col items-center gap-8 inline-flex mt-[120px]">
            <Image
              alt={"Bondscape Logo with text"}
              src={"/bondscapeLogoWithIcon.png"}
              width={160}
              height={146}
            />
            <p className="text-white font-light text-[16px] leading-[24px] pb-[48px]">
              Create real bonds with engaging event experiences
            </p>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-row flex-1 py-[6px] w-[420px] rounded-[100px] justify-center items-center bg-white">
                <Image
                  alt={"Google login"}
                  src={"/googleLoginIcon.png"}
                  width={40}
                  height={40}
                />
                <p className="text-bondscape-text_neutral_800 font-semibold text-[16px] leading-[24px]">
                  Continue with Google
                </p>
              </div>
              <div className="flex flex-row flex-1 py-[6px] w-[420px] rounded-[100px] justify-center items-center bg-white">
                <Image
                  alt={"Google login"}
                  src={"/appleLoginIcon.png"}
                  width={40}
                  height={40}
                />
                <p className="text-bondscape-text_neutral_800 font-semibold text-[16px] leading-[24px]">
                  Continue with Apple
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

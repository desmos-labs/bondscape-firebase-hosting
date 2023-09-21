"use client";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import heroImage from "../../../public/bondscape-home-bg.png";
import overlay from "../../../public/login-overlay-bg.png";
import useBreakpoints from "../../hooks/useBreakpoints";

export default function Login() {
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
      backgroundImage={true}
      backgroundImageSrc={heroImage}
      backgroundOverlay={overlay}
    >
      <div className="relative w-full h-screen flex justify-center">
        <div className="flex justify-center">
          <div className="w-[27rem] flex flex-col items-center gap-8 mt-48">
            <Image
              priority
              alt={"Bondscape Logo with text"}
              src={"/bondscapeLogoWithIcon.png"}
              width={160}
              height={146}
            />
            <p className="text-white font-light text-[16px] leading-[24px] pb-[48px]">
              Create real bonds with engaging event experiences
            </p>
            <div className="flex flex-col gap-[24px]">
              <button
                className="flex flex-row flex-1 py-[6px] w-[420px] rounded-[100px] justify-center items-center bg-white hover:bg-[#EDEDED] transition-colors ease-in-out duration-300 cursor-pointer bondscape-box-shadow-medium"
                onClick={() => console.log("test")}
              >
                <Image
                  alt={"Google login"}
                  src={"/googleLoginIcon.png"}
                  width={40}
                  height={40}
                />
                <p className="text-bondscape-text_neutral_800 font-semibold text-[16px] leading-[24px]">
                  Continue with Google
                </p>
              </button>
              <button
                className="flex flex-row flex-1 py-[6px] w-[420px] rounded-[100px] justify-center items-center bg-white hover:bg-[#EDEDED] transition-colors ease-in-out duration-300 cursor-pointer bondscape-box-shadow-medium"
                onClick={() => console.log("test")}
              >
                <Image
                  alt={"Google login"}
                  src={"/appleLoginIcon.png"}
                  width={40}
                  height={40}
                />
                <p className="text-bondscape-text_neutral_800 font-semibold text-[16px] leading-[24px]">
                  Continue with Apple
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

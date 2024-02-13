"use client";
import { DesmosChain } from "@/lib/WalletUtils/LinkableChains";
import { Web3AuthLoginProvider } from "@/types/web3auth";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import React, { useCallback, useState } from "react";
import heroImage from "../../../public/bondscape-home-bg.png";
import overlay from "../../../public/login-overlay-bg.png";
import useBreakpoints from "../../hooks/layout/useBreakpoints";
import useLoginWithWeb3Auth from "../../hooks/web3Auth/useLoginWithWeb3Auth";
import MainLayout from "../../layouts/MainLayout";

export default function Login() {
  const { login, loginLoading } = useLoginWithWeb3Auth(DesmosChain);
  const [isMobile, isMd] = useBreakpoints();
  const [modalIsOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Wrapper function to login with a specific provider and handle the error with a modal
   */
  const loginWrapper = useCallback(
    async (loginProvider: Web3AuthLoginProvider) => {
      const result = await login(loginProvider);
      if (result.isErr()) {
        if (result.error.cause === "profile_not_found") {
          setTimeout(() => setIsModalOpen(true), 300);
        }
      }
    },
    [login],
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
      backgroundImage={true}
      backgroundImageSrc={heroImage}
      backgroundOverlay={overlay}
      isLoading={loginLoading}
      disableNavbarBgInDesktop={true}
    >
      <div className="relative w-full flex justify-center items-center">
        <div className="flex justify-center">
          <div className="w-[27rem] flex flex-col items-center gap-8">
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
                onClick={() => loginWrapper(Web3AuthLoginProvider.Google)}
              >
                <Image
                  alt={"Google login"}
                  src={"/googleLoginIcon.png"}
                  width={40}
                  height={40}
                />
                <p className="text-[#3B3B3B] font-semibold text-[16px] leading-[24px]">
                  Continue with Google
                </p>
              </button>
              <button
                className="flex flex-row flex-1 py-[6px] w-[420px] rounded-[100px] justify-center items-center bg-white hover:bg-[#EDEDED] transition-colors ease-in-out duration-300 cursor-pointer bondscape-box-shadow-medium"
                onClick={() => loginWrapper(Web3AuthLoginProvider.Apple)}
              >
                <Image
                  alt={"Google login"}
                  src={"/appleLoginIcon.png"}
                  width={40}
                  height={40}
                />
                <p className="text-[#3B3B3B] font-semibold text-[16px] leading-[24px]">
                  Continue with Apple
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        draggable={false}
        modal={true}
        blockScroll={true}
        visible={modalIsOpen}
        onHide={closeModal}
        header="We can't find your Desmos Profile"
        pt={{
          header: {
            className: classNames("text-center font-semibold"),
          },
        }}
      >
        <div className="relative flex flex-1 h-full w-full items-center justify-center mt-4">
          <div className="text-center text-white font-semibold text-[16px] leading-[24px]">
            Sorry, seems like you do not have a Desmos Profile yet. <br />
            <br />
            Please download Bondscape and create your own Desmos Profile
          </div>
        </div>
      </Dialog>
    </MainLayout>
  );
}

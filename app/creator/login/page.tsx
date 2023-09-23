"use client";
import React, { useCallback, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import heroImage from "../../../public/bondscape-home-bg.png";
import overlay from "../../../public/login-overlay-bg.png";
import useBreakpoints from "../../hooks/layout/useBreakpoints";
import useLoginWithWeb3Auth from "../../hooks/web3Auth/useLoginWithWeb3Auth";
import { DesmosChain } from "@/lib/WalletUtils/LinkableChains";
import { Web3AuthLoginProvider } from "@/types/web3auth";
import Modal from "react-modal";

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
      <div className="relative w-full flex justify-center">
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
                onClick={() => loginWrapper(Web3AuthLoginProvider.Google)}
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
                onClick={() => loginWrapper(Web3AuthLoginProvider.Apple)}
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Profile not found modal"
        ariaHideApp={false}
        closeTimeoutMS={300}
        style={{
          content: {
            position: "absolute",
            width: "40rem",
            height: "10rem",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
            alignSelf: "center",
            backgroundColor: "#21202A",
            borderRadius: "8px",
            border: "none",
          },
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
      >
        <div className="relative flex flex-1 h-full w-full items-center justify-center">
          <div className="text-center text-white font-semibold text-[16px] leading-[24px]">
            Sorry, seems like you do not have a Desmos Profile yet. <br />
            <br />
            Please download Bondscape and create your own Desmos Profile
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}

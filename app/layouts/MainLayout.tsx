"use client";
import BackgroundImage from "@/components/BackgroundImage";
import Footer from "@/components/Footer";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import heroImage from "../../public/bondscape-home-bg-masked.png";
import NavigationBar from "../components/NavigationBar";

export interface MainLayoutProps {
  readonly backgroundImage?: boolean;
  readonly backgroundImageSrc?: StaticImport;
  readonly backgroundOverlay?: StaticImport;
  readonly children: React.ReactNode;
  readonly isLoading?: boolean;
  readonly disableNavbarBgInDesktop?: boolean;
  readonly forceNavbarBgVisible?: boolean;
  readonly customClasses?: string;
  readonly statusBarMode?: "goBack" | "editDetails";
  readonly statusBarBackOverride?: () => void;
  readonly editButtonHref?: string;
}

const MainLayout = (props: MainLayoutProps) => {
  const {
    children,
    backgroundImage,
    backgroundImageSrc,
    backgroundOverlay,
    isLoading,
    disableNavbarBgInDesktop,
    forceNavbarBgVisible,
    customClasses,
    statusBarMode,
    statusBarBackOverride,
    editButtonHref,
  } = props;

  return (
    <LoadingOverlay
      active={isLoading || false}
      spinner
      styles={{
        spinner: (base) => ({
          ...base,
          "& svg circle": {
            stroke: "#8358F9",
          },
        }),
      }}
    >
      <div className={`${customClasses} flex flex-col h-dvh`}>
        <div className={`sticky top-0 w-full z-10`}>
          <div className="relative w-full min-w-[375px]">
            <NavigationBar
              disableNavbarBgInDesktop={disableNavbarBgInDesktop}
              forceNavbarBgVisible={forceNavbarBgVisible}
              goBackStatusBar={statusBarMode === "goBack"}
              detailsStatusBar={statusBarMode === "editDetails"}
              statusBarBackOverride={statusBarBackOverride}
              editButtonHref={editButtonHref}
            />
          </div>
        </div>
        {backgroundImage && (
          <BackgroundImage
            image={backgroundImageSrc || heroImage}
            alt={"Bondscape background"}
          />
        )}
        {backgroundOverlay && (
          <BackgroundImage
            image={backgroundOverlay}
            alt={"Bondscape overlay"}
          />
        )}
        <main className="flex flex-grow w-full">{children}</main>
        <footer className="relative w-full min-w-[375px]">
          <Footer />
        </footer>
      </div>
    </LoadingOverlay>
  );
};

export default MainLayout;

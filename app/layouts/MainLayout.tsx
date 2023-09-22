"use client";
import React from "react";
import heroImage from "../../public/bondscape-home-bg-masked.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NavigationBar from "../components/NavigationBar";
import BackgroundImage from "../components/BackgroundImage";
import LoadingOverlay from "react-loading-overlay-ts";

export interface MainLayoutProps {
  readonly backgroundImage?: boolean;
  readonly backgroundImageSrc?: StaticImport;
  readonly backgroundOverlay?: StaticImport;
  readonly children: React.ReactNode;
  readonly isLoading?: boolean;
  readonly disableNavbarBgInDesktop?: boolean;
  readonly customClasses?: string;
}

const MainLayout = (props: MainLayoutProps) => {
  const {
    children,
    backgroundImage,
    backgroundImageSrc,
    backgroundOverlay,
    isLoading,
    disableNavbarBgInDesktop,
    customClasses,
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
      <div className={`${customClasses} relative h-full md:h-screen`}>
        <div className={`sticky top-0 w-full z-10`}>
          <div className="relative w-full min-w-[375px]">
            <NavigationBar
              disableNavbarBgInDesktop={disableNavbarBgInDesktop}
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
        <main className="w-full">{children}</main>
      </div>
    </LoadingOverlay>
  );
};

export default MainLayout;

import React from "react";
import NavigationBar from "@/components/NavigationBar";
import heroImage from "../../../public/bondscape-home-bg-masked.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import BackgroundImage from "@/components/BackgroundImage";

export interface MainLayoutProps {
  readonly backgroundImage?: boolean;
  readonly backgroundImageSrc?: StaticImport;
  readonly backgroundOverlay?: StaticImport;
  readonly children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children, backgroundImage, backgroundImageSrc, backgroundOverlay } =
    props;

  return (
    <div className={"relative"}>
      <div className={`sticky top-0 w-full z-20`}>
        <div className="relative w-full min-w-[375px]">
          <NavigationBar />
        </div>
      </div>
      {backgroundImage && (
        <BackgroundImage
          image={backgroundImageSrc || heroImage}
          alt={"Bondscape background"}
        />
      )}
      {backgroundOverlay && (
        <BackgroundImage image={backgroundOverlay} alt={"Bondscape overlay"} />
      )}
      <main className="w-full">{children}</main>
    </div>
  );
};

export default MainLayout;

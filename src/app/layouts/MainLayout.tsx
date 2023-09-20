import React from "react";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import heroImage from "../../../public/bondscape-home-bg-masked.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface MainLayoutProps {
  readonly backgroundImage?: boolean;
  readonly backgroundImageSrc?: StaticImport;
  readonly children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children, backgroundImage, backgroundImageSrc } = props;

  return (
    <div className={"relative"}>
      <div className={`sticky top-0 w-full z-20`}>
        <div className="relative w-full min-w-[375px]">
          <NavigationBar />
        </div>
      </div>
      {backgroundImage && (
        <Image
          priority
          alt={"phone mockup"}
          src={backgroundImageSrc || heroImage}
          sizes={"100vw"}
          quality={100}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      )}
      <main className="w-full">{children}</main>
    </div>
  );
};

export default MainLayout;

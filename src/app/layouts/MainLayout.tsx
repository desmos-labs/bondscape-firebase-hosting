import React from "react";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import heroImage from "../../../public/bondscape-home-bg-masked.png";

export interface MainLayoutProps {
  readonly backgroundImage?: boolean;
  readonly children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children, backgroundImage } = props;

  return (
    <div className={"relative"}>
      <div className={`sticky top-0 w-full z-20`}>
        <div className="relative w-full min-w-[375px] left-1/2 -translate-x-1/2">
          <NavigationBar />
        </div>
      </div>
      {backgroundImage && (
        <Image
          priority
          alt={"phone mockup"}
          src={heroImage}
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

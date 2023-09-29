import MainLayout from "./layouts/MainLayout";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import mockupImage from "../public/mockup-image-mobile.webp";
import DefaultSEO from "./seo";

export const metadata = {
  ...DefaultSEO,
};

export default function Home() {
  return (
    <MainLayout
      backgroundImage={true}
      disableNavbarBgInDesktop={true}
      fullScreenHeightOption={"onlyDesktop"}
    >
      <div className="flex justify-center w-full h-screen">
        <div className="flex flex-col lg:flex-row items-center relative justify-center">
          <div className="w-[280px] h-[382px] md:w-[350px] md:h-[478px] lg:w-[438px] lg:h-[597px] relative">
            <Image
              priority
              quality={100}
              alt={"phone mockup"}
              fill
              sizes={"(max-width: 768px) 50vw, (max-width: 1200px) 40vw"}
              src={mockupImage}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="lg:ml-[80px]">
            <h5 className="md:hidden text-center text-2xl leading-9 font-semibold text-transparent bg-clip-text bondscape-text-gradient">
              Create real bonds with <br /> engaging event <br /> experiences
            </h5>
            <div className="md: hidden mt-[24px] text-center text-[#E8E8E8] text-sm font-light leading-[21px]">
              We simplify event management and boost engagement, empowering
              users with social <br /> features to connect, share moments, and{" "}
              <br />
              deepen their bonds.
            </div>
            <h1 className="hidden md:block lg:hidden text-center text-2xl md:text-4xl leading-9 font-semibold text-transparent bg-clip-text bondscape-text-gradient">
              Create real bonds with <br /> engaging event experiences
            </h1>
            <div className="hidden md:block lg:hidden mt-[24px] text-center text-[#E8E8E8] text-sm font-light leading-[21px]">
              We simplify event management and boost engagement, empowering
              users with <br /> social features to connect, share moments, and
              deepen their bonds.
            </div>
            <h1 className="hidden lg:block text-left text-5xl leading-[70px] font-semibold text-transparent bg-clip-text bondscape-text-gradient">
              Create real bonds with <br /> engaging event <br /> experiences
            </h1>
            <div className="hidden lg:block mt-[24px] text-left text-[#E8E8E8] text-[18px] font-light leading-relaxed">
              We simplify event management and boost engagement empowering users{" "}
              <br /> with social features to connect, share moments, and deepen
              their bonds.
            </div>
            <div className="flex flex-row mt-[40px] justify-center lg:justify-start">
              <Link
                href={"https://apps.apple.com/us/app/bondscape/id6449780653"}
              >
                <div className="relative w-[160px] md:w-[202px] h-[48px] md:h-[60px]">
                  <Image
                    alt={"App Store Icon"}
                    src={"/app-store-icon.png"}
                    fill
                    sizes={"(max-width: 768px) 10vw, (max-width: 1200px) 15vw"}
                  />
                </div>
              </Link>
              <span className="mr-[16px]"></span>
              <Link
                href={
                  "https://play.google.com/store/apps/details?id=mobile.bondscape.app"
                }
              >
                <div className="relative w-[160px] md:w-[202px] h-[48px] md:h-[60px] hover:fill-red-500 transition-colors ease-in-out duration-300 cursor-pointer">
                  <Image
                    alt={"Google Play Icon"}
                    src={"/google-play-icon.png"}
                    fill
                    sizes={"(max-width: 768px) 10vw, (max-width: 1200px) 15vw"}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

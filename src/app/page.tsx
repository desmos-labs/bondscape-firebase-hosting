import MainLayout from "@/layouts/MainLayout";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import mockupImage from "../../public/mockup-image-mobile.webp";

export const metadata = {
  title: "Bondscape",
  description: "Create real bonds with engaging event experiences",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    url: "https://bondscape.app/",
    title: "Bondscape",
    description: "Create real bonds with engaging event experiences",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_HOST}/bondscapeLogo.png`,
        width: 500,
        height: 100,
        alt: "Bondscape logo picture",
        type: "image/png",
      },
    ],
    siteName: "Bondscape",
  },
  twitter: {
    creator: "@bondscape",
    card: "summary_large_image",
    title: "Bondscape",
    description: "Create real bonds with engaging event experiences",
  },
  keywords: ["Desmos", "Event", "Crypto"],
};

export default function Home() {
  return (
    <MainLayout backgroundImage={true}>
      <div className="relative items-center w-full h-screen min-h-mobile md:min-h-md lg:min-h-lg xl:min-h-xl">
        <div className="flex flex-col lg:flex-row items-center relative h-full md:h-screen justify-center">
          <div className="flex w-[350px] h-[478px] lg:w-[438px] lg:h-[597px] relative">
            <Image
              quality={100}
              alt={"phone mockup"}
              fill
              src={mockupImage}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="lg:ml-[80px]">
            <h5 className="md:hidden text-center text-2xl leading-9 font-semibold text-transparent bg-clip-text bondscape-text-gradient">
              Create real bonds with <br /> engaging event <br /> experiences
            </h5>
            <div className="md: hidden mt-[24px] text-center text-bondscape-text_neutral_300 text-sm font-light leading-[21px]">
              We simplify event management and boost engagement, empowering
              users with social <br /> features to connect, share moments, and{" "}
              <br />
              deepen their bonds.
            </div>
            <h1 className="hidden md:block lg:hidden text-center text-2xl md:text-4xl leading-9 font-semibold text-transparent bg-clip-text bondscape-text-gradient">
              Create real bonds with <br /> engaging event experiences
            </h1>
            <div className="hidden md:block lg:hidden mt-[24px] text-center text-bondscape-text_neutral_300 text-sm font-light leading-[21px]">
              We simplify event management and boost engagement, empowering
              users with <br /> social features to connect, share moments, and
              deepen their bonds.
            </div>
            <h1 className="hidden lg:block text-left text-5xl leading-[70px] font-semibold text-transparent bg-clip-text bondscape-text-gradient">
              Create real bonds with <br /> engaging event <br /> experiences
            </h1>
            <div className="hidden lg:block mt-[24px] text-left text-bondscape-text_neutral_300 text-[18px] font-light leading-relaxed">
              We simplify event management and boost engagement empowering users{" "}
              <br /> with social features to connect, share moments, and deepen
              their bonds.
            </div>
            <div className="flex flex-row mt-[40px] justify-center lg:justify-start">
              <Link href={"https://testflight.apple.com/join/hVfWxAr0"}>
                <div className="relative w-[160px] md:w-[202px] h-[48px] md:h-[60px]">
                  <Image
                    alt={"App Store Icon"}
                    src={"/app-store-icon.png"}
                    fill
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

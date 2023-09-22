"use client";
import React, { useEffect, useState } from "react";
import useBreakpoints from "../hooks/layout/useBreakpoints";

export interface ContentBackground {
  /**
   * Url of the image
   */
  readonly image?: string;

  /**
   * If true, the background will be set to full screen width. Otherwise, the background will be the same
   * size as the container.
   */
  readonly isFullScreenWidth?: boolean;
}

export interface SectionLayoutProps {
  /**
   * Optional. If not present, the section height will be auto and bounded by min-height of each breakpoint
   */
  fullScreenHeightOption?: "always" | "onlyDesktop" | "never";

  /**
   * Tailwind bg
   * Optional. This is always as wide as the screen width, and as high as section height.
   * It is UNDER contentBackground
   */
  sectionBackground?: string;

  /**
   * Optional. This is always as wide as the container width, and as high as section height.
   */
  contentBackground?: ContentBackground;

  /**
   * Required. The content of the section
   */
  children: React.ReactNode;
}

/**
 * Foundation layout of all sections, background will always be fullscreen width, and content will always be in container width
 */
const SectionLayout = (props: SectionLayoutProps) => {
  const {
    contentBackground,
    sectionBackground,
    fullScreenHeightOption,
    children,
  } = props;

  const [sectionHeight, setSectionHeight] = useState("h-auto");
  const [isBreakpointReady] = useBreakpoints();

  useEffect(() => {
    if (fullScreenHeightOption) {
      switch (fullScreenHeightOption) {
        case "always":
          setSectionHeight("h-screen");
          break;
        case "onlyDesktop":
          setSectionHeight("h-auto lg:h-screen");
          break;
        case "never":
          setSectionHeight("h-auto");
          break;
      }
    }
  }, [fullScreenHeightOption]);

  return (
    <div
      className={`relative overflow-hidden items-center w-full ${sectionHeight} min-h-mobile md:min-h-md lg:min-h-lg xl:min-h-xl ${
        sectionBackground || ""
      } bg-no-repeat`}
    >
      {/* Background */}
      {contentBackground?.image && (
        <div
          className={`absolute mix-blend-lighten m-auto top-0 left-0 right-0 ${
            contentBackground?.isFullScreenWidth
              ? "w-full"
              : "w-mobile md:w-md lg:w-lg xl:w-xl"
          } h-full -z-20`}
        />
      )}
      {/* Content */}
      <div className="container w-mobile md:w-md lg:w-lg xl:w-xl h-full px-xMobile md:px-xMd lg:px-xLg xl:px-xXl py-yMobile md:py-yMd lg:py-yLg xl:py-yXl">
        {isBreakpointReady && children}
      </div>
    </div>
  );
};

export default SectionLayout;

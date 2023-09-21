"use client";
import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Props {
  image: string | StaticImport;
  alt: string;
}

const BackgroundImage = ({ image, alt }: Props) => {
  return (
    <Image
      priority
      alt={alt}
      src={image}
      sizes={"100vw"}
      quality={100}
      fill={true}
      className="transition-opacity opacity-[0] duration-[1s]"
      style={{ objectFit: "cover" }}
      onLoadingComplete={(image) => {
        image.classList.remove("opacity-[0]");
      }}
    />
  );
};

export default BackgroundImage;

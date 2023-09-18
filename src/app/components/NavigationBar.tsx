"use client";
import React from "react";
import Link from "next/link";
import BondscapeLogo from "@/components/BondscapeLogo/BondscapeLogo";

const NavigationBar = () => {
  return (
    <nav className="relative flex justify-between items-center w-full h-navbar-mobile md:h-navbar-md lg:h-navbar-lg xl:h-navbar-xl px-xMobile md:px-xMd lg:px-xLg xl:px-xXl">
      <Link href="/">
        <BondscapeLogo />
      </Link>
    </nav>
  );
};

export default NavigationBar;

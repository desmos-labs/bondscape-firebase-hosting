"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BondscapeLogo from "@/components/BondscapeLogo/BondscapeLogo";

const NavigationBar = () => {
  const [colorChange, setColorChange] = useState(false);
  const changeNavbarColor = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 20) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
  }, []);
  return (
    <nav
      className={`${
        colorChange ? "bg-bondscape-background-primary" : "bg-transparent"
      } transition-colors duration-300 ease-in-out relative flex items-center w-full h-navbar-mobile md:h-navbar-md lg:h-navbar-lg xl:h-navbar-xl px-xMobile md:px-xMd lg:px-xLg xl:px-xXl`}
    >
      <Link href="/">
        <BondscapeLogo />
      </Link>
    </nav>
  );
};

export default NavigationBar;

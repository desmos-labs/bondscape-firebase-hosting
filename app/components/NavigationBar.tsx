"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import BondscapeLogo from "./BondscapeLogo/BondscapeLogo";
import useBreakpoints from "../hooks/useBreakpoints";

const NavigationBar = () => {
  const [isMobile, isMd, isLg, isXl] = useBreakpoints();
  const [colorChange, setColorChange] = useState(false);
  const changeNavbarColor = useCallback(() => {
    if (window.scrollY >= 20 && !isLg && !isXl) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  }, [isLg, isXl]);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
  }, [changeNavbarColor]);
  return (
    <nav
      className={`${
        colorChange ? "bg-bondscape-background-primary" : "bg-transparent"
      } transition-colors ease-in-out sticky flex justify-between items-center w-full h-navbar-mobile md:h-navbar-md lg:h-navbar-lg xl:h-navbar-xl px-xMobile md:px-xMd lg:px-xLg xl:px-xXl`}
    >
      <Link href="/">
        <BondscapeLogo />
      </Link>
      {process.env.NODE_ENV === "development" && !(isMobile || isMd) && (
        <Link href={"/creator/login"}>
          <div className="text-white font-semibold">
            <button>Login</button>
          </div>
        </Link>
      )}
    </nav>
  );
};

export default NavigationBar;

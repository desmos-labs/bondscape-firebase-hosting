"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import BondscapeLogo from "./BondscapeLogo";
import useBreakpoints from "../hooks/layout/useBreakpoints";
import { useActiveProfile } from "../recoil/profiles";
import { DesmosProfile } from "../types/desmos";
import SelectComponent from "./SelectComponent";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
  // States
  const [profile, setProfile] = useState<DesmosProfile | null | undefined>(
    null,
  );
  const [navbarBgVisible, setNavbarBgVisible] = useState(false);
  // Hooks
  const [isMobile, isMd, isBreakpointReady] = useBreakpoints();
  const activeProfile = useActiveProfile();
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos >= 20 && (isMobile || isMd)) {
      setNavbarBgVisible(true);
    }
  }, [isMd, isMobile]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll, isBreakpointReady]);

  useEffect(() => {
    setProfile(activeProfile);
  }, [activeProfile]);

  return (
    <nav
      className={`${
        navbarBgVisible ? "bg-bondscape-background-primary" : "bg-transparent"
      } transition-colors ease-in-out sticky flex justify-between items-center w-full h-navbar-mobile md:h-navbar-md lg:h-navbar-lg xl:h-navbar-xl px-xMobile md:px-xMd lg:px-xLg xl:px-xXl`}
    >
      <Link href="/">
        <BondscapeLogo />
      </Link>
      <div>
        {pathname !== "/creator/login" &&
          (profile === null ? (
            <></>
          ) : profile ? (
            <SelectComponent profile={profile} />
          ) : (
            <Link href={"/creator/login"}>
              <div className="text-white font-semibold">
                <button>Login</button>
              </div>
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default NavigationBar;

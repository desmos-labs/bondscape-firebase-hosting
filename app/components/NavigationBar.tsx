"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BondscapeLogo from "./BondscapeLogo";
import useBreakpoints from "../hooks/layout/useBreakpoints";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/user/useUser";
import SelectComponent from "@/components/SelectComponent";
import { AnimatePresence, motion } from "framer-motion";

const NavigationBar = ({
  disableNavbarBgInDesktop,
  forceNavbarBgVisible,
}: {
  forceNavbarBgVisible?: boolean;
  disableNavbarBgInDesktop?: boolean;
}) => {
  const [navbarBgVisible, setNavbarBgVisible] = useState(false);
  // Hooks
  const [isMobile, isMd, isLg, isXl, isDesktop, isBreakpointReady] =
    useBreakpoints();
  const pathname = usePathname();
  const { user } = useUser();
  const handleScroll = useCallback(() => {
    if (window.scrollY >= 60 && (isMobile || isMd)) {
      setNavbarBgVisible(true);
    } else if (window.scrollY >= 80 && isDesktop && !disableNavbarBgInDesktop) {
      setNavbarBgVisible(true);
    } else if (window.scrollY > 0 && forceNavbarBgVisible) {
      setNavbarBgVisible(true);
    } else {
      setNavbarBgVisible(false);
    }
  }, [
    disableNavbarBgInDesktop,
    forceNavbarBgVisible,
    isDesktop,
    isMd,
    isMobile,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll, isBreakpointReady]);

  const RightButton = useMemo(() => {
    if (
      pathname === "/creator/login" ||
      pathname === "/creator/privacy" ||
      pathname === "/creator/terms"
    ) {
      return;
    }
    if (!user || !isDesktop) {
      return;
    }
    return user.profile ? (
      <SelectComponent profile={user.profile} />
    ) : (
      <Link href={"/creator/login"}>
        <div className="text-white font-semibold">
          <button>Login</button>
        </div>
      </Link>
    );
  }, [isDesktop, pathname, user]);

  return (
    <nav
      className={`${
        navbarBgVisible ? "backdrop-blur-lg" : "bg-transparent"
      } transition-colors ease-in-out sticky flex justify-between items-center w-full h-navbar-mobile md:h-navbar-md lg:h-navbar-lg xl:h-navbar-xl px-xMobile md:px-xMd lg:px-xLg xl:px-xXl`}
    >
      <Link href="/">
        <BondscapeLogo />
      </Link>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {RightButton}
        </motion.div>
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;

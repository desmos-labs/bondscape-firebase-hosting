"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BondscapeLogo from "./BondscapeLogo";
import useBreakpoints from "../hooks/layout/useBreakpoints";
import { usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/user/useUser";
import SelectComponent from "@/components/SelectComponent";
import { AnimatePresence, motion } from "framer-motion";
import EventsHeader from "@/components/EventsHeader";
import Tabs from "@/components/Tabs";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeTabState } from "@/recoil/activeTab";
import { loginVisibilityState } from "@/recoil/loginVisibility";

const NavigationBar = ({
  disableNavbarBgInDesktop,
  forceNavbarBgVisible,
}: {
  forceNavbarBgVisible?: boolean;
  disableNavbarBgInDesktop?: boolean;
}) => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [navbarBgVisible, setNavbarBgVisible] = useState(false);
  const isLoginButtonVisible = useRecoilValue(loginVisibilityState);
  // Hooks
  const [isMobile, isMd, isLg, isXl, isDesktop, isBreakpointReady] =
    useBreakpoints();
  const pathname = usePathname();
  const router = useRouter();
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
      pathname === "/terms"
    ) {
      return;
    }
    if (
      !user ||
      !isDesktop ||
      (process.env.NODE_ENV === "production" && !isLoginButtonVisible)
    ) {
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
  }, [isDesktop, isLoginButtonVisible, pathname, user]);

  return (
    <nav
      className={`${
        navbarBgVisible ? "backdrop-blur-lg" : "bg-transparent"
      } transition-colors ease-in-out sticky flex w-full px-xMobile md:px-xMd lg:px-xLg xl:px-xXl`}
    >
      <div className="flex flex-1 flex-col gap-[24px]">
        <div className="flex items-center flex-row justify-between h-navbar-mobile md:h-navbar-md lg:h-navbar-lg xl:h-navbar-xl">
          <Link href="/">
            <BondscapeLogo />
          </Link>
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {RightButton}
            </motion.div>
          </AnimatePresence>
        </div>
        {pathname === "/creator/events" && (
          <div className="flex flex-1 flex-col gap-[24px] w-[70rem] xl:w-[90rem] self-center">
            <EventsHeader
              onPressCreateEvent={() => router.push("/creator/create")}
            />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;

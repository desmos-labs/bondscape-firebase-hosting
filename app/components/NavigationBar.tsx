"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BondscapeLogo from "./BondscapeLogo";
import useBreakpoints from "../hooks/layout/useBreakpoints";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/user/useUser";
import SelectComponent from "@/components/SelectComponent";
import { AnimatePresence, motion } from "framer-motion";
import EventsHeader from "@/components/EventsHeader";
import Tabs from "@/components/Tabs";
import { useActiveTab, useSetActiveTab } from "@/jotai/activeTab";
import CreateEventHeader from "@/components/CreateEventHeader";

interface Props {
  readonly disableNavbarBgInDesktop?: boolean;
  readonly forceNavbarBgVisible?: boolean;
  readonly goBackStatusBar?: boolean;
  readonly detailsStatusBar?: boolean;
  readonly statusBarBackOverride?: () => void;
  readonly editButtonHref?: string;
}

const NavigationBar = ({
  disableNavbarBgInDesktop,
  forceNavbarBgVisible,
  goBackStatusBar,
  detailsStatusBar,
  statusBarBackOverride,
  editButtonHref,
}: Props) => {
  const activeTab = useActiveTab();
  const setActiveTab = useSetActiveTab();
  const [navbarBgVisible, setNavbarBgVisible] = useState(false);
  // Hooks
  const [isMobile, isMd, isDesktop, isBreakpointReady] =
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
      pathname === "/terms"
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
      } transition-colors ease-in-out sticky flex w-full px-xMobile md:px-xMd lg:px-xLg xl:px-xXl`}
    >
      <div className="flex flex-1 flex-col">
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
          <div className="flex flex-1 flex-col gap-[24px] w-[70rem] xl:w-[90rem] self-center mt-4">
            <EventsHeader />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}
        {goBackStatusBar && (
          <div className="flex flex-1 flex-col w-[70rem] xl:w-[90rem] self-center">
            <CreateEventHeader
              editMode={false}
              editButtonHref={undefined}
              statusBarBackOverride={statusBarBackOverride}
            />
          </div>
        )}
        {detailsStatusBar && (
          <div className="flex flex-1 flex-col w-[70rem] xl:w-[90rem] self-center">
            <CreateEventHeader
              editMode={true}
              editButtonHref={editButtonHref}
              statusBarBackOverride={statusBarBackOverride}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;

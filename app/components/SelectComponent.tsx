"use client";
import React, { useCallback, useState } from "react";
import { DesmosProfile } from "../types/desmos";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  useDeleteCachedAccount,
  useSetActiveAccountAddress,
} from "../recoil/accounts";
import {
  useDeleteCachedProfile,
  useSetActiveProfile,
} from "../recoil/profiles";
import { useWeb3AuthClient } from "../recoil/web3auth";

export default function SelectComponent({
  profile,
}: {
  readonly profile: DesmosProfile;
}) {
  const setActiveAccountAddress = useSetActiveAccountAddress();
  const setActiveProfile = useSetActiveProfile();
  const deleteAccount = useDeleteCachedAccount();
  const deleteProfile = useDeleteCachedProfile();
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const web3authClient = useWeb3AuthClient();

  const logoutFromWeb3Auth = useCallback(async () => {
    setActiveAccountAddress(undefined);
    setActiveProfile(undefined);
    deleteAccount(profile.address);
    deleteProfile(profile.address);
    web3authClient?.logout();
    setSubMenuVisible(false);
  }, [
    deleteAccount,
    deleteProfile,
    profile.address,
    setActiveAccountAddress,
    setActiveProfile,
    web3authClient,
  ]);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 justify-center "
        onClick={() => setSubMenuVisible((prev) => !prev)}
      >
        <div className="w-[40px] h-[40px] relative">
          <Image
            alt={"Profile picture"}
            src={profile.profilePicture || "/defaultProfilePicture.png"}
            fill
            className="rounded-[20px] object-cover bg-bondscape-surface"
          />
        </div>
        <div className="text-bondscape-text_neutral_100 hover:text-bondscape-text_neutral_400 transition ease-in-out text-[16px] font-normal leading-normal">
          {profile?.nickname || profile?.dTag}
        </div>
      </button>
      <AnimatePresence>
        {subMenuVisible && (
          <motion.div
            key={"subMenu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute flex flex-col h-[100px] w-[160px] bg-bondscape-surface top-[100%] mt-4 rounded-[8px]"
          >
            <Link
              onClick={() => setSubMenuVisible(false)}
              href={"/creator/myEvents"}
              className="flex flex-row py-[12px] px-[16px] gap-2 border-b-[1px] border-solid border-[#4B4A58]"
            >
              <Image
                alt={"My events icon"}
                src={"/myEventsMenuIcon.png"}
                width={24}
                height={24}
              />
              <div className="text-bondscape-text_neutral_100 hover:text-bondscape-text_neutral_400 transition ease-in-out text-[16px] font-normal leading-normal">
                My Events
              </div>
            </Link>
            <button
              className="flex flex-row py-[12px] px-[16px] gap-2"
              onClick={() => logoutFromWeb3Auth()}
            >
              <Image
                alt={"My events icon"}
                src={"/logoutMenuIcon.png"}
                width={24}
                height={24}
              />
              <div className="text-bondscape-text_neutral_100 hover:text-bondscape-text_neutral_400 transition ease-in-out text-[16px] font-normal leading-normal">
                Logout
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

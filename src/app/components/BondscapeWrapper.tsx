"use client";
import React from "react";
import { useInitWeb3Auth } from "@/hooks/web3Auth/useInitWeb3Auth";

const BondscapeWrapper = ({ children }: React.PropsWithChildren) => {
  useInitWeb3Auth();
  return <>{children}</>;
};

export default BondscapeWrapper;

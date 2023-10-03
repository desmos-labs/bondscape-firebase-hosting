"use client";
import React from "react";
import { useInitWeb3Auth } from "@/hooks/web3Auth/useInitWeb3Auth";
import { SWRConfig } from "swr";
import fetchJson from "@/lib/fetchJson";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { SkeletonTheme } from "react-loading-skeleton";

const BondscapeWrapper = ({ children }: React.PropsWithChildren) => {
  useInitWeb3Auth();
  return (
    <SkeletonTheme baseColor="#353343" highlightColor="#5B5379">
      <StyledComponentsRegistry>
        <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              console.error(err);
            },
          }}
        >
          {children}
        </SWRConfig>
      </StyledComponentsRegistry>
    </SkeletonTheme>
  );
};

export default BondscapeWrapper;

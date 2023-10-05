"use client";
import React from "react";
import { useInitWeb3Auth } from "@/hooks/web3Auth/useInitWeb3Auth";
import { SWRConfig } from "swr";
import fetchJson from "@/lib/fetchJson";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { SkeletonTheme } from "react-loading-skeleton";
import { PrimeReactProvider } from "primereact/api";

const BondscapeWrapper = ({ children }: React.PropsWithChildren) => {
  useInitWeb3Auth();
  return (
    <SkeletonTheme baseColor="#21202A" highlightColor="#35343F">
      <PrimeReactProvider>
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
      </PrimeReactProvider>
    </SkeletonTheme>
  );
};

export default BondscapeWrapper;

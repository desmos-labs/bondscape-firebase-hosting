"use client";
import React from "react";
import { useInitWeb3Auth } from "@/hooks/web3Auth/useInitWeb3Auth";
import { SWRConfig } from "swr";
import fetchJson from "@/lib/fetchJson";
import StyledComponentsRegistry from "@/components/AntdRegistry";

const BondscapeWrapper = ({ children }: React.PropsWithChildren) => {
  useInitWeb3Auth();
  return (
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
  );
};

export default BondscapeWrapper;

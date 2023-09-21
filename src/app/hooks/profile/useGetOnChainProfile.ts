import React from "react";
import useCustomLazyQuery from "@/hooks/graphql/useCustomLazyQuery";
import { DesmosProfile, GQLProfileResult } from "@/types/desmos";
import GetProfileForAddress from "@/services/graphql/queries/desmos/GetProfileForAddress";

/**
 * Hook that provides a function to fetch the profile
 * associated with an address.
 */
const useGetOnChainProfile = () => {
  const [getLazyData] = useCustomLazyQuery<GQLProfileResult>(
    GetProfileForAddress,
    {
      fetchPolicy: "network-only",
    },
  );

  return React.useCallback(
    async (address: string): Promise<DesmosProfile | undefined> => {
      const data = await getLazyData({
        variables: { address },
      });
      if (!data) {
        return undefined;
      }
      return data?.profiles?.length > 0 ? data?.profiles[0] : undefined;
    },
    [getLazyData],
  );
};

export default useGetOnChainProfile;

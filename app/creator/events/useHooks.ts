import { useQuery } from "@apollo/client";
import { GQLEventsResult } from "@/types/event";
import { useMemo, useRef } from "react";
import useUser from "@/hooks/user/useUser";
import GetEvents from "@/services/graphql/queries/bondscape/GetEvents";
import GetMyPastEvents from "@/services/graphql/queries/bondscape/GetMyPastEvents";
import GetMyDraftEvents from "@/services/graphql/queries/bondscape/GetMyDraftEvents";
import GetMyUpcomingEvents from "@/services/graphql/queries/bondscape/GetMyUpcomingEvents";

export const useHooks = (activeTab: number) => {
  const now = useRef(new Date());
  const { user } = useUser();
  const currentQuery = useMemo(() => {
    switch (activeTab) {
      case 0:
        return GetEvents;
      case 1:
        return GetMyPastEvents;
      case 2:
        return GetMyDraftEvents;
      default:
        return GetMyUpcomingEvents;
    }
  }, [activeTab]);

  const { data, loading, fetchMore } = useQuery<GQLEventsResult>(currentQuery, {
    variables: {
      creatorAddress: user?.profile?.address || "",
      currentDate: now.current.toISOString(),
      offset: 0,
      limit: 100,
    },
  });

  return {
    data,
    loading,
    fetchMore,
  };
};

export default useHooks;

import { GQLEventsResult } from "@/types/event";
import { useEffect, useMemo, useRef, useState } from "react";
import useUser from "@/hooks/user/useUser";
import GetMyPastEvents from "@/services/graphql/queries/bondscape/GetMyPastEvents";
import GetMyDraftEvents from "@/services/graphql/queries/bondscape/GetMyDraftEvents";
import GetMyUpcomingEvents from "@/services/graphql/queries/bondscape/GetMyUpcomingEvents";
import { useInView } from "react-intersection-observer";
import { useActiveTab } from "@/recoil/activeTab";
import GetMyLiveEvents from "@/services/graphql/queries/bondscape/GetMyLiveEvents";
import { useQuery } from "@apollo/client";

export const useHooks = () => {
  const activeTab = useActiveTab();
  const [fetchingMore, setFetchingMore] = useState(false);
  const now = useRef(new Date());
  const { ref: lastElementRef, inView: lastElementInView } = useInView();
  const { user } = useUser();
  const currentQuery = useMemo(() => {
    switch (activeTab) {
      case 0:
        return GetMyLiveEvents;
      case 1:
        return GetMyUpcomingEvents;
      case 2:
        return GetMyPastEvents;
      case 3:
        return GetMyDraftEvents;
      default:
        return GetMyUpcomingEvents;
    }
  }, [activeTab]);

  const queryVariables = useMemo(() => {
    return {
      creatorAddress: user?.profile?.address || "",
      currentDate: now.current.toISOString(),
      offset: 0,
      limit: 6,
    };
  }, [user]);

  const { data, loading, fetchMore, networkStatus, client } =
    useQuery<GQLEventsResult>(currentQuery, {
      variables: queryVariables,
      fetchPolicy: "cache-and-network",
    });

  // This is a workaround to avoid the loading state when the query is cached
  const isActuallyLoading =
    loading &&
    !client.readQuery({
      query: currentQuery,
      variables: queryVariables,
    });

  useEffect(() => {
    if (!data) return;
    if (lastElementInView && data.events.length === 6) {
      setFetchingMore(true);
      fetchMore({
        variables: { offset: data.events.length },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!prev || !prev.events) {
            return {
              events: [],
            };
          }
          if (!fetchMoreResult.events) return prev;
          if (fetchMoreResult.events.length === 0) return prev;
          return {
            events: [...prev.events, ...fetchMoreResult.events],
          };
        },
      }).then(() => setFetchingMore(false));
    }
  }, [data, data?.events.length, fetchMore, lastElementInView]);

  return {
    data,
    isActuallyLoading,
    networkStatus,
    fetchingMore,
    lastElementRef,
  };
};

export default useHooks;

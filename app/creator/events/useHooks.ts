import { useQuery } from "@apollo/client";
import { GQLEventsResult } from "@/types/event";
import { useEffect, useMemo, useRef, useState } from "react";
import useUser from "@/hooks/user/useUser";
import GetMyPastEvents from "@/services/graphql/queries/bondscape/GetMyPastEvents";
import GetMyDraftEvents from "@/services/graphql/queries/bondscape/GetMyDraftEvents";
import GetMyUpcomingEvents from "@/services/graphql/queries/bondscape/GetMyUpcomingEvents";
import { useInView } from "react-intersection-observer";

export const useHooks = (activeTab: number) => {
  const [fetchingMore, setFetchingMore] = useState(false);
  const now = useRef(new Date());
  const { ref: lastElementRef, inView } = useInView();
  const { user } = useUser();
  const currentQuery = useMemo(() => {
    switch (activeTab) {
      case 0:
        return GetMyUpcomingEvents;
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
      limit: 6,
    },
  });

  useEffect(() => {
    if (!data) return;
    if (inView) {
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
  }, [data, data?.events.length, fetchMore, inView]);

  return {
    data,
    loading,
    fetchingMore,
    lastElementRef,
  };
};

export default useHooks;

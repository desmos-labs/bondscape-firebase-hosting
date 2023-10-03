import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Event } from "@/types/event";
import { useCallback } from "react";

export const eventsState = atom<Event[]>({
  key: "events",
  default: [],
});

export const useEvents = () => useRecoilValue(eventsState);

export const useSetEvents = () => useSetRecoilState(eventsState);

export const useGetEvent = () => {
  const liveEvents = useEvents();
  return useCallback(
    (eventId: string) => {
      return liveEvents.find((event) => event.id === eventId);
    },
    [liveEvents],
  );
};

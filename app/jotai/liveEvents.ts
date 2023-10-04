import { atomWithStorage } from "jotai/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { Event } from "@/types/event";
import { useCallback } from "react";

export const eventsState = atomWithStorage<Event[]>("events", []);

export const useEvents = () => useAtomValue(eventsState);

export const useSetEvents = () => useSetAtom(eventsState);

export const useGetEvent = () => {
  const liveEvents = useEvents();
  return useCallback(
    (eventId: string) => {
      return liveEvents.find((event) => event.id === eventId);
    },
    [liveEvents],
  );
};

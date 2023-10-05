"use client";
import { Event } from "@/types/event";
import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const eventsState = atomWithStorage<Event[]>("events", []);

export const useEvents = () => useAtomValue(eventsState);

export const useSetEvents = () => useSetAtom(eventsState);

export const useGetEvent = () => {
  const events = useEvents();
  return useCallback(
    (eventId: string) => {
      return events.find((event) => event.id === eventId);
    },
    [events],
  );
};

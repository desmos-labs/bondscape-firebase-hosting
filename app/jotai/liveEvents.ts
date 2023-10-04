"use client";
import { Event } from "@/types/event";
import { useCallback } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";

export const eventsState = atom<Event[]>([]);

export const useEvents = () => useAtomValue(eventsState);

export const useSetEvents = () => useSetAtom(eventsState);

export const useGetEvent = () => {
  const events = useEvents();
  return useCallback(
    (eventId: string) => {
      console.log("eventId Inside", eventId);
      return events.find((event) => event.id === eventId);
    },
    [events],
  );
};

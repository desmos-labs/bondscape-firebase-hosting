"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";

export const deleteEventModalState = atom<{
  eventId: string;
  visible: boolean;
}>({
  eventId: "",
  visible: false,
});

export const useDeleteEventModal = () => useAtomValue(deleteEventModalState);

export const useSetDeleteEventModal = () => useSetAtom(deleteEventModalState);

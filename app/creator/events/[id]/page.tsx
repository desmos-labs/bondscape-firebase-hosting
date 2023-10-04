"use client";
import React, { useEffect, useMemo, useState } from "react";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import { useRouter } from "next/navigation";
import { useGetEvent } from "@/jotai/liveEvents";
import useFormatDateToTZ from "@/hooks/timeformat/useFormatDateToTZ";
import useGetGooglePlace from "@/hooks/events/useGetGooglePlace";
import { Event } from "@/types/event";

export default function EventDetails({ params }: { params: any }) {
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isMobile, isMd] = useBreakpoints();
  const router = useRouter();
  const getEvent = useGetEvent();
  const { getEventPeriodExtended } = useFormatDateToTZ();
  const { googlePlace } = useGetGooglePlace(selectedEvent?.googlePlaceId);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!params) return;
    console.log(params);
    if (params.id) {
      const event = getEvent("499e241f70d54e3ea70a76f0ddfceaaf");
      console.log("event", event);
    }
  }, [getEvent, params]);

  const organizers = useMemo(() => {
    if (selectedEvent && selectedEvent?.organizers) {
      return selectedEvent?.organizers
        .map(
          (organizer) =>
            organizer.organizer?.nickname ??
            organizer.organizer?.dTag ??
            organizer.organizerAddress,
        )
        .join(", ");
    }
  }, [selectedEvent]);

  if (isMobile || isMd) {
    return (
      <div className="flex flex-1 h-screen justify-center items-center px-xMobile">
        <div className="text-white">
          This page is not supported on mobile devices. Please use a desktop
        </div>
      </div>
    );
  }

  return <div>{selectedEvent?.name}</div>;
}

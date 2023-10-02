"use client";
import React, { useMemo } from "react";
import { Event } from "@/types/event";
import Image from "next/image";
import useFormatDateToTZ from "@/hooks/timeformat/useFormatDateToTZ";

interface Props {
  event: Event;
  isLive?: boolean;
  lastItemRef: any;
}

const EventComponent = ({ event, isLive, lastItemRef }: Props) => {
  const { getEventPeriod } = useFormatDateToTZ();

  const CoverPictureComponent = useMemo(() => {
    return (
      <Image
        id={event.id}
        key={event.id}
        alt={"Event image"}
        src={event.coverPic || "/defaultCoverPicture.png"}
        fill
        sizes="(max-width: 1920px) 50vw, (max-width: 1200px) 40vw, 33vw"
        className="rounded-[12px] w-full h-full top-0 left-0 transition-opacity opacity-[0] duration-[1s] object-cover"
        onLoadingComplete={(image) => {
          image.classList.remove("opacity-[0]");
        }}
      />
    );
  }, [event.coverPic, event.id]);
  return (
    <div
      className={`flex flex-col w-full p-[24px] rounded-[24px] bg-bondscape-surface gap-[1rem] bondscape-box-shadow-event-card`}
      ref={lastItemRef}
    >
      <div className="relative w-full h-[16.5rem] xl:h-[23.5rem]">
        {CoverPictureComponent}
      </div>
      <div className="flex flex-1 flex-row justify-between items-center">
        <div className="flex flex-col gap-[0.25rem]">
          <div className="text-[20px] font-semibold text-bondscape-text_neutral_900 leading-[1.75rem]">
            {event.name}
          </div>
          <div className="text-[14px] font-semibold text-bondscape-primary leading-[1.3rem]">
            {getEventPeriod(event.startDate, event.endDate)}
          </div>
        </div>
        {isLive && (
          <div className="flex flex-row items-center gap-1">
            <div className="w-[10px] h-[10px] rounded-[5px] bg-feedback-success" />
            <div className="text-[14px] font-semibold text-feedback-success">
              LIVE
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventComponent;

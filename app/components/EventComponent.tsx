"use client";
import useFormatDateToTZ from "@/hooks/timeformat/useFormatDateToTZ";
import { useSetDeleteEventModal } from "@/jotai/deleteEventModal";
import { Event } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { classNames } from "primereact/utils";
import React, { useMemo, useRef } from "react";

interface Props {
  event: Event;
  isLive?: boolean;
  lastItemRef: any;
}

const EventComponent = ({ event, isLive, lastItemRef }: Props) => {
  const { getEventPeriod } = useFormatDateToTZ();
  const setDeleteEventModalOpen = useSetDeleteEventModal();
  const opRef = useRef<OverlayPanel>(null);
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
    <Link
      href={`/creator/events/${event.id}`}
      className={`flex flex-col w-full p-[24px] rounded-[24px] bg-bondscape-surface hover:bg-[#28282D] gap-[1rem] bondscape-box-shadow-event-card transition ease-in-out min-w-[540px] xl:min-w-[695px]`}
      ref={lastItemRef}
    >
      <div className="relative w-full h-[16.5rem] xl:h-[23.5rem]">
        {CoverPictureComponent}
      </div>
      <div className="flex flex-1 w-full flex-row justify-between items-center">
        <div className="flex flex-col gap-[0.25rem] items-start">
          <div className="text-[20px] font-semibold text-bondscape-text_neutral_900 leading-[1.75rem]">
            {event.name}
          </div>
          <div className="text-[14px] font-semibold text-bondscape-primary leading-[1.3rem]">
            {getEventPeriod(event.startDate, event.endDate)}
          </div>
        </div>
        <div>
          {isLive ? (
            <div className="flex flex-row items-center gap-1">
              <div className="w-[10px] h-[10px] rounded-[5px] bg-feedback-success" />
              <div className="text-[14px] font-semibold text-feedback-success">
                LIVE
              </div>
            </div>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                opRef.current && opRef.current.toggle(e);
              }}
              text
              pt={{
                root: {
                  className: "p-0",
                },
              }}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="More-vertical">
                  <path
                    id="Union"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.75 5.5C13.75 4.5335 12.9665 3.75 12 3.75C11.0335 3.75 10.25 4.5335 10.25 5.5C10.25 6.4665 11.0335 7.25 12 7.25C12.9665 7.25 13.75 6.4665 13.75 5.5ZM13.75 12.5C13.75 11.5335 12.9665 10.75 12 10.75C11.0335 10.75 10.25 11.5335 10.25 12.5C10.25 13.4665 11.0335 14.25 12 14.25C12.9665 14.25 13.75 13.4665 13.75 12.5ZM13.75 19.5C13.75 18.5335 12.9665 17.75 12 17.75C11.0335 17.75 10.25 18.5335 10.25 19.5C10.25 20.4665 11.0335 21.25 12 21.25C12.9665 21.25 13.75 20.4665 13.75 19.5Z"
                    fill="#F6F6F7"
                  />
                </g>
              </svg>
            </Button>
          )}
        </div>
      </div>
      <OverlayPanel
        ref={opRef}
        className={
          "bg-bondscape-text_neutral_100 before:border-none after:border-none"
        }
        pt={{
          root: {
            className: classNames("bg-bondscape-text_neutral_100"),
          },
          content: {
            className: "p-1",
          },
        }}
      >
        <div>
          <Link
            onClick={() => opRef.current && opRef.current.hide()}
            href={`/creator/create/${event.id}`}
            className="flex flex-row py-[12px] px-[16px] gap-2 border-b-[1px] border-solid border-[#4B4A58]"
          >
            <Image
              alt={"My events icon"}
              src={"/editEventIcon.png"}
              width={24}
              height={24}
            />
            <div className="text-bondscape-text_neutral_900 hover:text-bondscape-text_neutral_700 transition ease-in-out text-[16px] font-normal leading-normal">
              Edit Event
            </div>
          </Link>
          <button
            className="flex flex-row py-[12px] px-[16px] gap-2"
            onClick={(e) => {
              e.preventDefault();
              opRef.current && opRef.current.hide();
              setDeleteEventModalOpen({
                visible: true,
                eventId: event.id,
              });
            }}
          >
            <Image
              alt={"My events icon"}
              src={"/trashIcon.png"}
              width={24}
              height={24}
            />
            <div className="text-bondscape-text_neutral_900 hover:text-bondscape-text_neutral_700 transition ease-in-out text-[16px] font-normal leading-normal">
              Delete Event
            </div>
          </button>
        </div>
      </OverlayPanel>
    </Link>
  );
};

export default EventComponent;

"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  events: number;
}

const EventComponentSkeleton = ({ events }: Props) => {
  return Array(events)
    .fill(0)
    .map((_, index) => {
      return (
        <div
          key={index}
          className={`flex flex-col w-full p-[24px] rounded-[24px] bg-bondscape-surface gap-[1rem] bondscape-box-shadow-event-card min-w-[540px] xl:min-w-[695px]`}
        >
          <div className="relative w-full h-[16.5rem] xl:h-[23.5rem]">
            <Skeleton className="w-full h-full" borderRadius={12} />
          </div>
          <div className="flex flex-1 flex-row justify-between items-center">
            <div className="flex flex-col gap-[0.25rem]">
              <div className="w-[20rem]">
                <Skeleton />
              </div>
              <div className="w-[10rem]">
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      );
    });
};

export default EventComponentSkeleton;

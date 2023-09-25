"use client";
import React, { useMemo } from "react";
import EventComponent from "@/components/EventComponent";
import { Event } from "@/types/event";

interface Props {
  readonly activeTab: number;
  readonly events: Event[] | undefined;
}

export default function EventsTabs({ activeTab, events }: Props) {
  const emptyText = useMemo(() => {
    switch (activeTab) {
      case 0:
        return "No upcoming events";
      case 1:
        return "No past events";
      default:
        return "No events";
    }
  }, [activeTab]);

  if (events?.length === 0) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center mt-48 gap-6">
        <div>
          <svg
            width="201"
            height="200"
            viewBox="0 0 201 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="100.569"
              cy="100"
              rx="99.569"
              ry="100"
              fill="#28282D"
            />
            <path
              d="M55 55C55 50.5817 58.5817 47 63 47H137.217C141.636 47 145.217 50.5817 145.217 55V144.107C145.217 148.526 141.636 152.107 137.217 152.107H63C58.5817 152.107 55 148.526 55 144.107V55Z"
              fill="#5B5379"
            />
            <path
              d="M63.7588 61.7589C63.7588 58.4452 66.4451 55.7589 69.7588 55.7589H131.334C134.648 55.7589 137.334 58.4452 137.334 61.7589V123.334C137.334 126.648 134.648 129.334 131.334 129.334H69.7588C66.4451 129.334 63.7588 126.648 63.7588 123.334V61.7589Z"
              fill="#9886E7"
            />
            <path
              d="M70.7666 73.7148C70.7666 72.5054 71.747 71.525 72.9563 71.525H119.379C120.588 71.525 121.569 72.5054 121.569 73.7148C121.569 74.9241 120.588 75.9045 119.379 75.9045H72.9563C71.747 75.9045 70.7666 74.9241 70.7666 73.7148Z"
              fill="#353343"
            />
            <path
              d="M70.7666 86.8532C70.7666 85.6438 71.747 84.6635 72.9563 84.6635H130.765C131.975 84.6635 132.955 85.6438 132.955 86.8532C132.955 88.0626 131.975 89.0429 130.765 89.0429H72.9563C71.747 89.0429 70.7666 88.0626 70.7666 86.8532Z"
              fill="#353343"
            />
            <path
              d="M70.7666 99.9917C70.7666 98.7824 71.747 97.802 72.9563 97.802H112.372C113.581 97.802 114.561 98.7824 114.561 99.9917C114.561 101.201 113.581 102.181 112.372 102.181H72.9563C71.747 102.181 70.7666 101.201 70.7666 99.9917Z"
              fill="#353343"
            />
          </svg>
        </div>
        <div className="w-80 text-center text-zinc-200 text-base font-normal font-['Poppins'] leading-normal">
          {emptyText}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 justify-center gap-[40px]">
      {events?.map((event, index) => {
        return <EventComponent key={index} event={event} index={index} />;
      })}
    </div>
  );
}

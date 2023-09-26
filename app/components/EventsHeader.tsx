import React from "react";

interface Props {
  readonly onPressCreateEvent: () => void;
}

const EventsHeader = ({ onPressCreateEvent }: Props) => {
  return (
    <div className="inline-flex justify-between items-center gap-96">
      <div className="text-neutral-100 text-3xl font-semibold font-['Poppins'] leading-10">
        My Events
      </div>
      <div className="justify-start items-start inline-flex">
        <button
          className="flex flex-row py-1 rounded-full items-center justify-center gap-2 text-bondscape-primary fill-bondscape-primary hover:text-[#654A9C] hover:fill-[#654A9C] transition ease-in-out"
          onClick={onPressCreateEvent}
        >
          <div className="w-4 h-4 p-0.5 justify-center items-center flex">
            <div className="w-3 h-3 relative">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 0.843185C7.27614 0.843185 7.5 1.06704 7.5 1.34318L7.5 12.6569C7.5 12.933 7.27614 13.1569 7 13.1569C6.72386 13.1569 6.5 12.933 6.5 12.6569L6.5 1.34318C6.5 1.06704 6.72386 0.843185 7 0.843185Z"
                  strokeLinecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.1562 6.99997C13.1562 6.72383 12.9323 6.49997 12.6562 6.49997L1.34247 6.49997C1.06632 6.49997 0.842466 6.72383 0.842467 6.99997C0.842466 7.27611 1.06632 7.49997 1.34247 7.49997L12.6562 7.49997C12.9323 7.49997 13.1562 7.27611 13.1562 6.99997Z"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center align-middle text-base font-semibold">
            Create Event
          </div>
        </button>
      </div>
    </div>
  );
};

export default EventsHeader;

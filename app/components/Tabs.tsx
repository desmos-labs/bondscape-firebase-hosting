"use client";
import React from "react";

interface Props {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const MyComponent = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="w-64 h-11 py-2 justify-start items-start gap-12 inline-flex">
      <button
        className="flex-col justify-start items-center gap-1 inline-flex"
        onClick={() => setActiveTab(0)}
      >
        <div
          className={` ${
            activeTab === 0 ? "text-neutral-100" : "text-bondscape-inactiveTab"
          } self-stretch text-center text-base font-semibold leading-normal`}
        >
          Upcoming
        </div>
        {activeTab === 0 && (
          <div className="self-stretch h-0.5 bg-neutral-100 rounded" />
        )}
      </button>
      <button
        className="flex-col justify-start items-center gap-1 inline-flex"
        onClick={() => setActiveTab(1)}
      >
        <div
          className={` ${
            activeTab === 1 ? "text-neutral-100" : "text-bondscape-inactiveTab"
          } self-stretch text-center text-base font-semibold leading-normal`}
        >
          Past
        </div>
        {activeTab === 1 && (
          <div className="self-stretch h-0.5 bg-neutral-100 rounded" />
        )}
      </button>
      <button
        className="flex-col justify-start items-center gap-1 inline-flex"
        onClick={() => setActiveTab(2)}
      >
        <div
          className={` ${
            activeTab === 2 ? "text-neutral-100" : "text-bondscape-inactiveTab"
          } self-stretch text-center text-base font-semibold leading-normal`}
        >
          Drafts
        </div>
        {activeTab === 2 && (
          <div className="self-stretch h-0.5 bg-neutral-100 rounded" />
        )}
      </button>
    </div>
  );
};

export default MyComponent;

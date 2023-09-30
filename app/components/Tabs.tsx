"use client";
import React, { useCallback } from "react";

interface Props {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const Tabs = ({ activeTab, setActiveTab }: Props) => {
  const setActiveTabAndScrollToTop = useCallback(
    (tab: number) => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    },
    [setActiveTab],
  );

  return (
    <div className="w-64 h-11 py-2 justify-start items-start gap-12 inline-flex">
      <button
        className="flex-col justify-start items-center gap-1 inline-flex"
        onClick={() => setActiveTabAndScrollToTop(0)}
      >
        <div
          className={` ${
            activeTab === 0 ? "text-neutral-100" : "text-bondscape-inactiveTab"
          } self-stretch text-center text-base font-semibold leading-normal`}
        >
          Live
        </div>
        {activeTab === 0 && (
          <div className="self-stretch h-0.5 bg-neutral-100 rounded" />
        )}
      </button>
      <button
        className="flex-col justify-start items-center gap-1 inline-flex"
        onClick={() => setActiveTabAndScrollToTop(1)}
      >
        <div
          className={` ${
            activeTab === 1 ? "text-neutral-100" : "text-bondscape-inactiveTab"
          } self-stretch text-center text-base font-semibold leading-normal`}
        >
          Upcoming
        </div>
        {activeTab === 1 && (
          <div className="self-stretch h-0.5 bg-neutral-100 rounded" />
        )}
      </button>
      <button
        className="flex-col justify-start items-center gap-1 inline-flex"
        onClick={() => setActiveTabAndScrollToTop(2)}
      >
        <div
          className={` ${
            activeTab === 2 ? "text-neutral-100" : "text-bondscape-inactiveTab"
          } self-stretch text-center text-base font-semibold leading-normal`}
        >
          Past
        </div>
        {activeTab === 2 && (
          <div className="self-stretch h-0.5 bg-neutral-100 rounded" />
        )}
      </button>
      <button
        className="flex-col justify-start items-center gap-1 inline-flex"
        onClick={() => setActiveTabAndScrollToTop(3)}
      >
        <div
          className={` ${
            activeTab === 3 ? "text-neutral-100" : "text-bondscape-inactiveTab"
          } self-stretch text-center text-base font-semibold leading-normal`}
        >
          Drafts
        </div>
        {activeTab === 3 && (
          <div className="self-stretch h-0.5 bg-neutral-100 rounded" />
        )}
      </button>
    </div>
  );
};

export default Tabs;

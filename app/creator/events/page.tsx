"use client";
import EventsTabs from "@/creator/events/EventsTabs";
import useHooks from "@/creator/events/useHooks";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import { useActiveTab } from "@/jotai/activeTab";
import {
  useDeleteEventModal,
  useSetDeleteEventModal,
} from "@/jotai/deleteEventModal";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import React from "react";
import { PuffLoader } from "react-spinners";
import bgOverlay from "../../../public/eventsBgOverlay.png";
import MainLayout from "../../layouts/MainLayout";

export default function Events() {
  const activeTab = useActiveTab();
  const deleteEventModal = useDeleteEventModal();
  const setDeleteEventModal = useSetDeleteEventModal();
  const [isMobile, isMd] = useBreakpoints();
  const {
    data,
    isActuallyLoading,
    fetchingMore,
    lastElementRef,
    deleteEvent,
    deletingEvent,
  } = useHooks();

  if (isMobile || isMd) {
    return (
      <div className="flex flex-1 h-screen justify-center items-center px-xMobile">
        <div className="text-white">
          This page is not supported on mobile devices. Please use a desktop
        </div>
      </div>
    );
  }

  return (
    <MainLayout
      customClasses={"bg-[#020014]"}
      backgroundOverlay={bgOverlay}
      forceNavbarBgVisible={true}
    >
      <div className="lg:pb-12 xl:pb-24 max-w-[70rem] xl:max-w-[90rem] mx-auto mt-[32px]">
        <div className="relative flex flex-1 flex-col">
          <EventsTabs
            isLoading={isActuallyLoading}
            activeTab={activeTab}
            events={data?.events}
            lastElementRef={lastElementRef}
          />
          {fetchingMore && (
            <div className="flex justify-center items-center mt-12">
              <PuffLoader size={100} color={"white"} />
            </div>
          )}
        </div>
      </div>
      <Dialog
        draggable={false}
        modal={true}
        blockScroll={true}
        closable={false}
        header={"Delete Event"}
        visible={deleteEventModal.visible}
        onHide={() =>
          setDeleteEventModal({
            visible: false,
            eventId: "",
          })
        }
        pt={{
          header: {
            className: classNames("text-center"),
          },
        }}
      >
        <div className="text-base text-center text-bondscape-text_neutral_900 mb-10">
          Are you sure you want to delete this event?
        </div>
        <div className="flex flex-1 flex-row justify-center gap-6">
          <Button
            outlined
            disabled={deletingEvent}
            label={"No"}
            className="h-11 w-52"
            onClick={() =>
              setDeleteEventModal({
                visible: false,
                eventId: "",
              })
            }
          />
          <Button
            label={"Yes, Delete"}
            className="h-11 w-52"
            disabled={deletingEvent}
            loading={deletingEvent}
            onClick={async () => {
              await deleteEvent(deleteEventModal.eventId);
              setDeleteEventModal({
                visible: false,
                eventId: "",
              });
            }}
          />
        </div>
      </Dialog>
    </MainLayout>
  );
}

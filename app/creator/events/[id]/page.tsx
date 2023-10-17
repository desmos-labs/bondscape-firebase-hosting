"use client";
import BondscapeButton from "@/components/BondscapeButton";
import useGetGooglePlace from "@/hooks/events/useGetGooglePlace";
import useCustomLazyQuery from "@/hooks/graphql/useCustomLazyQuery";
import useBreakpoints from "@/hooks/layout/useBreakpoints";
import useFormatDateToTZ from "@/hooks/timeformat/useFormatDateToTZ";
import MainLayout from "@/layouts/MainLayout";
import GetEventJoinLink from "@/services/axios/requests/GetEventJoinLink";
import GetQrCode from "@/services/axios/requests/GetQrCode";
import GetEventById from "@/services/graphql/queries/bondscape/GetEventById";
import { Event, GQLEventsResult } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressBar } from "primereact/progressbar";
import { classNames } from "primereact/utils";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function EventDetails({ params }: { params: any }) {
  // States
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [eventQrCode, setEventQrCode] = useState("");
  const [generatingQr, setGeneratingQr] = useState(false);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);

  // Hooks
  const [isMobile, isMd] = useBreakpoints();
  const router = useRouter();
  const [getEventById] = useCustomLazyQuery<GQLEventsResult>(GetEventById);
  const { getEventPeriodExtended } = useFormatDateToTZ();
  const { googlePlace } = useGetGooglePlace(selectedEvent?.googlePlaceId);

  // Callbacks

  const generateQrCode = useCallback(async (url: string) => {
    const result = await GetQrCode(url, "url");
    if (result.isOk()) {
      setEventQrCode(result.value.url);
    }
  }, []);

  const toDataURL = useCallback(async () => {
    setGeneratingQr(true);
    try {
      const response = await fetch(eventQrCode);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } finally {
      setGeneratingQr(false);
    }
  }, [eventQrCode]);

  const saveQrCode = useCallback(async () => {
    const a = document.createElement("a");
    a.href = await toDataURL();
    a.download = `bondscape_${selectedEvent?.name}_qr_code.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [selectedEvent?.name, toDataURL]);

  const loadEvent = useCallback(
    async (eventId: string) => {
      const result = await getEventById({
        variables: {
          eventId,
        },
      });
      if (result) {
        setSelectedEvent(result.events[0]);
      }
    },
    [getEventById],
  );

  // Effects

  useEffect(() => {
    if (selectedEvent) {
      GetEventJoinLink(selectedEvent.id).then((result) => {
        if (result.isOk()) {
          generateQrCode(result.value);
        }
      });
    }
  }, [generateQrCode, selectedEvent]);

  useEffect(() => {
    const eventId = params.id as string;
    loadEvent(eventId);
  }, [loadEvent, params.id, router]);

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

  return (
    <MainLayout
      customClasses={"bg-[#020014]"}
      forceNavbarBgVisible={true}
      statusBarMode={"editDetails"}
      editButtonHref={`/creator/create/${params.id}`}
    >
      <div className="flex flex-1 flex-col lg:pb-12 xl:pb-24 max-w-[51rem] xl:max-w-[70rem] mx-auto mt-[32px] gap-[24px]">
        <div className="flex flex-1 flex-col gap-[12px] bg-bondscape-surface p-[24px] rounded-[16px]">
          <div className="text-2xl font-semibold text-bondscape-text_neutral_900">
            Event Check-in
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="text-bondscape-text_neutral_900 text-base">
              Save this QR and shows it to attendees at the event to let them
              join the memories creation!
            </div>
            {selectedEvent && (
              <BondscapeButton
                textClassName="text-sm"
                className="w-[165px] px-[20px] py-[10px] rounded-[10px] z-4 h-10"
                loading={false}
                text={"Show QR Code"}
                onClick={() => setQrCodeVisible(true)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-bondscape-surface p-[24px] rounded-[16px]">
          <div className="relative w-[48rem] h-[27rem] xl:w-[67rem] xl:h-[37.7rem]">
            {selectedEvent ? (
              <Image
                id={selectedEvent?.id}
                key={selectedEvent?.id}
                alt={"Event image"}
                src={selectedEvent?.coverPic || "/defaultCoverPicture.png"}
                fill
                sizes="(max-width: 1920px) 50vw, (max-width: 1200px) 40vw, 33vw"
                className="rounded-[12px] w-full h-full top-0 left-0 transition-opacity opacity-[0] duration-[1s] object-cover"
                onLoadingComplete={(image) => {
                  image.classList.remove("opacity-[0]");
                }}
              />
            ) : (
              <Skeleton className="w-full h-full rounded-[12px]" />
            )}
          </div>
          <div className="text-3xl font-semibold text-bondscape-text_neutral_900 mt-6 mb-4">
            {selectedEvent?.name ?? <Skeleton width={500} />}
          </div>
          {selectedEvent ? (
            <div className="flex flex-1 flex-row">
              <div className="flex justify-center items-center">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <g id="Profile Circle">
                    <path
                      id="Vector (Stroke)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.99935 2.1875C4.74215 2.1875 1.29102 5.63864 1.29102 9.89583C1.29102 11.7248 1.92745 13.4044 2.99192 14.7264C3.65362 13.4648 4.97554 12.6042 6.49935 12.6042H11.4993C13.0232 12.6042 14.3451 13.4648 15.0068 14.7264C16.0713 13.4044 16.7077 11.7248 16.7077 9.89583C16.7077 5.63864 13.2565 2.1875 8.99935 2.1875ZM14.0686 15.703C13.7094 14.6285 12.6942 13.8542 11.4993 13.8542H6.49935C5.30446 13.8542 4.28927 14.6285 3.93007 15.703C5.28562 16.8874 7.0582 17.6042 8.99935 17.6042C10.9405 17.6042 12.7131 16.8874 14.0686 15.703ZM0.0410156 9.89583C0.0410156 4.94828 4.0518 0.9375 8.99935 0.9375C13.9469 0.9375 17.9577 4.94828 17.9577 9.89583C17.9577 12.4362 16.8994 14.7305 15.2014 16.3601C13.5924 17.9042 11.4062 18.8542 8.99935 18.8542C6.59253 18.8542 4.40629 17.9042 2.79727 16.3601C1.09926 14.7305 0.0410156 12.4362 0.0410156 9.89583ZM8.99935 4.6875C7.50358 4.6875 6.29102 5.90006 6.29102 7.39583C6.29102 8.8916 7.50358 10.1042 8.99935 10.1042C10.4951 10.1042 11.7077 8.8916 11.7077 7.39583C11.7077 5.90006 10.4951 4.6875 8.99935 4.6875ZM5.04102 7.39583C5.04102 5.20971 6.81322 3.4375 8.99935 3.4375C11.1855 3.4375 12.9577 5.20971 12.9577 7.39583C12.9577 9.58196 11.1855 11.3542 8.99935 11.3542C6.81322 11.3542 5.04102 9.58196 5.04102 7.39583Z"
                      fill="#BCBBC4"
                    />
                  </g>
                </svg>
              </div>
              <div className="flex flex-1 flex-row text-base">
                <div className="text-bondscape-text_neutral_700">
                  Organized by
                </div>
                <div className="font-semibold text-bondscape-text_neutral_900 text-base ml-1">
                  {organizers}
                </div>
              </div>
            </div>
          ) : (
            <Skeleton width={400} />
          )}
          <div className="h-px bg-zinc-600 my-[40px]" />
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-1 flex-row justify-between">
              <div className="flex basis-1/2 flex-row gap-2 items-center">
                <div>
                  <Image
                    width={40}
                    height={40}
                    alt={"calendar icon"}
                    src={"/eventDetailsCalendarBigIcon.png"}
                  />
                </div>
                <div>
                  <div className="text-base font-semibold text-bondscape-text_neutral_900">
                    {selectedEvent ? (
                      getEventPeriodExtended(
                        selectedEvent?.startDate,
                        selectedEvent?.endDate,
                      ).date
                    ) : (
                      <Skeleton width={300} />
                    )}
                  </div>
                  <div className="text-sm text-bondscape-text_neutral_700">
                    {selectedEvent ? (
                      getEventPeriodExtended(
                        selectedEvent?.startDate,
                        selectedEvent?.endDate,
                      ).time
                    ) : (
                      <Skeleton width={200} />
                    )}
                  </div>
                </div>
              </div>
              <button
                className="flex basis-1/2 flex-row gap-2 items-center"
                onClick={() =>
                  googlePlace?.url &&
                  window.open(googlePlace.url, "_blank", "noreferrer")
                }
              >
                <div>
                  <Image
                    width={40}
                    height={40}
                    alt={"calendar icon"}
                    src={"/eventDetailsLocationIcon.png"}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-base font-semibold text-bondscape-text_neutral_900">
                    {selectedEvent ? (
                      googlePlace?.name
                    ) : (
                      <Skeleton width={300} />
                    )}
                  </div>
                  <div className="text-sm text-bondscape-text_neutral_700">
                    {selectedEvent ? (
                      googlePlace?.formattedAddress
                    ) : (
                      <Skeleton width={200} />
                    )}
                  </div>
                </div>
              </button>
            </div>
            <div>
              <div className="flex flex-row gap-3 items-center">
                <Image
                  width={40}
                  height={40}
                  alt={"calendar icon"}
                  src={"/eventDetailsLinkIcon.png"}
                />
                <Link
                  href={selectedEvent?.website || ""}
                  className="text-[#2F8FFF]"
                >
                  {selectedEvent?.website ?? <Skeleton width={300} />}
                </Link>
              </div>
            </div>
          </div>
          <div className="h-px bg-zinc-600 my-[40px]" />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-2xl font-semibold text-bondscape-text_neutral_900">
                Description
              </div>
              <div className="text-base text-bondscape-text_neutral_800 mt-3">
                {selectedEvent?.description ?? (
                  <Skeleton width={700} count={3} />
                )}
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-bondscape-text_neutral_900 mt-6">
                Tags
              </div>
              <div className="flex flex-row flex-wrap gap-2 mt-3">
                {selectedEvent ? (
                  selectedEvent?.tags?.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center justify-center px-5 py-2 bg-bondscape-text_neutral_100 rounded-[100px] text-bondscape-text_neutral_600 text-sm"
                    >
                      {tag}
                    </div>
                  ))
                ) : (
                  <Skeleton width={500} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[12px] bg-bondscape-surface p-[24px] rounded-[16px]">
          <div className="text-2xl font-semibold text-bondscape-text_neutral_900">
            Tickets
          </div>
          <div className="grid grid-cols-2 gap-4">
            {selectedEvent?.ticketsCategories?.map((ticketCategory) => {
              return (
                <div
                  key={ticketCategory.id}
                  className="flex flex-col bg-bondscape-text_neutral_100 p-6 basis-1/2 rounded-[16px]"
                >
                  <div className="text-bondscape-text_neutral_900 text-lg font-semibold leading-relaxed mb-4">
                    {ticketCategory.name}
                  </div>
                  <div className="flex flex-row gap-2 items-center mb-2">
                    <div className="relative">
                      <Image
                        alt={"Tickets icon"}
                        src={"/eventDetailsTicketIcon.png"}
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="text-base font-normal leading-normal text-bondscape-text_neutral_700 mt-0.5">
                      {ticketCategory?.ticketsSold?.aggregate.count ?? 0} /{" "}
                      {ticketCategory.totalTicketsAvailable}
                    </div>

                    <ProgressBar
                      value={
                        ((ticketCategory?.ticketsSold?.aggregate?.count ?? 0) /
                          ticketCategory.totalTicketsAvailable) *
                        100
                      }
                      showValue={false}
                      pt={{
                        root: {
                          className: classNames(
                            "w-[100px] h-[4px] bg-[#5B5379]",
                          ),
                        },
                      }}
                    />
                  </div>
                  {ticketCategory.startDate && ticketCategory.endDate && (
                    <div className="flex flex-row gap-2 items-center">
                      <Image
                        alt={"Tickets icon"}
                        src={"/eventDetailsCalendarIcon.png"}
                        width={20}
                        height={20}
                      />
                      <div className="text-base font-normal leading-normal text-bondscape-text_neutral_700 mt-0.5">
                        {
                          getEventPeriodExtended(
                            ticketCategory?.startDate,
                            ticketCategory?.endDate,
                          ).date
                        }
                        <span className="mr-2" />
                        {
                          getEventPeriodExtended(
                            ticketCategory?.startDate,
                            ticketCategory?.endDate,
                          ).time
                        }
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Dialog
        draggable={false}
        modal={true}
        blockScroll={true}
        className="flex w-[480px]"
        visible={qrCodeVisible}
        onHide={() => setQrCodeVisible(false)}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="p-2.5 rounded-[8px] bg-white">
            {eventQrCode ? (
              <Image
                alt={"Qr code"}
                src={eventQrCode}
                width={158}
                height={158}
              />
            ) : (
              <PuffLoader color={"#A579FF"} />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-[40px] items-center">
            <div className="text-xl font-semibold text-bondscape-text_neutral_900 mt-6">
              {selectedEvent?.name ?? <Skeleton width={500} />}
            </div>
            {selectedEvent && (
              <div className="flex flex-col gap-4">
                <Button
                  outlined
                  className="w-[432px] justify-center font-semibold"
                  pt={{
                    label: {
                      className: "font-semibold",
                    },
                  }}
                  label={"Copy Link"}
                  onClick={() => {
                    navigator.clipboard.writeText(selectedEvent.detailsLink);
                    toast("Link copied to clipboard!");
                  }}
                />
                <Button
                  loading={generatingQr}
                  className="w-[432px] justify-center font-semibold"
                  pt={{
                    label: {
                      className: "font-semibold",
                    },
                  }}
                  label={"Download QR Code"}
                  onClick={() => saveQrCode()}
                />
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </MainLayout>
  );
}

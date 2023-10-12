import useFormatDateToTZ from "@/hooks/timeformat/useFormatDateToTZ";
import { TicketCategoryValues } from "@/types/event";
import Image from "next/image";
import { ProgressBar } from "primereact/progressbar";
import { classNames } from "primereact/utils";
import React from "react";

interface Props {
  readonly eventTicketCategory: TicketCategoryValues;
  readonly setDeleteTicketCategoryModalVisible: React.Dispatch<
    React.SetStateAction<{
      category: TicketCategoryValues | undefined;
      visible: boolean;
    }>
  >;
}

const TicketCategory = ({
  eventTicketCategory,
  setDeleteTicketCategoryModalVisible,
}: Props) => {
  const { getEventPeriodExtended } = useFormatDateToTZ();

  return (
    <div className="flex flex-1 relative flex-col bg-bondscape-text_neutral_100 p-6 rounded-[16px]">
      <div className="flex flex-row flex-1 mb-4 items-center justify-between">
        <div className="text-bondscape-text_neutral_900 text-2xl font-semibold leading-9">
          {eventTicketCategory.category}
        </div>
        <div>
          <button
            className="w-[20px] h-[20px] relative items-center justify-center"
            onClick={() =>
              setDeleteTicketCategoryModalVisible({
                category: eventTicketCategory,
                visible: true,
              })
            }
          >
            <Image
              alt={"Trash icon"}
              src={"/trashIcon.png"}
              fill
              className={"object-cover"}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Image
            alt={"Tickets icon"}
            src={"/eventDetailsTicketIcon.png"}
            width={20}
            height={20}
          />
          <div className="text-base font-normal leading-normal text-bondscape-text_neutral_700">
            {eventTicketCategory.maxQuantityPerPerson} /{" "}
            {eventTicketCategory.maxQuantityPerCategory}
          </div>

          <ProgressBar
            value={
              (eventTicketCategory.maxQuantityPerCategory *
                eventTicketCategory.maxQuantityPerPerson) /
              100
            }
            showValue={false}
            pt={{
              root: {
                className: classNames("w-[100px] h-[4px] bg-[#5B5379]"),
              },
            }}
          />
        </div>
        {eventTicketCategory.availableTill &&
          eventTicketCategory.availableFrom && (
            <div className="flex flex-row gap-2 items-center">
              <Image
                alt={"Tickets icon"}
                src={"/eventDetailsCalendarIcon.png"}
                width={20}
                height={20}
              />
              <div className="text-base font-normal leading-normal text-bondscape-text_neutral_700">
                {
                  getEventPeriodExtended(
                    eventTicketCategory?.availableFrom,
                    eventTicketCategory?.availableTill,
                  ).date
                }
                <span className="mr-2" />
                {
                  getEventPeriodExtended(
                    eventTicketCategory?.availableFrom,
                    eventTicketCategory?.availableTill,
                  ).time
                }
              </div>
            </div>
          )}

        {eventTicketCategory.validators.length > 0 && (
          <div className="flex flex-row gap-2 items-center">
            <Image
              alt={"Tickets icon"}
              src={"/eventDetailsValidatorsIcon.png"}
              width={20}
              height={20}
            />
            <div className="flex flex-row gap-2">
              {eventTicketCategory?.validators.map((validator, index) => {
                return (
                  <div
                    className="flex flex-row gap-1.5 items-center"
                    key={validator.validatorAddress}
                  >
                    <div className={"relative w-[20px] h-[20px]"}>
                      <Image
                        alt={"Validator profile picture"}
                        src={
                          validator.validator?.profilePicture ||
                          "/defaultProfilePicture.png"
                        }
                        fill
                        className="rounded-[20px] object-cover"
                      />
                    </div>

                    <div className="text-base font-normal text-bondscape-text_neutral_700">
                      {validator.validator?.nickname ||
                        validator.validator?.dTag ||
                        validator.validatorAddress}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {eventTicketCategory.description && (
          <div className="flex flex-row gap-2 items-center">
            <Image
              alt={"Tickets icon"}
              src={"/eventDetailsDescriptionIcon.png"}
              width={20}
              height={20}
            />
            <div className="text-base font-normal leading-normal text-bondscape-text_neutral_700">
              {eventTicketCategory.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCategory;

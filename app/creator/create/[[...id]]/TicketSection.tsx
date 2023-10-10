import React, { useState } from "react";
import Image from "next/image";
import BondscapeButton from "@/components/BondscapeButton";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import CreateTicketCategory from "@/creator/create/[[...id]]/CreateTicketCategory";
import { FormikProps } from "formik";
import { CreateEventValues } from "@/types/event";

interface TicketSectionProps {
  readonly formikProps: FormikProps<CreateEventValues>;
  readonly draftButtonText: string;
  readonly publishButtonText: any;
}

const TicketSection = ({
  formikProps,
  draftButtonText,
  publishButtonText,
}: TicketSectionProps) => {
  const [createTicketModalVisible, setCreateTicketModalVisible] =
    useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-bondscape-text_neutral_900 text-xl font-semibold leading-loose mb-1">
        Tickets
      </div>
      <div className="text-bondscape-text_neutral_700 text-sm font-normal leading-tight mb-6">
        The tickets will be NFTs tickets that attendees can easily share between
        each other. You can skip this for now if you need.
      </div>
      <button
        className="flex flex-1 relative flex-row bg-bondscape-text_neutral_100 p-6 rounded-[16px] gap-4 items-center"
        onClick={() => setCreateTicketModalVisible(true)}
      >
        <div>
          <Image
            alt={"Add ticket icon"}
            src={"/eventCreationAddTicketIcon.png"}
            width={48}
            height={48}
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="self-start text-bondscape-text_neutral_900 text-xl font-semibold leading-loose mb-1">
            Add Ticket Category
          </div>
          <div className="self-start text-left text-bondscape-text_neutral_700 text-sm font-normal leading-tight">
            You might create categories like “General Admission“, “Early Bird“,
            and “Guests“ for your event to make ticket selection easier for you
            and your attendees
          </div>
        </div>
      </button>
      <div className="flex flex-1 justify-center gap-[40px] mt-20">
        <BondscapeButton
          outlined
          className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
          textClassName="text-base font-semibold"
          text={draftButtonText}
        />
        <BondscapeButton
          className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
          textClassName="text-base font-semibold"
          text={publishButtonText}
        />
      </div>
      <Dialog
        closable={false}
        baseZIndex={100}
        header={"Add Ticket Category"}
        visible={createTicketModalVisible}
        onHide={() => setCreateTicketModalVisible(false)}
        pt={{
          header: {
            className: classNames(
              "text-center text-bondscape-text_neutral_900 text-2xl font-semibold leading-9",
            ),
          },
        }}
      >
        <CreateTicketCategory
          formikProps={formikProps}
          onHide={() => setCreateTicketModalVisible(false)}
        />
      </Dialog>
    </div>
  );
};

export default TicketSection;

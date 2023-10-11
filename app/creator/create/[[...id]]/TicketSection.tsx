import BondscapeButton from "@/components/BondscapeButton";
import CreateTicketCategory from "@/creator/create/[[...id]]/CreateTicketCategory";
import TicketCategory from "@/creator/create/TicketCategory";
import { CreateEventValues, TicketCategoryValues } from "@/types/event";
import { FormikProps } from "formik";
import Image from "next/image";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import React, { useState } from "react";

interface TicketSectionProps {
  readonly formikProps: FormikProps<CreateEventValues>;
  readonly draftButtonText: string;
  readonly publishButtonText: any;
  readonly initialValues: CreateEventValues;
}

const TicketSection = ({
  formikProps,
  draftButtonText,
  publishButtonText,
  initialValues,
}: TicketSectionProps) => {
  const [createTicketModalVisible, setCreateTicketModalVisible] =
    useState(false);
  const [
    deleteTicketCategoryModalVisible,
    setDeleteTicketCategoryModalVisible,
  ] = useState<{
    category: TicketCategoryValues | undefined;
    visible: boolean;
  }>({
    category: undefined,
    visible: false,
  });

  const { values, setFieldValue, isSubmitting } = formikProps;

  const requiredDraftValuesSet =
    values.eventName !== "" && values.eventDetails !== "";
  const requiredSubmitValuesSet =
    requiredDraftValuesSet && values.startDate && values.endDate;

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-bondscape-text_neutral_900 text-xl font-semibold leading-loose mb-1">
        Tickets
      </div>
      <div className="text-bondscape-text_neutral_700 text-sm font-normal leading-tight mb-6">
        The tickets will be NFTs tickets that attendees can easily share between
        each other. You can skip this for now if you need.
      </div>
      <div className="flex flex-1 flex-col gap-4">
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
              You might create categories like “General Admission“, “Early
              Bird“, and “Guests“ for your event to make ticket selection easier
              for you and your attendees
            </div>
          </div>
        </button>
        {values?.ticketsCategories?.map((ticketCategory, index) => {
          return (
            <TicketCategory
              eventTicketCategory={ticketCategory}
              key={index}
              setDeleteTicketCategoryModalVisible={
                setDeleteTicketCategoryModalVisible
              }
            />
          );
        })}
      </div>

      <div className="flex flex-1 justify-center gap-[40px] mt-20">
        <BondscapeButton
          outlined
          disabled={!requiredDraftValuesSet || isSubmitting}
          loading={isSubmitting && values.status === "draft"}
          className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
          textClassName="text-base font-semibold"
          text={draftButtonText}
        />
        <BondscapeButton
          disabled={!requiredSubmitValuesSet || isSubmitting}
          loading={isSubmitting && values.status === "published"}
          className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
          textClassName="text-base font-semibold"
          text={publishButtonText}
        />
      </div>
      <Dialog
        closable={false}
        draggable={false}
        modal={true}
        blockScroll={true}
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
      <Dialog
        draggable={false}
        modal={true}
        blockScroll={true}
        closable={false}
        header={"Delete Ticket Category"}
        visible={deleteTicketCategoryModalVisible.visible}
        onHide={() =>
          setDeleteTicketCategoryModalVisible({
            category: undefined,
            visible: false,
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
            label={"No"}
            className="h-11 w-52"
            onClick={() =>
              setDeleteTicketCategoryModalVisible({
                category: undefined,
                visible: false,
              })
            }
          />
          <Button
            label={"Yes, Delete"}
            className="h-11 w-52"
            onClick={async () => {
              if (deleteTicketCategoryModalVisible.category) {
                await setFieldValue(
                  "ticketsCategories",
                  values.ticketsCategories?.filter(
                    (ticketCategory) =>
                      ticketCategory !==
                      deleteTicketCategoryModalVisible.category,
                  ),
                ).then(() =>
                  setDeleteTicketCategoryModalVisible({
                    category: undefined,
                    visible: false,
                  }),
                );
              }
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default TicketSection;

import { Form, FormikProps } from "formik";
import CoverPicDropZone from "@/creator/create/CoverPicDropZone";
import BigTextInput from "@/creator/create/BigTextInput";
import BondscapeDateTimePicker from "@/creator/create/BondscapeDateTimePicker/BondscapeDateTimePicker";
import BondscapeButton from "@/components/BondscapeButton";
import React, { useState } from "react";
import {
  CreateEventValues,
  Organizer,
  TicketCategoryValues,
} from "@/types/event";
import SmallTextInput from "@/creator/create/SmallTextInput";
import BondscapeSelectCoHosts from "@/creator/create/BondscapeSelectCoHosts";
import useUser from "@/hooks/user/useUser";

interface CreateTicketCategoryProps {
  readonly formikProps: FormikProps<CreateEventValues>;
  readonly onHide: () => void;
}

const CreateTicketCategory = ({ onHide }: CreateTicketCategoryProps) => {
  const { user } = useUser();
  const [values, setValues] = useState<TicketCategoryValues>({
    description: "",
    category: "",
    maxQuantityPerPerson: undefined,
    maxQuantityPerCategory: undefined,
    availableFrom: undefined,
    availableTill: undefined,
    coverPicUrl: "",
    coverPic: undefined,
    controllers: [],
  });

  return (
    <div className="max-w-[63.25rem]">
      <div className="relative flex flex-col">
        <div className="flex flex-1 flex-col bg-bondscape-surface rounded-[24px] p-x-6 p-y-10">
          <Form className="flex flex-col">
            <div className="flex flex-1 flex-row gap-6">
              <div className="flex flex-col w-[31.25rem] gap-[1rem]">
                <CoverPicDropZone
                  fileToUpload={values.coverPic}
                  coverPicUrl={values.coverPicUrl}
                  setCoverPic={(coverPic) =>
                    setValues((prev) => ({ ...prev, coverPic }))
                  }
                />
                <BigTextInput
                  title={"Description"}
                  inputName={"ticketDescription"}
                  placeholder={
                    "Add an optional description of the advantages granted by your NFT ticket, if any."
                  }
                  required={false}
                  rows={3}
                  onChange={(text) =>
                    setValues((prev) => ({ ...prev, description: text }))
                  }
                />
              </div>
              <div className="flex flex-col w-[31.25rem] gap-[1rem]">
                <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] gap-[0.75rem] py-[16px]">
                  <SmallTextInput
                    inputName={"category"}
                    title={"Category"}
                    placeholder={"Category name"}
                    required={true}
                    onChange={(text) =>
                      setValues((prev) => ({ ...prev, category: text }))
                    }
                  />
                </div>
                <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] gap-[0.75rem] py-[16px]">
                  <SmallTextInput
                    inputName={"maxQuantityPerPerson"}
                    title={"Per Person"}
                    placeholder={"Max quantity per person"}
                    required={true}
                    onChange={(text) =>
                      setValues((prev) => ({
                        ...prev,
                        maxQuantityPerPerson: parseInt(text, 10),
                      }))
                    }
                    type={"number"}
                    min={1}
                  />
                  <SmallTextInput
                    inputName={"maxQuantityPerCategory"}
                    title={"Per Category"}
                    placeholder={"Max quantity per category"}
                    required={true}
                    onChange={(text) =>
                      setValues((prev) => ({
                        ...prev,
                        maxQuantityPerCategory: parseInt(text, 10),
                      }))
                    }
                    type={"number"}
                    min={1}
                  />
                </div>
                <BondscapeDateTimePicker
                  startLabel={"Available From"}
                  endLabel={"Available Until"}
                  initialStartValue={values.availableFrom}
                  initialEndValue={values.availableTill}
                  required={false}
                  onChangeStart={(value) =>
                    setValues((prev) => ({ ...prev, availableFrom: value }))
                  }
                  onChangeEnd={(value) =>
                    setValues((prev) => ({ ...prev, availableTill: value }))
                  }
                />
                <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] gap-[0.75rem] py-[16px]">
                  <BondscapeSelectCoHosts
                    label={"Verifiers"}
                    placeholder={
                      "dTags or Nicknames of the users who can validate attendees tickets"
                    }
                    initialCoHosts={values.controllers.filter(
                      (controller: Organizer) =>
                        controller.organizerAddress !== user?.profile?.address,
                    )}
                    required={false}
                    onChange={(organizers) =>
                      setValues((prev) => ({
                        ...prev,
                        controllers: organizers,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 justify-center gap-[40px] mt-20">
              <BondscapeButton
                outlined
                className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
                textClassName="text-base font-semibold"
                text={"Cancel"}
                onClick={onHide}
              />
              <BondscapeButton
                className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
                textClassName="text-base font-semibold"
                text={"Save"}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketCategory;

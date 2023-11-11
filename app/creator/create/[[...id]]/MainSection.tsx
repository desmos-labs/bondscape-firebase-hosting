import BondscapeButton from "@/components/BondscapeButton";
import BigTextInput from "@/creator/create/BigTextInput";
import BondscapeDateTimePicker from "@/creator/create/BondscapeDateTimePicker/BondscapeDateTimePicker";
import BondscapeSelectCategory from "@/creator/create/BondscapeSelectCategory";
import BondscapeSelectCoHosts from "@/creator/create/BondscapeSelectCoHosts";
import BondscapeSelectTags from "@/creator/create/BondscapeSelectTags";
import BondscapeSwitch from "@/creator/create/BondscapeSwitch";
import CoverPicDropZone from "@/creator/create/CoverPicDropZone";
import LocationInput from "@/creator/create/LocationInput";
import SmallTextInput from "@/creator/create/SmallTextInput";
import useUser from "@/hooks/user/useUser";
import { CreateEventValues, Organizer } from "@/types/event";
import { ErrorMessage, Form, FormikProps } from "formik";
import React from "react";

interface MainSectionProps {
  readonly title: string;
  readonly formikProps: FormikProps<CreateEventValues>;
  readonly setActiveSection: (section: number) => void;
}

const MainSection = ({
  title,
  formikProps,
  setActiveSection,
}: MainSectionProps) => {
  const { user } = useUser();
  const { values, setFieldValue } = formikProps;

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-bondscape-text_neutral_900 text-[30px] font-semibold leading-10 tracking-normal pb-[1.5rem]">
        {title}
      </div>
      <Form className="flex flex-col">
        <div className="flex flex-1 flex-row gap-[2rem]">
          <div className="flex flex-col w-[31.75rem] xl:w-[41.5rem] gap-[1rem]">
            <CoverPicDropZone
              fileToUpload={values.coverPic}
              coverPicUrl={values.coverPicUrl}
              setCoverPic={(coverPic) => setFieldValue("coverPic", coverPic)}
            />
            <ErrorMessage name={"eventName"}>
              {(msg) => (
                <div className="text-feedback-error text-[14px] font-normal">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <BigTextInput
              title={"Event Name"}
              inputName={"eventName"}
              placeholder={
                "Write a short event summary to get attendees excited."
              }
              inputClassName="text-[24px] font-semibold"
              required={true}
              rows={1}
              onChange={(text) => setFieldValue("eventName", text)}
            />
            <ErrorMessage name={"eventDetails"}>
              {(msg) => (
                <div className="text-feedback-error text-[14px] font-normal">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <BigTextInput
              title={"Event Details"}
              inputName={"eventDetails"}
              placeholder={
                "Provide all the informations needed for your events."
              }
              required={true}
              rows={5}
              onChange={(text) => setFieldValue("eventDetails", text)}
            />
          </div>
          <div className="flex flex-col w-[31.75rem] xl:w-[41.5rem] gap-[1rem]">
            <BondscapeDateTimePicker
              startLabel={"Start date"}
              endLabel={"End date"}
              initialStartValue={values.startDateLocalized}
              initialEndValue={values.endDateLocalized}
              required={false}
              onChangeStart={(value) => setFieldValue("startDate", value)}
              onChangeEnd={(value) => setFieldValue("endDate", value)}
              footer={
                <div>
                  The start and end dates of the event will be in the time zone
                  based on where the event will be held. If no location is
                  entered, the timezone will default to the UTC time zone.
                  <div className="text-feedback-warning mt-2">
                    The event can only be published if the dates are entered;
                    otherwise, it can only be saved as a draft.
                  </div>
                </div>
              }
            />
            <BondscapeSelectCategory
              initialCategories={values.categories}
              required={false}
              onChange={(value) => setFieldValue("categories", value)}
            />
            <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] gap-[0.75rem] py-[16px]">
              <SmallTextInput
                inputName={"website"}
                title={"Website"}
                placeholder={"Add an external link"}
                required={false}
                onChange={(text) => setFieldValue("website", text)}
              />
              <LocationInput
                defaultValue={values.placeId}
                formattedAddress={values.location?.formattedAddress}
                title={"Location"}
                required={false}
                onChange={(placeId) => setFieldValue("placeId", placeId)}
              />
              <BondscapeSelectCoHosts
                initialCoHosts={values.organizers.filter(
                  (organizer: Organizer) =>
                    organizer.organizerAddress !== user?.profile?.address,
                )}
                required={false}
                onChange={(organizers) =>
                  setFieldValue("organizers", organizers)
                }
              />
              <BondscapeSelectTags
                initialTags={values.tags}
                required={false}
                onChange={(tags) => setFieldValue("tags", tags)}
              />
              <BondscapeSwitch
                title={"Private Event"}
                value={values.isPrivate}
                onChange={(newValue) => {
                  setFieldValue("isPrivate", newValue);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center gap-[40px] mt-20">
          <BondscapeButton
            className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
            textClassName="text-base font-semibold"
            text={"Next"}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              setActiveSection(1);
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default MainSection;

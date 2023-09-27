import React, { useState } from "react";
// @ts-ignore
import { DtPicker } from "react-calendar-datetime-picker";
import "./style.css";
import { datePickerToUTCDatetime } from "@/utils/utils";
// @ts-ignore
import { IDay } from "react-calendar-datetime-picker/dist/types/type";

interface Props {
  readonly required: boolean;
  readonly onChangeStart: (value: string | undefined) => void;
  readonly onChangeEnd: (value: string | undefined) => void;
}

const BondscapeDateTimePicker = ({
  required,
  onChangeStart,
  onChangeEnd,
}: Props) => {
  const [minDate, setMinDate] = useState<IDay | undefined>();
  const [maxDate, setMaxDate] = useState<IDay | undefined>();

  return (
    <div className="flex flex-col bg-bondscape-text_neutral_100 gap-[0.75rem] rounded-[16px]  p-[1rem]">
      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1 w-[110px]">
          <label className="text-[16px] text-bondscape-text_neutral_900">
            {"Event Starts"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <DtPicker
            type={"single"}
            inputClass="flex flex-1 rounded-[8px] p-[0.75rem] !text-start border-none bg-bondscape-text_neutral_200 text-[14px] placeholder:text-bondscape-text_neutral_600 focus:outline-none"
            calenderModalClass="!rounded-[16px] mt-2"
            headerClass="!bg-bondscape-text_neutral_200"
            onChange={(value: IDay) => {
              setMinDate(value);
              onChangeStart(datePickerToUTCDatetime(value));
            }}
            withTime
            showTimeInput
            local="en"
            autoClose={false}
            clockLabel={"Time"}
            placeholder={"Select time"}
            maxDate={maxDate}
          />
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1 w-[110px]">
          <label className="text-[16px] text-bondscape-text_neutral_900">
            {"Event Ends"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <DtPicker
            type={"single"}
            inputClass="flex flex-1 rounded-[8px] p-[0.75rem] !text-start border-none bg-bondscape-text_neutral_200 text-[14px] placeholder:text-bondscape-text_neutral_600 focus:outline-none"
            calenderModalClass="!rounded-[16px] mt-2"
            headerClass="!bg-bondscape-text_neutral_200"
            onChange={(value: IDay) => {
              setMaxDate(value);
              onChangeEnd(datePickerToUTCDatetime(value));
            }}
            withTime
            showTimeInput
            local="en"
            autoClose={false}
            clockLabel={"Time"}
            placeholder={"Select time"}
            minDate={minDate}
          />
        </div>
      </div>
    </div>
  );
};

export default BondscapeDateTimePicker;

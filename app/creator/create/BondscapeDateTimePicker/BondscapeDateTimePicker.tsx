import { DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import "./style.css";

interface Props {
  readonly startLabel?: string;
  readonly endLabel?: string;
  readonly initialStartValue?: string;
  readonly initialEndValue?: string;
  readonly required: boolean;
  readonly onChangeStart: (value: string | undefined) => void;
  readonly onChangeEnd: (value: string | undefined) => void;
}

const BondscapeDateTimePicker = ({
  startLabel,
  endLabel,
  initialStartValue,
  initialEndValue,
  required,
  onChangeStart,
  onChangeEnd,
}: Props) => {
  const [minDate, setMinDate] = useState<dayjs.Dayjs>();
  const [maxDate, setMaxDate] = useState<dayjs.Dayjs>();

  const ClearIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 11.75C2 6.36522 6.36522 2 11.75 2C17.1348 2 21.5 6.36522 21.5 11.75C21.5 17.1348 17.1348 21.5 11.75 21.5C6.36522 21.5 2 17.1348 2 11.75ZM11.75 3.5C7.19365 3.5 3.5 7.19365 3.5 11.75C3.5 16.3063 7.19365 20 11.75 20C16.3063 20 20 16.3063 20 11.75C20 7.19365 16.3063 3.5 11.75 3.5Z"
          fill="#A579FF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.21967 8.21967C8.51256 7.92678 8.98744 7.92678 9.28033 8.21967L11.75 10.6893L14.2197 8.21967C14.5126 7.92678 14.9874 7.92678 15.2803 8.21967C15.5732 8.51256 15.5732 8.98744 15.2803 9.28033L12.8107 11.75L15.2803 14.2197C15.5732 14.5126 15.5732 14.9874 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L11.75 12.8107L9.28033 15.2803C8.98744 15.5732 8.51256 15.5732 8.21967 15.2803C7.92678 14.9874 7.92678 14.5126 8.21967 14.2197L10.6893 11.75L8.21967 9.28033C7.92678 8.98744 7.92678 8.51256 8.21967 8.21967Z"
          fill="#A579FF"
        />
      </svg>
    );
  };

  return (
    <div className="flex flex-col bg-bondscape-text_neutral_100 gap-[0.75rem] rounded-[16px]  p-[1rem]">
      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1 min-w-[130px]">
          <label className="text-[16px] text-bondscape-text_neutral_900 whitespace-nowrap">
            {startLabel || "Event Starts"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <DatePicker
            value={initialStartValue ? dayjs(initialStartValue) : undefined}
            disabledDate={
              maxDate
                ? (current) => current > maxDate || current < dayjs()
                : (current) => current < dayjs()
            }
            onChange={(date) => {
              setMinDate(date || dayjs());
              if (date) {
                onChangeStart(date.toISOString());
              } else {
                onChangeStart(undefined);
              }
            }}
            showTime={true}
            placeholder={"Select date"}
            format="MMM DD, YYYY HH:mm"
            className={"flex flex-1"}
            allowClear={{
              clearIcon: <ClearIcon />,
            }}
            suffixIcon={null}
          />
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1 min-w-[130px]">
          <label className="text-[16px] text-bondscape-text_neutral_900 whitespace-nowrap">
            {endLabel || "Event Ends"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <DatePicker
            value={initialEndValue ? dayjs(initialEndValue) : undefined}
            disabledDate={
              minDate
                ? (current) => current < minDate
                : (current) => current < dayjs().add(1, "hour")
            }
            onChange={(date) => {
              setMaxDate(date || undefined);
              if (date) {
                onChangeEnd(date.toISOString());
              } else {
                onChangeEnd(undefined);
              }
            }}
            showTime={true}
            placeholder={"Select date"}
            format="MMM DD, YYYY HH:mm"
            className={"flex flex-1"}
            allowClear={{
              clearIcon: <ClearIcon />,
            }}
            suffixIcon={null}
          />
        </div>
      </div>
    </div>
  );
};

export default BondscapeDateTimePicker;

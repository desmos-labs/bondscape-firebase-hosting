import React from "react";
import { Moment } from "moment";
import "react-datetime/css/react-datetime.css";
import { Field } from "formik";

interface Props {
  readonly required: boolean;
  readonly onChange: (value: Moment | string) => void;
}

const BondscapeDateTimePicker = ({ required, onChange }: Props) => {
  return (
    <div className="flex flex-col bg-bondscape-text_neutral_100 gap-[0.75rem] rounded-[16px]  p-[1rem]">
      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1">
          <label className="text-[14px] text-bondscape-text_neutral_900">
            {"Event Starts"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <Field name="eventStarts">
            {({}) => (
              <input
                type="datetime-local"
                name="eventStarts"
                className="flex flex-1 bg-bondscape-text_neutral_200 rounded-[16px] p-2"
              />
            )}
          </Field>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1">
          <label className="text-[14px] text-bondscape-text_neutral_900">
            {"Event Ends"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <Field name="eventStarts">
            {({}) => (
              <input
                type="datetime-local"
                name="eventStarts"
                className="flex flex-1 bg-bondscape-text_neutral_200 rounded-[16px] p-2"
              />
            )}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default BondscapeDateTimePicker;

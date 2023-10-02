import React from "react";
import { Field } from "formik";

interface Props {
  readonly title: string;
  readonly inputName: string;
  readonly placeholder: string;
  readonly required: boolean;
  readonly inputClassName?: string;
  readonly maxLength?: number;
  readonly rows?: number;
}

const BigTextInput = ({
  title,
  inputName,
  placeholder,
  required,
  inputClassName,
  maxLength,
  rows,
}: Props) => {
  return (
    <div className="flex flex-1 flex-col bg-bondscape-text_neutral_100 gap-[0.75rem] p-[1rem] rounded-[16px]">
      <div className="flex gap-1">
        <label className="text-[16px] text-bondscape-text_neutral_900">
          {title}
        </label>
        {required && <span className="text-[#FF8686]">*</span>}
      </div>
      <Field
        id={inputName}
        as="textarea"
        className={`${inputClassName} text-[14px] text-bondscape-text_neutral_900 placeholder:text-bondscape-text_neutral_600 placeholder:text-[14px] placeholder:font-normal bg-bondscape-text_neutral_100 focus:outline-none`}
        name={inputName}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </div>
  );
};

export default BigTextInput;

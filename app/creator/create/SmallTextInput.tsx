import React from "react";
import { Field } from "formik";

interface Props {
  readonly title: string;
  readonly inputName: string;
  readonly placeholder: string;
  readonly required: boolean;
  readonly inputClassName?: string;
}

const SmallTextInput = ({
  title,
  inputName,
  placeholder,
  required,
  inputClassName,
}: Props) => {
  return (
    <div className="flex flex-1 flex-row bg-bondscape-text_neutral_100 gap-2 px-[1rem] rounded-[16px] items-center">
      <div className="flex w-[110px]">
        <label className="text-[16px] text-bondscape-text_neutral_900">
          {title}
        </label>
        {required && <span className="text-[#FF8686]">*</span>}
      </div>
      <Field
        className={`${inputClassName} flex flex-1 bg-bondscape-text_neutral_200 rounded-[8px] p-[0.75rem] text-[14px] text-bondscape-text_neutral_900 placeholder:text-bondscape-text_neutral_600 placeholder:text-[14px] placeholder:font-normal focus:outline-none`}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SmallTextInput;

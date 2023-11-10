import { InputSwitch } from "primereact/inputswitch";
import React, { useState } from "react";

interface Props {
  readonly title: string;
  readonly value?: boolean;
  readonly onChange?: (value: boolean) => void;
  readonly required?: boolean;
}

const SmallTextInput = ({ title, value, onChange, required }: Props) => {
  const [isChecked, setIsChecked] = useState(value || false);
  return (
    <div className="flex flex-1 flex-row bg-bondscape-text_neutral_100 gap-2 px-[1rem] rounded-[16px] items-center">
      <div className="flex w-[130px]">
        <label className="text-[16px] text-bondscape-text_neutral_900">
          {title}
        </label>
        {required && <span className="ml-1 text-[#FF8686]">*</span>}
      </div>
      <InputSwitch
        pt={{
          slider: ({ props }) => ({
            className: props.checked
              ? "bg-bondscape-primary"
              : "bg-bondscape-text_neutral_300",
          }),
        }}
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.value);
          onChange && onChange(e.value);
        }}
      />
    </div>
  );
};

export default SmallTextInput;

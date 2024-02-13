import React from "react";
import BondscapeButton from "@/components/BondscapeButton";

interface Props {
  visible: boolean;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const EventDetailsTopInfoSection = ({
  visible,
  title,
  description,
  buttonText,
  onButtonClick,
}: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-[12px] bg-bondscape-surface p-[24px] rounded-[16px]">
      <div className="text-2xl font-semibold text-bondscape-text_neutral_900">
        {title}
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-1 text-bondscape-text_neutral_900 text-base">
          {description}
        </div>
        {visible && (
          <BondscapeButton
            textClassName="text-sm"
            className="w-[165px] px-[20px] py-[10px] rounded-[10px] z-4 h-10"
            loading={false}
            text={buttonText}
            onClick={onButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default EventDetailsTopInfoSection;

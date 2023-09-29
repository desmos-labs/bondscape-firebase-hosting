import React from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  readonly text: string;
  readonly type?: "submit" | "reset" | "button" | undefined;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly onClick?: () => void;
}

const BondscapeButton = ({
  text,
  type = "button",
  loading,
  disabled,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${
        disabled && "opacity-[0.5]"
      } w-64 h-11 px-6 py-3 mt-12 self-center bg-violet-400 rounded-lg justify-center items-center gap-2 inline-flex transition ease-in-out`}
    >
      <ClipLoader size={20} color={"white"} loading={loading} />
      <div className="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
        {text}
      </div>
    </button>
  );
};

export default BondscapeButton;

import React from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  readonly text: string;
  readonly type?: "submit" | "reset" | "button" | undefined;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly onClick?: () => void;
  readonly className?: string;
  readonly textClassName?: string;
}

const BondscapeButton = ({
  text,
  type = "button",
  loading,
  disabled,
  onClick,
  className,
  textClassName,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${
        disabled && "opacity-[0.5]"
      } self-center bg-bondscape-primary justify-center items-center gap-2 inline-flex transition ease-in-out cursor-pointer`}
    >
      <ClipLoader size={20} color={"white"} loading={loading} />
      <div
        className={`${textClassName} text-center text-white font-semibold leading-normal`}
      >
        {text}
      </div>
    </button>
  );
};

export default BondscapeButton;

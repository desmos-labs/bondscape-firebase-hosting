import React from "react";
import { Button } from "primereact/button";

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
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      className={`${className} ${
        disabled && "opacity-[0.5]"
      } h-12 self-center bg-bondscape-primary justify-center items-center gap-2 inline-flex transition ease-in-out cursor-pointer`}
    >
      <div
        className={`${textClassName} text-center text-white font-semibold leading-normal`}
      >
        {text}
      </div>
    </Button>
  );
};

export default BondscapeButton;

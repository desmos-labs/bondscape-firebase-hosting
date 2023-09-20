import React from "react";
import Image from "next/image";

const BondscapeLogo = () => {
  return (
    <div className="w-[123px] h-[28px] md:w-[175px] md:h-[40px] relative">
      <Image
        alt={"Bondscape logo"}
        src={"/bondscapeLogo.png"}
        fill
        quality={75}
      />
    </div>
  );
};

export default BondscapeLogo;

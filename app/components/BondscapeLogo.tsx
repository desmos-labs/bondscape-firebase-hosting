import React from "react";
import Image from "next/image";

const BondscapeLogo = () => {
  return (
    <div className="w-[123px] h-[28px] md:w-[175px] md:h-[40px] relative">
      <Image
        priority
        alt={"Bondscape logo"}
        src={"/bondscapeLogo.png"}
        fill
        sizes="(max-width: 768px) 10vw, (max-width: 1200px) 15vw"
        quality={75}
      />
    </div>
  );
};

export default BondscapeLogo;

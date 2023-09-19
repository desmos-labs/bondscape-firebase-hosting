import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex bg-bondscape-background-primary px-xMobile md:px-xMd lg:px-xLg xl:px-xXl py-yMobile lg:py-[30px]">
      <div className="flex flex-1 flex-col lg:flex-row lg:items-center">
        <span className="text-bondscape-text_neutral_600 text-[14px] font-light leading-none pb-2 lg:pb-0 lg:pr-[40px]">
          Copyright © Desmos Labs {new Date().getFullYear()}
        </span>
        <div className="flex flex-row lg:flex-1 justify-between items-center">
          <div className="flex flex-row text-[14px] font-light">
            <Link
              className="text-bondscape-text_neutral_400 leading-tight hover:text-bondscape-hover hover:underline transition-colors ease-in-out duration-300 cursor-pointer"
              href={"/terms"}
            >
              Terms of Service
            </Link>
            <span className="text-bondscape-text_neutral_400 px-[24px] leading-tight">
              |
            </span>
            <Link
              className="text-bondscape-text_neutral_400 leading-tight hover:text-bondscape-hover hover:underline transition-colors ease-in-out duration-300 cursor-pointer"
              href={"/privacy"}
            >
              Privacy Policy
            </Link>
          </div>
          <Link href="https://twitter.com/desmosnetwork" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="fill-bondscape-text_neutral_500 hover:fill-bondscape-hover transition-colors ease-in-out duration-300 cursor-pointer"
            >
              <g clipPath="url(#clip0_457_125)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM12.0677 14.8363L5.37592 5.88879H10.5335L14.9205 11.7546L20.35 5.88879H21.8657L15.5976 12.6603L22.6661 22.111H17.5086L12.7452 15.7417L6.84942 22.111H5.33374L12.0677 14.8363ZM9.97413 7.00512H7.60478L18.0676 20.9946H20.437L9.97413 7.00512Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_457_125">
                  <rect width="28" height="28" rx="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  readonly editMode?: boolean;
  readonly editButtonHref?: string;
}

const CreateEventHeader = ({ editMode, editButtonHref }: Props) => {
  const router = useRouter();
  return (
    <div className="inline-flex items-center mb-[40px]">
      <div className="flex flex-1 flex-row justify-between">
        <button
          className="self-start py-1 justify-center items-center gap-2 flex text-bondscape-primary fill-bondscape-primary hover:text-[#654A9C] hover:fill-[#654A9C] transition ease-in-out"
          onClick={() => router.back()}
        >
          <div className="w-4 h-4 p-0.5 justify-center items-center flex">
            <div className="w-3 h-3 relative">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer 125">
                  <path
                    id="Vector (Stroke)"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.68624 0.979943C6.8815 1.1752 6.8815 1.49179 6.68624 1.68705L2.37312 6.00016L6.68624 10.3133C6.8815 10.5085 6.8815 10.8251 6.68624 11.0204C6.49097 11.2156 6.17439 11.2156 5.97913 11.0204L1.31246 6.35372C1.1172 6.15845 1.1172 5.84187 1.31246 5.64661L5.97913 0.979943C6.17439 0.784681 6.49097 0.784681 6.68624 0.979943Z"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="text-center text-[16px] font-semibold leading-normal">
            Go Back
          </div>
        </button>
        {editMode && editButtonHref && (
          <Link
            className="py-1 justify-center items-center gap-2 flex text-bondscape-primary stroke-bondscape-primary hover:stroke-[#654A9C] hover:text-[#654A9C] transition ease-in-out"
            href={editButtonHref}
          >
            <div className="w-[16px] h-[16px] justify-center items-center flex">
              <div className="w-3 h-3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                >
                  <path
                    d="M8.30077 13.3333H14.3008M2.30078 13.3333H3.41714C3.74327 13.3333 3.90633 13.3333 4.05978 13.2967C4.19583 13.2643 4.32589 13.2108 4.44518 13.1382C4.57974 13.0564 4.69504 12.9419 4.92564 12.7129L13.3008 4.39711C13.8531 3.84873 13.8531 2.95965 13.3008 2.41128C12.7485 1.86291 11.8531 1.86291 11.3008 2.41128L2.92562 10.7271C2.69502 10.9561 2.57972 11.0705 2.49726 11.2041C2.42416 11.3226 2.37028 11.4517 2.33762 11.5868C2.30078 11.7392 2.30078 11.9011 2.30078 12.2249V13.3333Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center text-[16px] font-semibold leading-normal mt-1">
              Edit Event
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CreateEventHeader;

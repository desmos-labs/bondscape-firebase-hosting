import React from "react";

interface Props {
  readonly onPressGoBack: () => void;
}

const CreateEventHeader = ({ onPressGoBack }: Props) => {
  return (
    <div className="inline-flex items-center mb-[40px]">
      <div className="justify-start items-start inline-flex">
        <button
          className="py-1 rounded-full justify-center items-center gap-2 flex text-bondscape-primary fill-bondscape-primary hover:text-[#654A9C] hover:fill-[#654A9C] transition ease-in-out"
          onClick={onPressGoBack}
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
            Events
          </div>
        </button>
      </div>
    </div>
  );
};

export default CreateEventHeader;

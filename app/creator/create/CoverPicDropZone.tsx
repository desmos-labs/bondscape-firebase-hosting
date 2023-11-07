import { BondscapePreviewImage } from "@/types/image";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  readonly text?: string;
  readonly description?: React.ReactNode;

  /**
   * If the user is creating or editing a cover picture, this will be the image
   */
  readonly fileToUpload?: BondscapePreviewImage;
  /**
   * If the user is editing the event but not modifying the cover picture, this will be the url of the cover picture
   */
  readonly coverPicUrl?: string;
  readonly setCoverPic: (coverPic: BondscapePreviewImage) => void;
}

const CoverPicDropZone = ({
  text,
  description,
  fileToUpload,
  coverPicUrl,
  setCoverPic,
}: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setCoverPic(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      );
    },
    [setCoverPic],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
  });

  return (
    <div className="flex cursor-pointer">
      <div
        className="flex relative w-full h-[17.25rem] xl:h-[22.5rem] items-center justify-center bg-bondscape-text_neutral_100 rounded-[16px]"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {fileToUpload?.preview || coverPicUrl ? (
          <Image
            src={fileToUpload?.preview ?? coverPicUrl ?? ""}
            alt="Cover pic preview"
            fill
            className="object-cover rounded-[16px]"
            priority={true}
            sizes={"100%"}
          />
        ) : isDragActive ? (
          <div className="text-center text-white text-sm font-normal leading-tight">
            Drop the image here
          </div>
        ) : (
          <div className="w-56 h-40 rounded-2xl flex-col justify-start items-center gap-6 inline-flex">
            <svg
              width="43"
              height="38"
              viewBox="0 0 43 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Icon"
                d="M6.20825 36.4099L19.4013 23.2168C20.1934 22.4248 20.5894 22.0288 21.046 21.8804C21.4477 21.7499 21.8804 21.7499 22.2821 21.8804C22.7388 22.0288 23.1348 22.4248 23.9268 23.2168L37.0319 36.3219M25.6641 24.9541L31.4013 19.2168C32.1934 18.4248 32.5894 18.0288 33.046 17.8804C33.4477 17.7499 33.8804 17.7499 34.2821 17.8804C34.7388 18.0288 35.1348 18.4248 35.9268 19.2168L41.6641 24.9541M17.6641 12.9541C17.6641 15.1632 15.8732 16.9541 13.6641 16.9541C11.4549 16.9541 9.66406 15.1632 9.66406 12.9541C9.66406 10.745 11.4549 8.9541 13.6641 8.9541C15.8732 8.9541 17.6641 10.745 17.6641 12.9541ZM11.2641 36.9541H32.0641C35.4244 36.9541 37.1045 36.9541 38.388 36.3001C39.517 35.7249 40.4349 34.807 41.0101 33.678C41.6641 32.3946 41.6641 30.7144 41.6641 27.3541V10.5541C41.6641 7.19379 41.6641 5.51363 41.0101 4.23016C40.4349 3.10119 39.517 2.1833 38.388 1.60806C37.1045 0.954102 35.4244 0.954102 32.0641 0.954102H11.2641C7.90375 0.954102 6.22359 0.954102 4.94012 1.60806C3.81115 2.1833 2.89326 3.10119 2.31802 4.23016C1.66406 5.51363 1.66406 7.19379 1.66406 10.5541V27.3541C1.66406 30.7144 1.66406 32.3946 2.31802 33.678C2.89326 34.807 3.81115 35.7249 4.94012 36.3001C6.22359 36.9541 7.90375 36.9541 11.2641 36.9541Z"
                stroke="#858293"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className=" self-stretch h-16 flex-col justify-start items-center gap-2 flex">
              <div className="px-1 w-36 h-8 bg-violet-400 rounded-lg justify-start items-start inline-flex">
                <div className="grow self-stretch py-3 bg-violet-400 rounded-lg justify-center items-center gap-2 flex">
                  <div className="text-center text-white text-sm font-semibold leading-tight">
                    {text || "Upload a cover"}
                  </div>
                </div>
              </div>
              <div className="text-center text-white text-[12px] font-normal leading-tight">
                Or drop it here
              </div>

              {description && <div className="text-center text-white text-[12px] pt-2">{description}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverPicDropZone;

"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { PuffLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";

interface Props {
  /**
   * Name of the event to which the QR code is associated.
   */
  eventName: string | undefined;

  /**
   * Link associated to the QR code. If undefined, the button to copy the link will not be disabled.
   */
  linkUrl: string | undefined;

  /**
   * The QR code image source.
   */
  qrCodeImageSrc: string | undefined;

  /**
   * Whether the dialog is visible or not.
   */
  visible: boolean;

  /**
   * Callback to be called when the dialog is hidden.
   */
  onHide: () => void;
}

const EventQRCodeDialog = ({
  eventName,
  linkUrl,
  qrCodeImageSrc,
  visible,
  onHide,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const saveQrCode = useCallback(async () => {
    if (!qrCodeImageSrc) return;

    setIsLoading(true);
    try {
      // Get the QR Code image data
      const response = await fetch(qrCodeImageSrc);
      const block = await response.blob();
      const url = URL.createObjectURL(block);

      // Create a link that contains the image data
      const a = document.createElement("a");
      a.href = url;
      a.download = `bondscape_${eventName}_qr_code.png`;
      document.body.appendChild(a);

      // Click the link to download the image
      a.click();

      // Remove the link
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [eventName, qrCodeImageSrc]);

  return (
    <Dialog
      draggable={false}
      modal={true}
      blockScroll={true}
      className="flex w-[480px]"
      visible={visible}
      onHide={onHide}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="p-2.5 rounded-[8px] bg-white">
          {qrCodeImageSrc ? (
            <Image
              alt={"Qr code"}
              src={qrCodeImageSrc}
              width={158}
              height={158}
            />
          ) : (
            <PuffLoader color={"#A579FF"} />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-[40px] items-center">
          <div className="text-xl font-semibold text-bondscape-text_neutral_900 mt-6">
            {eventName ?? <Skeleton width={500} />}
          </div>
          <div className="flex flex-col gap-4">
            {linkUrl && (
              <Button
                outlined
                className="w-[432px] justify-center font-semibold"
                pt={{
                  label: {
                    className: "font-semibold",
                  },
                }}
                label={"Copy Link"}
                onClick={() => {
                  navigator.clipboard.writeText(linkUrl);
                  toast("Link copied to clipboard!");
                }}
              />
            )}
            <Button
              loading={isLoading}
              className="w-[432px] justify-center font-semibold"
              pt={{
                label: {
                  className: "font-semibold",
                },
              }}
              label={"Download QR Code"}
              onClick={saveQrCode}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EventQRCodeDialog;

import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

/**
 * Users can generate a QR code for any given link.
 */

const GetQrCode = (
  url: string,
  type: "url" | "image",
): ResultAsync<any, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.get(`/qrcode?url=${url}`, {
      headers: {
        Accept: type === "url" ? "application/json" : "image/*",
      },
    }),
    (e: any) => e ?? Error("Error getting the qr code"),
  ).map((response) => response.data);
};

export default GetQrCode;

import { zonedTimeToUtc } from "date-fns-tz";
// @ts-ignore
import { IDay } from "react-calendar-datetime-picker/dist/types/type";

export function escapeChars(htmlStr: string) {
  return htmlStr
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const datePickerToUTCDatetime = (date: IDay) => {
  if (!date) return undefined;
  const localeDate = new Date(
    date.year,
    date.month,
    date.day,
    date.hour,
    date.minute,
  );
  return zonedTimeToUtc(
    localeDate,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ).toISOString();
};

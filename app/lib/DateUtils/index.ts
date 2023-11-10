import dayjs, { Dayjs } from "dayjs";

/**
 * Interface that represents a timezone offset.
 */
export interface TimezoneOffset {
  /**
   * The hours offset.
   * Can be positive for UTC + timezones or negative
   * for UTC - timezones.
   */
  readonly hours: number;
  /**
   * The minutes offset.
   * Can be positive for UTC + timezones or negative
   * for UTC - timezones.
   */
  readonly minutes: number;
}

/**
 * Utility function to normalize a RFC3339 date string
 * by adding the Z character to the end of the string
 * if don't contains the timezone offset or the Z character.
 */
export const normalizeDateTime = (date: string): string => {
  const RFC3339Regex =
    /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[+-]\d{2}:\d{2}))$/;
  if (!RFC3339Regex.test(date)) {
    return `${date}Z`;
  }
  return date;
};

/**
 * Utility function to extract the timezone offset from a RFC3339 encoded date time.
 */
export const extractTimezoneOffset = (date: string): TimezoneOffset => {
  if (date.indexOf("Z") !== -1) {
    return { hours: 0, minutes: 0 };
  }
  const indexOfPlus = date.lastIndexOf("+");
  const indexOfMinus = date.lastIndexOf("-");
  // Return if there is no offset.
  if (indexOfPlus === -1 && indexOfMinus === -1) {
    return { hours: 0, minutes: 0 };
  }
  const offsetDividerIndex =
    indexOfPlus !== -1 ? indexOfPlus + 1 : indexOfMinus + 1;
  // Return an empty offset if the index is not at the end.
  if (date.length - offsetDividerIndex < 2) {
    return { hours: 0, minutes: 0 };
  }
  const offset = date.substring(offsetDividerIndex);
  // Get an integer value that can be used later on to convert the parsed hours and
  // minutes in +hours and +minutes if the UTC offset is + or
  // -hours and -minutes if the UTC offset is -.
  const offsetDirection = indexOfPlus !== -1 ? 1 : -1;

  const [hours, minutes] = offset.split(":");
  return {
    hours:
      hours && hours.length > 0 ? parseInt(hours, 10) * offsetDirection : 0,
    minutes:
      minutes && minutes.length > 0
        ? parseInt(minutes, 10) * offsetDirection
        : 0,
  };
};

/**
 * Utility function to serialize a {@link TimezoneOffset} to string.
 */
export const serializeTimezoneOffset = (offset: TimezoneOffset): string => {
  if (offset.hours === 0 && offset.minutes === 0) {
    return "UTC";
  }
  const sign = offset.hours < 0 ? "-" : "+";
  const hours = Math.abs(offset.hours);
  const minutes = Math.abs(offset.minutes);
  if (minutes === 0) {
    return `UTC ${sign}${hours}`;
  }
  return `UTC ${sign}${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Converts a provided date to a Date object with the provided {@link TimezoneOffset}.
 */
export const addTimezoneOffsetToDate = (
  date: string | Date,
  offset: TimezoneOffset,
): Date => {
  const parsedDate =
    typeof date === "string" ? new Date(normalizeDateTime(date)) : date;
  // Get the user's timezone offset in milliseconds.
  // The timezone offset is - for +UTC timezones and + for -UTC timezones.
  const userTimezoneOffset = parsedDate.getTimezoneOffset() * 60000;
  // We sum the user's timezone offset so that
  // when we create the date object will have the UTC time since
  // the Date constructor will add back
  // the user's timezone offset.
  const utcTime = parsedDate.getTime() + userTimezoneOffset;
  // Computes the timezone offset in milliseconds.
  const timezoneOffset = offset.hours * 3600000 + offset.minutes * 60000;
  return new Date(utcTime + timezoneOffset);
};

/**
 * Converts a provided date to a Date in correct format to be sent to our APIs
 * @param date string | Date - The date to convert.
 */
export const getDatePickerParsedDate = (date: Dayjs) => {
  const offset = dayjs(date).utcOffset();
  const dateWithOffset = dayjs(date).utcOffset(offset);
  return dateWithOffset.format("YYYY-MM-DDTHH:mm:00");
};

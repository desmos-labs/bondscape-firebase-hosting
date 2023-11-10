import {
  addTimezoneOffsetToDate,
  extractTimezoneOffset,
  normalizeDateTime,
} from "@/lib/DateUtils";
import { differenceInHours, format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useCallback } from "react";

/**
 * A hook that allows formatting a timestamp into a specified format.
 */
const useFormatDateToTZ = () => {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  /**
   * Format a RFC3339 date respecting the timezone specified in the
   * received date instead of converting it to the user's timezone.
   */
  const formatTimeRespectingTimezone = useCallback(
    (timeToFormat: string, formatString: string) => {
      if (!timeToFormat) {
        return "T.B.D.";
      }

      // Extracts the timezone offset from the received date.
      const timeZoneOffset = extractTimezoneOffset(timeToFormat);
      // Parse the received date to a Date in the user's timezone.
      const parsedTime = parseISO(normalizeDateTime(timeToFormat));
      return format(
        addTimezoneOffsetToDate(parsedTime, timeZoneOffset),
        formatString,
      );
    },
    [],
  );

  /**
   * A function that formats a timestamp into a specified format.
   */
  const formatTime = useCallback(
    (timeToFormat: string | Date, formatString: string) => {
      if (!timeToFormat) return "T.B.D.";
      // append a zone designator to timestamp if it is not present
      // this is for formatting the time to different timezones
      const parsedTime =
        typeof timeToFormat === "string"
          ? parseISO(normalizeDateTime(timeToFormat))
          : timeToFormat;
      return formatInTimeZone(parsedTime, currentTimeZone, formatString);
    },
    [currentTimeZone],
  );

  /**
   * A function that returns the period of an event in the format:
   * - if the event has finished: event finished
   * - if the event is within 24 hours: 02 Oct, 2021: 10:00 - 11:00
   * - if the event is longer than 24 hours: 02 Oct, 2021: 10:00 - 03 Oct, 2021: 11:00
   */
  const getEventPeriod = useCallback(
    (start: string, end: string) => {
      if (!start || !end) return "T.B.D.";
      const parsedStart = parseISO(normalizeDateTime(start));
      const parsedEnd = parseISO(normalizeDateTime(end));

      /**
       * If the difference between the start and end time is within 24 hours, only show the date
       * example: 02 Oct, 2021: 10:00 - 11:00
       */
      if (differenceInHours(parsedStart, parsedEnd) > -24) {
        return `${formatTimeRespectingTimezone(start, "EEE, MMM dd, yyyy")}`;
      }
      /**
       * Otherwise show the date and time on both dates
       * example: 02 Oct, 2021: 10:00 - 03 Oct, 2021: 11:00
       */
      return `${formatTimeRespectingTimezone(start, "MMM dd")} - ${formatTime(
        end,
        "MMM dd, yyyy",
      )}`;
    },
    [formatTime, formatTimeRespectingTimezone],
  );

  /**
   * A function that returns the period of an event in the format:
   * - if the event has finished: event finished
   * - if the event is within 24 hours: 02 Oct, 2021: 10:00 - 11:00
   * - if the event is longer than 24 hours: 02 Oct, 2021: 10:00 - 03 Oct, 2021: 11:00
   */
  const getPastEventPeriod = useCallback(
    (start: string, end: string) => {
      if (!start || !end) return "T.B.D.";
      const parsedStart = parseISO(normalizeDateTime(start));
      const parsedEnd = parseISO(normalizeDateTime(end));

      /**
       * If the difference between the start and end time is within 24 hours, only show the date
       * example: 02 Oct, 2021: 10:00 - 11:00
       */
      if (differenceInHours(parsedStart, parsedEnd) > -24) {
        return `${formatTimeRespectingTimezone(start, "MMM dd, yyyy")}`;
      }
      /**
       * Otherwise show the date and time on both dates
       * example: 02 Oct, 2021: 10:00 - 03 Oct, 2021: 11:00
       */
      return `${formatTimeRespectingTimezone(
        start,
        "MMM dd",
      )} - ${formatTimeRespectingTimezone(end, "MMM dd, yyyy")}`;
    },
    [formatTimeRespectingTimezone],
  );

  /**
   * A function that returns the period of an event in the format:
   * - if the event is within 24 hours: date: 02 Oct, 2021: time: 10:00 - 11:00
   * - if the event is longer than 24 hours: date: 02 Oct - 03 Oct, 2021: time: 10:00 - 11:00
   */
  const getEventPeriodExtended = useCallback(
    (start: string, end: string) => {
      if (!start || !end) {
        return {
          date: "T.B.D.",
          time: "",
        };
      }
      const parsedStart = parseISO(normalizeDateTime(start));
      const parsedEnd = parseISO(normalizeDateTime(end));

      if (differenceInHours(parsedStart, parsedEnd) > -24) {
        return {
          date: `${formatTimeRespectingTimezone(start, "MMM dd, yyyy")}`,
          time: `${formatTimeRespectingTimezone(
            start,
            "HH:mm",
          )} - ${formatTimeRespectingTimezone(end, "HH:mm")}`,
        };
      }

      return {
        date: `${formatTimeRespectingTimezone(
          start,
          "MMM dd",
        )} - ${formatTimeRespectingTimezone(end, "MMM dd, yyyy")}`,
        time: `${formatTimeRespectingTimezone(
          start,
          "HH:mm",
        )} - ${formatTimeRespectingTimezone(end, "HH:mm")}`,
      };
    },
    [formatTimeRespectingTimezone],
  );

  /**
   * A function that returns the period of an event in the format:
   * - if the event is within 24 hours: date: 02 Oct, 2021
   * - if the event is longer than 24 hours: date: 02 Oct - 03 Oct, 2021
   */
  const getEventPeriodCompressed = useCallback(
    (start: string, end: string) => {
      const parsedStart = parseISO(normalizeDateTime(start));
      const parsedEnd = parseISO(normalizeDateTime(end));

      if (differenceInHours(parsedStart, parsedEnd) > -24) {
        return {
          date: `${formatTimeRespectingTimezone(start, "MMM dd, yyyy")}`,
        };
      }

      return {
        date: `${formatTimeRespectingTimezone(
          start,
          "MMM dd",
        )} - ${formatTimeRespectingTimezone(end, "MMM dd, yyyy")}`,
      };
    },
    [formatTimeRespectingTimezone],
  );

  return {
    formatTime,
    getEventPeriod,
    getPastEventPeriod,
    getEventPeriodExtended,
    getEventPeriodCompressed,
  };
};

export default useFormatDateToTZ;

import { useCallback } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { differenceInHours, parseISO } from "date-fns";

/**
 * A hook that allows formatting a timestamp into a specified format.
 */
const useFormatDateToTZ = () => {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  /**
   * A function that formats a timestamp into a specified format.
   */
  const formatTime = useCallback(
    (timeToFormat: string, formatString: string) => {
      if (!timeToFormat) return "T.B.D.";
      // append a zone designator to timestamp if it is not present
      // this is for formatting the time to different timezones
      const parsedTime = parseISO(
        !timeToFormat.includes("Z") ? `${timeToFormat}Z` : timeToFormat,
      );
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
      const parsedStart = parseISO(!start.includes("Z") ? `${start}Z` : start);
      const parsedEnd = parseISO(!end.includes("Z") ? `${end}Z` : end);

      /**
       * If the difference between the start and end time is within 24 hours, only show the date
       * example: 02 Oct, 2021: 10:00 - 11:00
       */
      if (differenceInHours(parsedStart, parsedEnd) > -24) {
        return `${formatTime(start, "EEE, MMM dd, yyyy")}`;
      }
      /**
       * Otherwise show the date and time on both dates
       * example: 02 Oct, 2021: 10:00 - 03 Oct, 2021: 11:00
       */
      return `${formatTime(start, "MMM dd")} - ${formatTime(
        end,
        "MMM dd, yyyy",
      )}`;
    },
    [formatTime],
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
      const parsedStart = parseISO(!start.includes("Z") ? `${start}Z` : start);
      const parsedEnd = parseISO(!end.includes("Z") ? `${end}Z` : end);

      /**
       * If the difference between the start and end time is within 24 hours, only show the date
       * example: 02 Oct, 2021: 10:00 - 11:00
       */
      if (differenceInHours(parsedStart, parsedEnd) > -24) {
        return `${formatTime(start, "MMM dd, yyyy")}`;
      }
      /**
       * Otherwise show the date and time on both dates
       * example: 02 Oct, 2021: 10:00 - 03 Oct, 2021: 11:00
       */
      return `${formatTime(start, "MMM dd")} - ${formatTime(
        end,
        "MMM dd, yyyy",
      )}`;
    },
    [formatTime],
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
      const parsedStart = parseISO(!start.includes("Z") ? `${start}Z` : start);
      const parsedEnd = parseISO(!end.includes("Z") ? `${end}Z` : end);

      if (differenceInHours(parsedStart, parsedEnd) > -24) {
        return {
          date: `${formatTime(start, "MMM dd, yyyy")}`,
          time: `${formatTime(start, "HH:mm")} - ${formatTime(end, "HH:mm")}`,
        };
      }

      return {
        date: `${formatTime(start, "MMM dd")} - ${formatTime(
          end,
          "MMM dd, yyyy",
        )}`,
        time: `${formatTime(start, "HH:mm")} - ${formatTime(end, "HH:mm")}`,
      };
    },
    [formatTime],
  );

  /**
   * A function that returns the period of an event in the format:
   * - if the event is within 24 hours: date: 02 Oct, 2021
   * - if the event is longer than 24 hours: date: 02 Oct - 03 Oct, 2021
   */
  const getEventPeriodCompressed = useCallback(
    (start: string, end: string) => {
      const parsedStart = parseISO(!start.includes("Z") ? `${start}Z` : start);
      const parsedEnd = parseISO(!end.includes("Z") ? `${end}Z` : end);

      if (differenceInHours(parsedStart, parsedEnd) > -24) {
        return {
          date: `${formatTime(start, "MMM dd, yyyy")}`,
        };
      }

      return {
        date: `${formatTime(start, "MMM dd")} - ${formatTime(
          end,
          "MMM dd, yyyy",
        )}`,
      };
    },
    [formatTime],
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

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc); // UTC plugin

/*
    this function changes the timezone offset of a date while keeping the local time:
        It will do this: 2020-07-09T11:10:11+02:00 to 2020-07-09T11:10:11+06:00
        NOT: 2020-07-09T11:10:11+02:00 to 2020-07-09T07:10:11+06:00

*/
export default function changeTimeZoneOffset(
  date: dayjs.Dayjs,
  offsetInMinutes: number
): dayjs.Dayjs {
  if (offsetInMinutes !== 0 && offsetInMinutes < 16 && offsetInMinutes > 16) {
    throw new TypeError("Offset must be in minutes");
  }
  const offsetChangeInMinutes = offsetInMinutes - date.utcOffset();
  return date
    .utcOffset(offsetInMinutes)
    .subtract(offsetChangeInMinutes, "minute");
}

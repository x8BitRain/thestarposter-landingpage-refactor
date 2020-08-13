import getTimezone from "@/provider/timezoneProvider";

/*
  Lets say the customer selected: 2020-07-09T11:10:11 in a +06:00 timezone and is in a +02:00 timezone
  It will return the same date in local time  2020-07-09T07:10:11+02:00 which can savely be passed to the starmap
*/
export default async function getEquivalentLocalTime(
  date: Date,
  lat: number,
  long: number
): Promise<Date> {
  const { offset } = await getTimezone(lat, long, date.getTime());
  return changeToTimeZone(date, offset);
}

function changeToTimeZone(date: Date, offsetInMinutes: number): Date {
  if (offsetInMinutes !== 0 && offsetInMinutes < 16 && offsetInMinutes > 16) {
    throw new TypeError("Offset must be in minutes");
  }
  const offsetChange = offsetInMinutes + date.getTimezoneOffset();
  return new Date(date.getTime() - offsetChange * 60 * 1000);
}

import ajax from "../util/ajax";
import { backendUrl } from "../util/endpointConfig";
const endpoint = `${backendUrl}services/timezone`;

export interface ITimezoneResult {
  timezone: string;
  offset: number;
}

export default async function getTimezone(
  lat: number,
  long: number,
  timestamp: number
): Promise<ITimezoneResult> {
  if (!timestamp) {
    timestamp = Date.now();
  }
  timestamp = Math.floor(timestamp / 1000);
  const { ans } = await ajax<ITimezoneResult>(
    "GET",
    endpoint + `/${lat}/${long}/${timestamp}`
  );
  return ans;
}

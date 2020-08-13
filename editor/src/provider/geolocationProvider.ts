import ajax from "../util/ajax";
import { backendUrl } from "../util/endpointConfig";

export interface IGeolocationResult {
  lat: number;
  lon: number;
}

export default async function geoLocation(
  placeId: string,
  query: string
): Promise<IGeolocationResult> {
  const { ans } = await ajax<IGeolocationResult>(
    "GET",
    backendUrl +
      "services/geoLocation/" +
      encodeURIComponent(placeId) +
      "?placeName=" +
      encodeURIComponent(query)
  );
  return ans;
}

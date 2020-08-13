import { IStarPoster } from "../posterTypes";
import { backendUrl, endpoint } from "../util/endpointConfig";
import { mapPosterDataOutgoing } from "../util/mapPosterData";

export async function loadPoster(posterId: string): Promise<IStarPoster> {
  const url = `${backendUrl}${endpoint}/${posterId}`;
  const response = await fetch(url, { method: "GET" });
  const poster = await response.json();
  poster.date = new Date(poster.date);
  poster.dedication = (poster.dedication || "").split("\n");
  // TODO: Add a typeguard here
  return poster;
}

export async function savePoster(poster: IStarPoster): Promise<string> {
  const url = `${backendUrl}posters/create`;
  const backendPoster = mapPosterDataOutgoing(poster);
  const body = JSON.stringify(backendPoster, undefined, 2);
  const response = await fetch(url, {
    method: "POST",
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  if (response.status !== 201) {
    throw new Error(await response.text());
  }
  const id = await response.json();
  return id.id;
}

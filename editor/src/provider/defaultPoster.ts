import { IStarPoster, Shapes } from "../posterTypes";
import formatDate from "@/util/formatDate";
import styles from "../styles";
import getCapitalCity from "./getCapitalCity";
const location = getCapitalCity();
import dayjs from "dayjs";

export default function defaultPoster(): IStarPoster {
  const date = dayjs()
    .startOf("day")
    .toDate();
  return {
    location: {
      locationName: location.city,
      lat: location.lat,
      long: location.long
    },
    date,
    dateFormatted: formatDate(date),
    displayTime: false,
    advancedOptions: {
      customLocation: "",
      customDate: "",
      showLocation: true,
      showCoordinates: true,
      showDate: true
    },
    dedication: [],
    style: styles.black,
    shape: Shapes.CIRCLE,
    options: {
      lightBackground: true,
      constellations: true,
      milkyway: true,
      coordinateGrid: false
    }
  };
}

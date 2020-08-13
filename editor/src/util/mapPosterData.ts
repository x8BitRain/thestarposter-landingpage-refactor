// This maps backend poster data to the 'poster' object format in the editor.
import styles from "../styles";
import { IStarPoster } from "../posterTypes";

const mapPosterDataIncoming = (poster): IStarPoster => {
  let useLightBackground = false;
  let styleNameIn = poster.style;
  if (poster.style.includes("OnLight")) {
    useLightBackground = true;
    styleNameIn = poster.style.replace("OnLight", "");
  }
  const mappedPosterDataRecieved = {
    location: {
      locationName: poster.location,
      lat: poster.coords[0],
      long: poster.coords[1]
    },
    date: new Date(poster.posterDate),
    dateFormatted: poster.posterDateFormatted,
    displayTime: poster.displayTime,
    advancedOptions: {
      customLocation: poster.customLocation,
      customDate: poster.customDate,
      showLocation: poster.showLocation,
      showCoordinates: poster.showCoordinates,
      showDate: poster.showDate
    },
    dedication: poster.dedication || "".split("\n"),
    style: styles[styleNameIn],
    shape: poster.shape,
    options: {
      lightBackground: useLightBackground,
      constellations: poster.showConstellations,
      milkyway: poster.showMilkyway,
      coordinateGrid: poster.showCoordinateNet
    }
  };
  return mappedPosterDataRecieved;
};

const mapPosterDataOutgoing = (poster: IStarPoster) => {
  let styleNameOut: string;
  if (poster.options.lightBackground) {
    styleNameOut = poster.style.name + "OnLight";
  } else {
    styleNameOut = poster.style.name;
  }
  const mappedPosterDataSend = {
    posterDate: poster.date.toISOString(),
    posterDateFormatted: poster.dateFormatted,
    location: poster.location.locationName,
    customLocation: poster.advancedOptions.customLocation,
    customDate: poster.advancedOptions.customDate,
    dedication: poster.dedication.join("\n"),
    style: styleNameOut,
    shape: poster.shape,
    showStars: true,
    showMilkyway: poster.options.milkyway,
    showCoordinateNet: poster.options.coordinateGrid,
    showConstellations: poster.options.constellations,
    showDate: poster.advancedOptions.showDate,
    showLocation: poster.advancedOptions.showDate,
    showCoordinates: poster.advancedOptions.showCoordinates,
    displayTime: poster.displayTime,
    lat: poster.location.lat,
    long: poster.location.long,
    version: 1.2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coords: [poster.location.lat, poster.location.long]
  };
  return mappedPosterDataSend;
};

export { mapPosterDataIncoming, mapPosterDataOutgoing };

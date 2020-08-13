export interface IStarPoster {
  location: ILocation;
  date: Date;
  dateFormatted: string;
  displayTime: boolean;
  advancedOptions: IAdvancedOptions;
  dedication: string[];
  style: IColor;
  shape: Shapes;
  options: IOptions;
}

export interface IAdvancedOptions {
  customLocation: string;
  customDate: string;
  showLocation: boolean;
  showCoordinates: boolean;
  showDate: boolean;
}

export interface IOptions {
  lightBackground: boolean;
  constellations: boolean;
  milkyway: boolean;
  coordinateGrid: boolean;
}

export enum Shapes {
  CIRCLE = "circle",
  HEART = "heart"
}

export interface ICurrentDate {
  day: string;
  month: number;
  time: string;
  year: number;
}

export interface IColor {
  mapColor: string;
  backgroundColor: string;
  textColor: string;
  starColor: string;
  milkywayOpacity: number;
  name: string;
  milkywayColor: string;
  mapDetailFactor: number;
  hidden: boolean;
  date: string;
}

export interface ILocation {
  locationName: string;
  lat: number;
  long: number;
}

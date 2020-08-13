import {
  Degree,
  isDegree,
  Lat,
  Long,
  isLat,
  isLong,
  Radial
} from "./math/types";

export interface IGeographicCoords {
  latitude: Lat;
  longitude: Long;
}
export interface IEquatorialCoords {
  declination: Lat;
  rightAscension: Degree;
}
export interface IHorizontalCoords {
  altitude: Lat;
  azimuth: Degree;
}
export interface ICartesianCoords {
  x: number;
  y: number;
}

export interface IRadialHorizontalCoords {
  altitude: Radial<Lat>;
  azimuth: Radial<Degree>;
}

export class GeographicCoords implements IGeographicCoords {
  latitude: Lat;
  longitude: Long;

  constructor(lat: Lat, lon: Long) {
    if (!isLat(lat))
      throw new Error("The latitude should be between -90 and 90 degrees.");
    if (!isLong(lon))
      throw new Error("The longitude should be between -180 and 180 degrees.");
    this.latitude = lat;
    this.longitude = lon;
  }
}

export class EquatorialCoords implements IEquatorialCoords {
  declination: Lat;
  rightAscension: Degree;

  constructor(dec: Lat, ra: Degree) {
    if (!isLat(dec))
      throw new Error("The declination should be between -90 and 90 degrees.");
    if (!isDegree(ra))
      throw new Error(
        "The right ascension should be between 0 and 360 degrees."
      );
    this.declination = dec;
    this.rightAscension = ra;
  }
}

export class HorizontalCoords implements IHorizontalCoords {
  altitude: Lat;
  azimuth: Degree;

  constructor(alt: Lat, az: Degree) {
    if (!isLat(alt))
      throw new Error("The altitude should be between -90 and 90 degrees.");
    if (!isDegree(az))
      throw new Error("The azimuth should be between 0 and 360 degrees.");
    this.altitude = alt;
    this.azimuth = az;
  }
}

export class CartesianCoords implements ICartesianCoords {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

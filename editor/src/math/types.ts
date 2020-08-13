interface IDegreeUnits {
  unit: "degree";
}

interface ILatitudeBrand extends IDegreeUnits {
  _type: "Latitude";
}
interface ILongitudeBrand extends IDegreeUnits {
  _type: "Longitude";
}
interface IMagnitudeBrand {
  _type: "Magnitude";
}
interface IRadialUnits {
  unit: "radial";
}

export type Radial<T extends number> = number & Omit<T, "unit"> & IRadialUnits;

export type Degree = number & IDegreeUnits;
export type Lat = number & ILatitudeBrand;
export type Long = number & ILongitudeBrand;
export type Magnitude = number & IMagnitudeBrand;

export function isDegree(n: number): n is Degree {
  return n >= 0 && n <= 360;
}

export function isLat(n: number): n is Lat {
  return n >= -90 && n <= 90;
}

export function isLong(n: number): n is Long {
  return n >= -180 && n <= 180;
}

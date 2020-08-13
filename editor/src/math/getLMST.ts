// datetime in UTC

import { IGeographicCoords } from "@/starmap-math";

import { Degree } from "@/math/types";

// returns the local mean sidereal time (LMST) in degrees
export default function getLMST(
  datetime: Date,
  localCoords: IGeographicCoords
): Degree {
  // calculate days since J2000.0
  const days: number = datetime.getTime() / 86400000 - 10957.5;
  // calculate centuries since J2000.0
  const centuries: number = days / 36525.0;
  // LMST in degrees
  let lmst: number =
    280.46061837 +
    360.98564736629 * days +
    0.000387933 * centuries * centuries -
    (centuries * centuries * centuries) / 38710000 +
    localCoords.longitude;
  // normalize LMST
  if (lmst > 0.0) {
    while (lmst > 360.0) lmst = lmst - 360.0;
  } else {
    while (lmst < 0.0) lmst = lmst + 360.0;
  }
  return lmst as Degree;
}

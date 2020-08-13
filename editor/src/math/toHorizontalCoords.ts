import {
  IGeographicCoords,
  IEquatorialCoords,
  IRadialHorizontalCoords
} from "@/starmap-math";
import getLMST from "./getLMST";
import { Radial, Lat, Degree } from "@/math/types";
import { degreeToRadian, radianToDegree } from "./util";

export function toHorizontalCoords(
  datetime: Date,
  localCoords: IGeographicCoords,
  // Anything beyond below this angle will not be computed and undefined returned for it
  cutOffDegree: Degree = 0 as Degree
): (c: IEquatorialCoords) => IRadialHorizontalCoords | undefined {
  const lmst = getLMST(datetime, localCoords);
  const latitudeAsRadian = degreeToRadian(localCoords.latitude);
  const cutOffRadial = degreeToRadian(cutOffDegree);
  return (coords: IEquatorialCoords) => {
    const hourAngleAsRadian = calculateHourAngle(lmst, coords.rightAscension);
    const declinationAsRadian = degreeToRadian(coords.declination);
    const altitudeAsRadian = calculateAltitude(
      latitudeAsRadian,
      declinationAsRadian,
      hourAngleAsRadian
    );
    if (altitudeAsRadian < cutOffRadial) {
      return undefined;
    }
    return {
      altitude: altitudeAsRadian,
      azimuth: calculateAzimuth(
        latitudeAsRadian,
        declinationAsRadian,
        hourAngleAsRadian,
        altitudeAsRadian
      )
    };
  };
}

function calculateAltitude(
  latitude: Radial<Lat>,
  declination: Radial<Lat>,
  hourAngle: Radial<Degree>
): Radial<Lat> {
  return Math.asin(
    Math.sin(latitude) * Math.sin(declination) +
      Math.cos(latitude) * Math.cos(declination) * Math.cos(hourAngle)
  ) as Radial<Lat>;
}

function calculateAzimuth(
  latitude: Radial<Lat>,
  declination: Radial<Lat>,
  hourAngle: Radial<Degree>,
  altitude: Radial<Lat>
): Radial<Degree> {
  return -Math.atan2(
    Math.cos(hourAngle) * Math.sin(latitude) -
      Math.tan(declination) * Math.cos(latitude),
    Math.sin(hourAngle)
  ) as Radial<Degree>;
}

function calculateHourAngle(
  LMST: Degree,
  rightAscension: Degree
): Radial<Degree> {
  const result = degreeToRadian(LMST - rightAscension);
  if (result < 0) return (result + 2 * Math.PI) as Radial<Degree>;
  return result as Radial<Degree>;
}

import { IRadialHorizontalCoords, ICartesianCoords } from "@/starmap-math";

export default function toCartesianCoords(
  coords: IRadialHorizontalCoords
): ICartesianCoords {
  const azimuthAsRadian = coords.azimuth;
  // calculate polar angle in spherical coordinate system
  const polarAngle = coords.altitude + Math.PI / 2;
  // calculate radius in polar coordinate system
  const radius = 2 * Math.cos(polarAngle / 2);
  // calculate x and y in cartesian coordinate system
  return {
    x: (radius * Math.cos(azimuthAsRadian) + Math.sqrt(2)) / (2 * Math.sqrt(2)),
    y: (-radius * Math.sin(azimuthAsRadian) + Math.sqrt(2)) / (2 * Math.sqrt(2))
  };
}

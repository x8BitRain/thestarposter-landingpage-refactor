import {
  IEquatorialStar,
  ICartesianStar,
  ICartestianConstellation,
  IConstellation,
  getConstellationData,
  getMilkywayData,
  getStarData
} from "@/provider/starsProvider";
import {
  ICartesianCoords,
  IEquatorialCoords,
  IRadialHorizontalCoords
} from "@/starmap-math";
import { isLat, isLong, Lat, Degree, Long } from "./types";
import { toHorizontalCoords } from "./toHorizontalCoords";
import toCartesianCoords from "./toCartesianCoords";

export interface ICelestialPos {
  lat: Lat;
  long: Long;
  date: Date;
}

export interface ICelestial {
  stars: ICartesianStar[];
  constellations: IConstellation<ICartesianCoords>[];
  milkyWay: IConstellation<ICartesianCoords>[];
  graticule: ICartesianCoords[][];
  position: ICelestialPos;
  meta: {
    // indicates how much of the animation played at this point
    animationPortion?: number;
    // time in which it was computed
    computedIn: number;
  };
}
function projectStar(
  projection: (c: IEquatorialCoords) => IRadialHorizontalCoords | undefined,
  star: IEquatorialStar
): ICartesianStar | undefined {
  const horizonalCoords = projection(star);
  if (!horizonalCoords) {
    return undefined;
  }

  const coords = toCartesianCoords(horizonalCoords);
  return {
    ...coords,
    magnitude: star.magnitude
  };
}

function filterUndefined<T>(array: Array<T | undefined>): Array<T> {
  return array.filter(a => !!a) as Array<T>;
}

function getConstellations(
  lat: number,
  long: number,
  date: Date
): ICartestianConstellation[] {
  if (!isLat(lat)) {
    throw new TypeError("lat out of bounds");
  }
  if (!isLong(long)) {
    throw new TypeError("long out of bounds");
  }
  const horizonalProjection = toHorizontalCoords(
    date,
    {
      latitude: lat,
      longitude: long
    },
    -30 as Degree
  );

  const result: ICartestianConstellation[] = [];

  for (const constellation of getConstellationData()) {
    const paths: ICartesianCoords[][] = [];
    for (const path of constellation.paths) {
      let newPath: ICartesianCoords[] = [];
      for (const coord of path) {
        const horizontalCoord = horizonalProjection(coord);
        if (!horizontalCoord) {
          if (newPath.length) {
            paths.push(newPath);
            newPath = [];
          }
          continue;
        }
        newPath.push(toCartesianCoords(horizontalCoord));
      }
      if (newPath.length) {
        paths.push(newPath);
      }
    }
    if (paths.length) {
      result.push({
        paths
      });
    }
  }
  return result;
}

function getMilkyWay(
  lat: number,
  long: number,
  date: Date
): ICartestianConstellation[] {
  if (!isLat(lat)) {
    throw new TypeError("lat out of bounds");
  }
  if (!isLong(long)) {
    throw new TypeError("long out of bounds");
  }
  const horizonalProjection = toHorizontalCoords(
    date,
    {
      latitude: lat,
      longitude: long
    },
    -30 as Degree
  );

  const result: ICartestianConstellation[] = [];
  for (const polygon of getMilkywayData()) {
    const paths: ICartesianCoords[][] = [];
    let pathOverSeveralCorners: ICartesianCoords[] = [];
    for (const path of polygon.paths) {
      let newPath: ICartesianCoords[] = [];
      let previousUndefined = false;
      let firstPoint = true;
      let isFirstElementUndefined = false;
      for (const coord of path) {
        const horizontalCoord = horizonalProjection(coord);
        if (!horizontalCoord) {
          previousUndefined = true;
          continue;
        }
        const point = toCartesianCoords(horizontalCoord);
        if (previousUndefined && firstPoint) isFirstElementUndefined = true;
        if (previousUndefined && !firstPoint) {
          let pathOverCorners = getPathOverCorners(
            newPath[newPath.length - 1],
            point
          );
          if (pathOverCorners.length > 1) {
            if (!pathOverSeveralCorners.length)
              pathOverSeveralCorners = pathOverCorners;
            else pathOverCorners = pathOverSeveralCorners;
          }
          newPath = newPath.concat(pathOverCorners);
          previousUndefined = false;
        }
        newPath.push(point);
        firstPoint = false;
      }
      if (newPath.length) {
        if (previousUndefined || isFirstElementUndefined) {
          let pathOverCorners = getPathOverCorners(
            newPath[newPath.length - 1],
            newPath[0]
          );
          if (pathOverCorners.length > 1) {
            if (!pathOverSeveralCorners.length)
              pathOverSeveralCorners = pathOverCorners;
            else pathOverCorners = pathOverSeveralCorners;
          }
          newPath = newPath.concat(pathOverCorners);
        }
        paths.push(newPath);
      }
    }
    if (paths.length) {
      result.push({
        paths
      });
    }
  }
  return result;
}

function getPathOverCorners(
  firstCoords: ICartesianCoords,
  secondCoords: ICartesianCoords
): ICartesianCoords[] {
  if (getDistance(firstCoords, secondCoords) < 0.3) return [];
  const firstCorner = getNearestCorner(firstCoords);
  const secondCorner = getNearestCorner(secondCoords);
  if (firstCorner.x - secondCorner.x == 0) {
    if (firstCorner.y - secondCorner.y == 0) return [firstCorner];
    return [firstCorner, secondCorner];
  }
  if (firstCorner.y - secondCorner.y == 0) return [firstCorner, secondCorner];
  const interPoint = {
    x: (firstCoords.x + secondCoords.x) / 2,
    y: (firstCoords.y + secondCoords.y) / 2
  };
  return [firstCorner, getNearestCorner(interPoint), secondCorner];
}

function getNearestCorner(coords: ICartesianCoords): ICartesianCoords {
  const max = 2;
  const min = -1;
  if (coords.x > 0.5) {
    if (coords.y > 0.5) return { x: max, y: max };
    return { x: max, y: min };
  }
  if (coords.y > 0.5) return { x: min, y: max };
  return { x: min, y: min };
}

function cartesianCoordsIsEqual(
  firstCoords: ICartesianCoords,
  secondCoords: ICartesianCoords
): boolean {
  if (firstCoords.x == secondCoords.x && firstCoords.y == secondCoords.y)
    return true;
  return false;
}

function getDistance(
  firstPoint: ICartesianCoords,
  secondPoint: ICartesianCoords
) {
  return Math.sqrt(
    Math.pow(firstPoint.x - secondPoint.x, 2) +
      Math.pow(firstPoint.y - secondPoint.y, 2)
  );
}

function getGraticule(
  lat: number,
  long: number,
  date: Date,
  accuracy: number
): ICartesianCoords[][] {
  if (!isLat(lat)) {
    throw new TypeError("lat out of bounds");
  }
  if (!isLong(long)) {
    throw new TypeError("long out of bounds");
  }
  const horizonalProjection = toHorizontalCoords(
    date,
    {
      latitude: lat,
      longitude: long
    },
    -accuracy as Degree
  );

  const graticuleEquatorial: IEquatorialCoords[][] = [];
  for (let latitude = -80; latitude <= 80; latitude += 10) {
    const latitudeAccuracy =
      accuracy * (Math.sqrt(90) / Math.sqrt(-Math.abs(latitude) + 90));
    const circleOfLatitude: IEquatorialCoords[] = [];
    for (let longitude = -180; longitude < 180; longitude += latitudeAccuracy) {
      circleOfLatitude.push({
        declination: latitude as Lat,
        rightAscension: longitude as Degree
      });
    }
    circleOfLatitude.push({
      declination: latitude as Lat,
      rightAscension: 180 as Degree
    });
    graticuleEquatorial.push(circleOfLatitude);
  }

  const longitudeAccuracy = accuracy;
  for (let longitude = -180; longitude < 180; longitude += 15) {
    const circleOfLongitude: IEquatorialCoords[] = [];
    let maxLatitude = 80;
    if (longitude % 90 == 0) {
      maxLatitude = 90;
    }
    for (
      let latitude = -maxLatitude;
      latitude < maxLatitude;
      latitude += longitudeAccuracy
    ) {
      circleOfLongitude.push({
        declination: latitude as Lat,
        rightAscension: longitude as Degree
      });
    }
    circleOfLongitude.push({
      declination: maxLatitude as Lat,
      rightAscension: longitude as Degree
    });
    graticuleEquatorial.push(circleOfLongitude);
  }

  const graticuleCartesian: ICartesianCoords[][] = [];
  for (const path of graticuleEquatorial) {
    let newPath: ICartesianCoords[] = [];
    for (const coord of path) {
      const horizontalCoord = horizonalProjection(coord);
      if (!horizontalCoord) {
        if (newPath.length) {
          graticuleCartesian.push(newPath);
          newPath = [];
        }
        continue;
      }
      newPath.push(toCartesianCoords(horizontalCoord));
    }
    if (newPath.length) graticuleCartesian.push(newPath);
  }
  return graticuleCartesian;
}

export function getCelestial(
  lat: number,
  long: number,
  date: Date,
  graticuleAccuracy: number,
  animationPortion?: number
): ICelestial {
  const computationStartTime = Date.now();
  if (!isLat(lat)) {
    throw new TypeError("lat out of bounds");
  }
  if (!isLong(long)) {
    throw new TypeError("long out of bounds");
  }
  const horizonalProjecton = toHorizontalCoords(date, {
    latitude: lat,
    longitude: long
  });

  const projectedStars = filterUndefined(
    getStarData().map(s => projectStar(horizonalProjecton, s))
  );
  return {
    stars: projectedStars,
    constellations: getConstellations(lat, long, date),
    milkyWay: getMilkyWay(lat, long, date),
    graticule: getGraticule(lat, long, date, graticuleAccuracy),
    position: {
      date,
      lat,
      long
    },
    meta: {
      animationPortion,
      computedIn: Date.now() - computationStartTime
    }
  };
}

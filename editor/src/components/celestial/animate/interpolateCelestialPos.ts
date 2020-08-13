import { ICelestialPos } from "@/math";
import { ICelestialPosWithAnimationPortion } from "./Animator";
import { Lat, Long } from "@/math/types";

export default function interpolateCelestialPos(
  startPos: ICelestialPos,
  endPos: ICelestialPos,
  fraction: number,
  animationPortion: number
): ICelestialPosWithAnimationPortion {
  const linearInterpolate = (a: number, b: number) => (b - a) * fraction + a;
  return {
    lat: linearInterpolate(startPos.lat, endPos.lat) as Lat,
    long: linearInterpolate(startPos.long, endPos.long) as Long,
    date: interpolateDate(startPos.date, endPos.date, fraction),
    animationPortion
  };
}

function interpolateDate(startDate: Date, endDate: Date, fraction: number) {
  const dayInMillis = 1000 * 60 * 60 * 24;
  const fiveDaysInMillis = dayInMillis * 5;

  const totalDifference = endDate.getTime() - startDate.getTime();
  if (Math.abs(totalDifference) < fiveDaysInMillis) {
    return new Date(startDate.getTime() + totalDifference * fraction);
  } else {
    const dayDifference = totalDifference % dayInMillis;
    let newDate = startDate.getTime();
    newDate +=
      Math.floor((totalDifference * fraction) / dayInMillis) * dayInMillis;
    newDate += dayDifference * fraction;
    return new Date(newDate);
  }
}

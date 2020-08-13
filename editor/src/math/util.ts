import { Radial } from "@/math/types";

export function radianToDegree<T extends number>(n: Radial<T>): T {
  return ((n * 180) / Math.PI) as T;
}

export function degreeToRadian<T extends number>(n: T): Radial<T> {
  return ((n * Math.PI) / 180) as Radial<T>;
}

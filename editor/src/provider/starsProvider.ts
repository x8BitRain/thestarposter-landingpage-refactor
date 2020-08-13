import { IEquatorialCoords, ICartesianCoords } from "@/starmap-math";
import { Magnitude } from "@/math/types";

import stars from "../assets/data/stars.6.slim.json";
import constellations from "../assets/data/constellations.slim.json";

let milkyway: Array<any> = []; //_rawMilkyWay;

import(
  /* webpackChunkName: "editor-assets/worker/milkyway" */ "../assets/data/mw.slimer.json"
).then(module => {
  milkyway = module.default;
});

export interface IStarData {
  magnitude: Magnitude;
}

export interface IConstellation<T> {
  paths: T[][];
}

export type IEquatorialConstellation = IConstellation<IEquatorialCoords>;
export type ICartestianConstellation = IConstellation<ICartesianCoords>;

export interface IEquatorialStar extends IEquatorialCoords, IStarData {}
export interface ICartesianStar extends ICartesianCoords, IStarData {}

export function getStarData(): IEquatorialStar[] {
  return stars as Array<any>;
}
export function getConstellationData(): IEquatorialConstellation[] {
  return constellations as Array<any>;
}
export function getMilkywayData(): IEquatorialConstellation[] {
  return milkyway as Array<any>;
}

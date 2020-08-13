import { ICelestial, ICelestialPos } from "@/math";

import Easers from "./Easers";
import getCelestialAsPromise from "./webworker/getCelestialAsPromise";
import interpolateCelestialPos from "./interpolateCelestialPos";
import parameters from "../../../util/urlParameters";

const ANIMATION_DURATION = 2000;

const printMode = parameters.printMode;

export interface IWebWorker {
  run: any;
}

export interface ICelestialPosWithAnimationPortion extends ICelestialPos {
  animationPortion: number;
}

export function Animator(startPos: ICelestialPos, endPos: ICelestialPos) {
  // start time of the animation
  let animationStart;
  // most recent position that was displayed on the celestial
  let currentPos: ICelestialPos = startPos;
  // boolean indicating if a celestial has been computed before (if not we delay the animation start)
  let firstCelestialComputed = false;
  // computed celestials from the webworker
  let celestials: ICelestial[] = [];
  // indicates the how manyth animation this is (used for determining if an animation became stale)
  let animationNumber = 0;
  const pendingPromises: ((celestial: ICelestial) => void)[] = [];
  async function changeAnimationTarget(
    startPos: ICelestialPos,
    endPos: ICelestialPos
  ) {
    const localAnimationNumber = ++animationNumber;
    firstCelestialComputed = false;
    animationStart = Date.now();
    celestials = [];

    if (printMode) {
      await computeCelestial({
        ...endPos,
        animationPortion: 1
      });
      return;
    }
    // this should not always be needed, only if we draw for the first time
    await computeCelestial({
      ...startPos,
      animationPortion: 0
    });
    while (localAnimationNumber === animationNumber) {
      const targetPortion = Math.min(
        currentAnimationPortion() + 1 / ANIMATION_DURATION,
        1
      );

      const easer = animationNumber === 1 ?  Easers.easeOutQuint : Easers.easeInOutQuint
      const position = interpolateCelestialPos(
        startPos,
        endPos,
        easer(targetPortion),
        targetPortion
      );
      await computeCelestial(position);

      if (targetPortion === 1) {
        break;
      }
    }
  }
  changeAnimationTarget(startPos, endPos);

  // lets the webworker compute a celestial
  async function computeCelestial(pos: ICelestialPosWithAnimationPortion) {
    try {
      const celestial = await getCelestialAsPromise(pos);
      if (!firstCelestialComputed) {
        firstCelestialComputed = true;
        animationStart = Date.now();
      }
      if (celestial.meta.animationPortion === undefined) {
        throw new Error("Celestial must have animationPortion");
      }

      const pendingPromise = pendingPromises.shift();
      if (pendingPromise) {
        pendingPromise(celestial);
      } else {
        celestials.push(celestial);
      }
    } catch (e) {
      console.error(e);
      console.log("computation dropped");
    }
  }

  // the animation portion is a value between 0 and 1
  function currentAnimationPortion(): number {
    if (!firstCelestialComputed) {
      return 0;
    }
    if (printMode) {
      return 1;
    }
    return Math.min((Date.now() - animationStart) / ANIMATION_DURATION, 1);
  }

  async function getCelestial(): Promise<ICelestial> {
    const result = celestials.shift();
    if (result) {
      return result;
    }
    return new Promise(res => {
      pendingPromises.push(res);
    });
  }

  return {
    changeLocation(endPos: ICelestialPos): void {
      changeAnimationTarget(currentPos, endPos);
    },
    async next(): Promise<ICelestial> {
      const celestial = await getCelestial();
      currentPos = celestial.position;
      return celestial;
    },
    isAnimationRunning(): boolean {
      /*if (printMode) {
        return false
      }*/
      return currentAnimationPortion() !== 1;
    }
  };
}

function interpolateCelestial(
  celestialA: ICelestial,
  celestialB: ICelestial,
  currentPos: ICelestialPos
): ICelestial {
  // TODO: do magic here
  return celestialA;
}

import { getCelestial } from "../../../../math";
import { ICelestialPosWithAnimationPortion } from "../Animator";
import { IRequestToWebWorker, IResponseFromWebWorker } from "./messgeTypes";

const avgTimePerCelestial = 0;
const numComputed = 0;

const ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", event => {
  try {
    const request: IRequestToWebWorker = event.data;
    const pos: ICelestialPosWithAnimationPortion = request.celestialRequest;
    const celestial = getCelestial(
      pos.lat,
      pos.long,
      pos.date,
      6,
      pos.animationPortion
    );

    /*numComputed++;
    avgTimePerCelestial =
      (avgTimePerCelestial * (numComputed - 1) + celestial.meta.computedIn) /
      numComputed;
    if (numComputed % 30 === 0) {
      console.log("compute time", celestial.meta.computedIn);
    }*/

    const response: IResponseFromWebWorker = {
      answer: "SUCCESS",
      celestial,
      messageId: request.messageId
    };
    // Post data to parent thread
    ctx.postMessage(response);
  } catch (e) {
    console.error(e);
  }
});

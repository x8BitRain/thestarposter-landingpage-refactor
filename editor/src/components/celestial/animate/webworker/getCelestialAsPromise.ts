import { ICelestial } from "@/math";
import Worker from "worker-loader?name=editor-assets/worker/worker.js!./worker";
import { ICelestialPosWithAnimationPortion } from "../Animator";
import { IResponseFromWebWorker, IRequestToWebWorker } from "./messgeTypes";

const worker = new Worker();
let globalMessageId = 0;

export interface IOutsideAnswer {
  res: (celestial: ICelestial) => void;
  rej: (error: Error) => void;
}

const openAnswers: Record<number, IOutsideAnswer> = {};

export default function getCelestialAsPromise(
  request: ICelestialPosWithAnimationPortion
): Promise<ICelestial> {
  const messageId = globalMessageId++;

  return new Promise((res, rej) => {
    openAnswers[messageId] = { res, rej };
    worker.postMessage({
      celestialRequest: request,
      messageId
    } as IRequestToWebWorker);
  });
}

worker.addEventListener("message", function(event) {
  const data: IResponseFromWebWorker = event.data;

  const answer = openAnswers[data.messageId];
  delete openAnswers[data.messageId];

  if (!answer) {
    throw new Error("Outside answer was undefined.");
  }
  if (data.answer === "SUCCESS") {
    answer.res(data.celestial);
  } else {
    answer.rej(new Error(data.answer));
  }
});

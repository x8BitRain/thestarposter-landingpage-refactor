import { ICelestialPosWithAnimationPortion } from "../Animator";
import { ICelestial } from "@/math";

export interface IRequestToWebWorker {
  messageId: number;
  celestialRequest: ICelestialPosWithAnimationPortion;
}

interface ISuccessfulRequestFromWebWorker {
  messageId: number;
  answer: "SUCCESS";
  celestial: ICelestial;
}

interface IErrorFromWebWorker {
  messageId: number;
  answer: "TIMEOUT";
}

export type IResponseFromWebWorker =
  | ISuccessfulRequestFromWebWorker
  | IErrorFromWebWorker;

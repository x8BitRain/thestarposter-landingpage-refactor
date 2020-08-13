import { IStarPoster } from "../posterTypes";
import defaultPoster from "./defaultPoster";
import urlParameters from "../util/urlParameters";
import { loadPoster } from "./endpoint";
import { translationLoaded } from "@/i18n";
import { mapPosterDataIncoming } from "../util/mapPosterData";
import { readPosterLocalStorage } from "../util/posterLocalStorage";

export interface IDBSettings {
  initialPosterId?: string;
  currentPosterId?: string;
}

export interface ILoadedEditorData {
  poster: IStarPoster;
  isPrintMode: boolean;
  dbSettings: IDBSettings;
  isLoading: false;
  translationLoaded: {
    loaded: boolean;
  };
}

export interface ILoadingEditorData {
  poster: {};
  isPrintMode: boolean;
  dbSettings: IDBSettings;
  isLoading: true;
  translationLoaded: {
    loaded: boolean;
  };
}

export type IEditorData = ILoadedEditorData | ILoadingEditorData;

export default function makeEditorData(): IEditorData {
  if (urlParameters.posterId) {
    const result: IEditorData = {
      poster: {},
      isPrintMode: urlParameters.printMode,
      dbSettings: {
        initialPosterId: urlParameters.posterId
      },
      isLoading: true,
      translationLoaded
    };
    if (urlParameters.posterId !== "undefined") {
      localStorage.setItem("currentPosterId", urlParameters.posterId);
    }
    loadPoster(urlParameters.posterId).then(poster => {
      const mappedPoster = mapPosterDataIncoming(poster);
      Object.assign(result, {
        poster: mappedPoster
      });
      Object.assign(result, {
        isLoading: false
      });
    });
    return result;
  } else if (
    localStorage.getItem("savedPoster") &&
    !urlParameters.posterId &&
    !urlParameters.printMode
  ) {
    return {
      poster: readPosterLocalStorage(),
      isPrintMode: urlParameters.printMode,
      dbSettings: {
        currentPosterId: undefined,
        initialPosterId: undefined
      },
      isLoading: false,
      translationLoaded
    };
  } else {
    return {
      poster: defaultPoster(),
      isPrintMode: urlParameters.printMode,
      dbSettings: {
        currentPosterId: undefined,
        initialPosterId: undefined
      },
      isLoading: false,
      translationLoaded
    };
  }
}

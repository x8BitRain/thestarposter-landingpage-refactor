import { IStarPoster } from "../posterTypes";
const maxSaveFrequency = 850;
let timeout = -1;

const preventRefresh = (e) => {
  e.preventDefault()
  e.returnValue = Boolean("")
}

// debounced so localstorage isn't written so frequently.
const writePosterLocalStorage = async (
  posterProps: IStarPoster
): Promise<void> => {
  clearTimeout(timeout);
  await new Promise(res => {
    timeout = setTimeout(res, maxSaveFrequency);
  });
  localStorage.setItem("savedPoster", JSON.stringify(posterProps));
  window.addEventListener("beforeunload", preventRefresh, true)
};

const readPosterLocalStorage = (): IStarPoster => {
  const localPoster = JSON.parse(localStorage.getItem("savedPoster") || "");
  localPoster.date = new Date(localPoster.date);
  return localPoster;
};

const resetUnsavedPoster = () => {
  window.removeEventListener("beforeunload", preventRefresh, true)
  localStorage.removeItem("savedPoster");
}

export { writePosterLocalStorage, readPosterLocalStorage, resetUnsavedPoster };

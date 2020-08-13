interface IURLParameters {
  printMode: boolean;
  posterId: string | undefined;
}

function parseURLParameters(): { [s: string]: string } {
  const parameters: { [s: string]: string } = {};
  const search = decodeURIComponent(location.search.substring(1));
  const backParams = location.href.split("?")[1]

  search.split("&").forEach(raw => {
    const key = raw.split("=")[0];
    const value = raw.split("=")[1];
    parameters[key] = value;
  });
  if (!parameters.posterId && backParams) {
    parameters.posterId = backParams.split("=")[1];
  }
  return parameters;
}

const rawURLParameters = parseURLParameters();
const parameters: IURLParameters = {
  printMode: !!rawURLParameters.printMode,
  posterId: rawURLParameters.posterId || undefined
};

export default parameters;

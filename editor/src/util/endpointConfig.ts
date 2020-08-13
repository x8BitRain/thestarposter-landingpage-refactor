import { getEnvironment } from "./getEnvironment";

const environment = getEnvironment();

function getCartUrl(): string {
  if (environment === "prod") {
    return "../cart/";
  } else if (environment === "develop") {
    return "../cart";
  } else {
    return "http://localhost:8081";
  }
}
function getAPIEndpoint(): string {
  if (environment === "local") {
    // replace this with dev backend as needed
    //return 'http://localhost:3000/'
    return "https://backend.dev.heurekaprints.de/";
  } else if (window.location.pathname.includes("editor")) {
    return "/backend/"
    // For accessing the editor over LAN on mobile
    // For accessing the editor over ngrok.io
    // For accessing the editor over netlify deploy preview.
  } else if (window.location.host.includes("localhost") || window.location.host.includes("io") || window.location.host.includes("netlify")) {
    return "https://backend.dev.heurekaprints.de/";
  } 
  return "/backend/"; //'https://backend.heurekaprints.de/'
}
const backendUrl = getAPIEndpoint();
const cartUrl = getCartUrl();
const endpoint = "starmap";

export { backendUrl, endpoint, cartUrl };

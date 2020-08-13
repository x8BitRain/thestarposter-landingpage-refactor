var backendUrl;

if (window.location.href.indexOf("localhost") > -1) {
  backendUrl = "https://backend.dev.heurekaprints.de/";
} else {
  backendUrl = "/backend/";
}
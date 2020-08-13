import { backendUrl, endpoint } from "../util/endpointConfig";

const getCurrencies = async () => {
  const url = backendUrl + "currency/list";
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow"
  });
  const data = await response.json();
  return data;
};

const getPrices = async (currency = "EUR") => {
  const url = backendUrl + "currency/" + currency + "/starmap/prices";
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow"
  });
  const data = await response.json();
  return data;
};

export { getPrices, getCurrencies };

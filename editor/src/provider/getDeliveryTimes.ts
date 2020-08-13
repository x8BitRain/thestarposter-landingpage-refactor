import { backendUrl } from "../util/endpointConfig";
import { language } from "../util/language";

const getDeliveryTimes = async () => {
  const url = backendUrl + "services/deliveryTime/all/" + language;
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow"
  });
  const data = await response.json();
  return data;
};

export default getDeliveryTimes;

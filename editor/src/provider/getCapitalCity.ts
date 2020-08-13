import { language } from "../util/language";

const getCapitalCity = () => {
  if (language === "de") {
    return {
      city: "Berlin",
      lat: 52.520008,
      long: 13.404954
    };
  } else if (language === "fr") {
    return {
      city: "Paris",
      lat: 48.864716,
      long: 2.349014
    };
  } else if (language === "es") {
    return {
      city: "Madrid",
      lat: 40.416775,
      long: -3.70379
    };
  } else if (language === "it") {
    return {
      city: "Roma",
      lat: 41.902782,
      long: 12.496366
    };
  } else if (language === "en") {
    return {
      city: "Copenhagen",
      lat: 55.676098,
      long: 12.568337
    };
  } else {
    throw new Error("Could not find language.");
  }
};

export default getCapitalCity;

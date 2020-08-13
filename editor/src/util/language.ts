import { getCookie } from "./getSetCookies";
type InterfaceLanguage = "de" | "en" | "fr" | "es" | "it";
let language: string;
const langCookie = getCookie("nf_lang");
const domain = document.location.host.split(".")[1];
const langs = ["de", "en", "fr", "es", "it"];

// If domain doesn't match anything in lang, default to en.

if (langCookie) {
  language = langCookie;
} else if (domain) {
  if (langs.some(v => domain.includes(v))) {
    language = domain;
  } else {
    language = "en";
  }
} else {
  language = "en";
}

export { language, InterfaceLanguage };

import VueI18n from "vue-i18n";
import { backendUrl } from "./util/endpointConfig";
import { language } from "./util/language";

export const translationLoaded: { loaded: boolean } = {
  loaded: false
};

export function init(): VueI18n {
  const i18n = new VueI18n({
    locale: language, // set locale
    fallbackLocale: "en",
    messages: {}
  });
  loadLanguage(language, i18n).then(() => (translationLoaded.loaded = true));
  if (language !== "en") {
    loadLanguage("en", i18n);
  }
  return i18n;
}

async function loadLanguage(lang: string, i18n: VueI18n) {
  const request = await fetch(backendUrl + `translations/${lang}/starmap.json`);
  const messages = await request.json();
  i18n.setLocaleMessage(lang, messages);
}

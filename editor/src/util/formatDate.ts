export default function formatDate(date: Date) {
  // the docs say that when you pass undefined to "toLocaleDateString" it should use the default language. However mine (Daniel's) Firefox and Chrome do not do that, therefore I pass the language
  const userLang = navigator.language;
  return date.toLocaleDateString(userLang, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

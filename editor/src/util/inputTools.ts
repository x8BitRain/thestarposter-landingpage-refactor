let lines;

const lineBreaker = (e: string) => {
  lines = e.split("\n");
  return lines;
};

const lineTooLong = (lines: string[]) => {
  let isTooLong = false;
  lines.forEach(line => {
    if (line.length > 40) {
      isTooLong = true;
    }
  });
  return isTooLong;
};

/* eslint-disable */
const filterIllegalCharacters = (input: string) => {
  const allowedLetterCharacters = ["À", "Á", "Â", "Ã", "Å", "Ấ", "Ắ", "Ẳ", "Ẵ", "Ặ", "Æ", "Ầ", "Ằ", "Ȃ", "Ç", "Ḉ", "È", "É", "Ê", "Ë", "Ế", "Ḗ", "Ề", "Ḕ", "Ḝ", "Ȇ", "Ì", "Í", "Î", "Ï", "Ḯ", "Ȋ", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ø", "Ố", "Ṍ", "Ṓ", "Ȏ", "Ù", "Ú", "Û", "Ý", "à", "á", "â", "ã", "å", "ấ", "ắ", "ẳ", "ẵ", "ặ", "æ", "ầ", "ằ", "ȃ", "ç", "ḉ", "è", "é", "ê", "ë", "ế", "ḗ", "ề", "ḕ", "ḝ", "ȇ", "ì", "í", "î", "ï", "ḯ", "ȋ", "ð", "ñ", "ò", "ó", "ô", "õ", "ø", "ố", "ṍ", "ṓ", "ȏ", "ù", "ú", "û", "ý", "ÿ", "Ā", "ā", "Ă", "ă", "Ą", "ą", "Ć", "ć", "Ĉ", "ĉ", "Ċ", "ċ", "Č", "č", "C̆", "c̆", "Ď", "ď", "Đ", "đ", "Ē", "ē", "Ĕ", "ĕ", "Ė", "ė", "Ę", "ę", "Ě", "ě", "Ĝ", "Ǵ", "ĝ", "ǵ", "Ğ", "ğ", "Ġ", "ġ", "Ģ", "ģ", "Ĥ", "ĥ", "Ħ", "ħ", "Ḫ", "ḫ", "Ĩ", "ĩ", "Ī", "ī", "Ĭ", "ĭ", "Į", "į", "İ", "ı", "Ĳ", "ĳ", "Ĵ", "ĵ", "Ķ", "ķ", "Ḱ", "ḱ", "K̆", "k̆", "Ĺ", "ĺ", "Ļ", "ļ", "Ľ", "ľ", "Ŀ", "ŀ", "Ł", "ł", "Ḿ", "ḿ", "M̆", "m̆", "Ń", "ń", "Ņ", "ņ", "Ň", "ň", "ŉ", "N̆", "n̆", "Ō", "ō", "Ŏ", "ŏ", "Ő", "ő", "Œ", "œ", "P̆", "p̆", "Ŕ", "ŕ", "Ŗ", "ŗ", "Ř", "ř", "R̆", "r̆", "Ȓ", "ȓ", "Ś", "ś", "Ŝ", "ŝ", "Ş", "Ș", "ș", "ş", "Š", "š", "Ţ", "ţ", "ț", "Ț", "Ť", "ť", "Ŧ", "ŧ", "T̆", "t̆", "Ũ", "ũ", "Ū", "ū", "Ŭ", "ŭ", "Ů", "ů", "Ű", "ű", "Ų", "ų", "Ȗ", "ȗ", "V̆", "v̆", "Ŵ", "ŵ", "Ẃ", "ẃ", "X̆", "x̆", "Ŷ", "ŷ", "Ÿ", "Y̆", "y̆", "Ź", "ź", "Ż", "ż", "Ž", "ž", "Ơ", "ơ", "Ư", "ư", "Ǎ", "ǎ", "Ǐ", "ǐ", "Ǒ", "ǒ", "Ǔ", "ǔ", "Ǖ", "ǖ", "Ǘ", "ǘ", "Ǚ", "ǚ", "Ǜ", "ǜ", "Ứ", "ứ", "Ṹ", "ṹ", "Ǻ", "ǻ", "Ǽ", "ǽ", "Ǿ", "ǿ", "Þ", "þ", "Ṕ", "ṕ", "Ṥ", "ṥ", "X́", "x́", "Ѓ", "ѓ", "Ќ", "ќ", "A̋", "a̋", "E̋", "e̋", "I̋", "i̋", "Ǹ", "ǹ", "Ồ", "ồ", "Ṑ", "ṑ", "Ừ", "ừ", "Ẁ", "ẁ", "Ỳ", "ỳ", "Ȁ", "ȁ", "Ȅ", "ȅ", "Ȉ", "ȉ", "Ȍ", "ȍ", "Ȑ", "ȑ", "Ȕ", "ȕ", "B̌", "b̌", "Č̣", "č̣", "Ê̌", "ê̌", "F̌", "f̌", "Ǧ", "ǧ", "Ȟ", "ȟ", "J̌", "ǰ", "Ǩ", "ǩ", "M̌", "m̌", "P̌", "Q̌", "q̌", "Ṧ", "ṧ", "V̌", "v̌", "W̌", "w̌", "X̌", "x̌", "Y̌", "y̌", "A̧", "a̧", "B̧", "b̧", "Ḑ", "ḑ", "Ȩ", "ȩ", "ɛ̧", "Ḩ", "ḩ", "I̧", "i̧", "Ɨ̧", "ɨ̧", "M̧", "m̧", "O̧", "o̧", "Q̧", "q̧", "U̧", "u̧", "X̧", "x̧", "Z̧", "z̧",];
  const allowedSpecialCharacters = "\.|\\?|!| |,|&|\\-|\"|'|°|0-9|§|³|&|%|:|/|{|}|\\[|\\]|\\(|\\)|\\=|ß|ä|ü|ö|Ä|Ö|Ü|´|`|#|<|>|\||_|°|^|’|\\s|\‘\'\+\`\˚\∞\~\√\≈\¥\‚\∂\ƒ\©\∆\@\¡\¿\∫\µ\…\–"

  const regexString = "["+allowedSpecialCharacters+allowedLetterCharacters+"A-Za-z]"
  const regex = RegExp(regexString, 'g')
  
  if (input == '') {
      return '';
  }
  const escapedInputArr = input.match(regex);
  if (escapedInputArr == null) {
      return '';
  }
  return escapedInputArr.join("")
}

export { lineBreaker, lineTooLong, filterIllegalCharacters };

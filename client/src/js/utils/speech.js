const LANGUAGE_STRINGS = {
  1: 'es-US',
  2: 'de-DE',
  3: 'en-US'
};

export function playText(text, languageId) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = LANGUAGE_STRINGS[languageId];
  speechSynthesis.speak(msg);
}

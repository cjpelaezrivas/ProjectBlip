import {
    SPEECH_CONFIGURATIONS,
    SPEECH_TEXTS,
} from "../classes/speech-configurations.js";
import { SPEECH_LANGUAGE } from "../classes/configurations.js";
import * as localStorage from "./local-storage.js";

const SPEECH_VOLUME_MULTIPLER = 2.5;

export function alarmToSpeech(volume) {
    let language = localStorage.getValue(SPEECH_LANGUAGE).toString();

    let text = createText(language);
    textToSpeech(language, text, volume);
}

function createText(language) {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
    };

    let date = new Date();
    return `${SPEECH_TEXTS.get(language).prefix} ${date.toLocaleTimeString(
        "en-GB",
        options
    )}`;
}

function textToSpeech(language, text, volume) {
    let utter = new SpeechSynthesisUtterance();
    utter.lang = language;
    utter.text = text;
    utter.rate = SPEECH_CONFIGURATIONS.get(language).rate;
    utter.volume = volume * SPEECH_VOLUME_MULTIPLER;
    // utter.voice = getVoice(language);

    window.speechSynthesis.speak(utter);

    console.debug(`Speech to text executed. Text: ${text}`);
}

function getVoice(language) {
    let v = window.speechSynthesis.getVoices();
    let filtered = v.filter(voice => voice.lang.toLowerCase() === language.toLowerCase());

    return filtered[0];
}

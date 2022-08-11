import {
    SPEECH_CONFIGURATIONS,
    SPEECH_TEXTS,
} from "../classes/speech-configurations.js";
import { SPEECH_LANGUAGE, SPEECH_VOICE } from "../classes/configurations.js";
import * as localStorage from "./local-storage.js";

const SPEECH_VOLUME_MULTIPLER = 2.5;

export function alarmToSpeech(volume) {
    let language = localStorage.getValue(SPEECH_LANGUAGE).toString();
    let voice = localStorage.getValue(SPEECH_VOICE).toString();

    let text = createText(language);
    textToSpeech(language, voice, text, volume);
}

function createText(language) {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
    };

    let date = new Date();
    return `${SPEECH_TEXTS.get(language).prefix} ${date.toLocaleTimeString(
        "en-US",
        options
    )}`;
}

function textToSpeech(language, voice, text, volume) {
    let utter = new SpeechSynthesisUtterance();
    utter.lang = language;
    utter.text = text;
    utter.rate = SPEECH_CONFIGURATIONS.get(language).rate;
    utter.volume = volume * SPEECH_VOLUME_MULTIPLER;
    utter.voice = getVoiceByName(voice);

    window.speechSynthesis.speak(utter);

    console.debug(`Speech to text executed. Text: ${text}`);
}

function getVoiceByName(voice) {
    return window.speechSynthesis
        .getVoices()
        .filter((v) => v.voiceURI === voice).at(0);
}

export function getVoicesByLanguage(language) {
    return window.speechSynthesis
        .getVoices()
        .filter((voice) =>
            voice.lang.toLowerCase().startsWith(language.toLowerCase())
        );
}

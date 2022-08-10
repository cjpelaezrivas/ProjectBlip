class SpeechConfiguration {
    constructor(name, rate = 1.0) {
        this.name = name;
        this.rate = rate;
    }
}

class SpeechText {
    constructor(prefix) {
        this.prefix = prefix;
    }
}

export const SPEECH_CONFIGURATIONS = new Map([
    ["en", new SpeechConfiguration("English", 0.8)],
    ["es", new SpeechConfiguration("Español", 0.8)],
    ["fr", new SpeechConfiguration("Français", 0.8)],
    ["de", new SpeechConfiguration("Deutsch", 0.8)],
    ["it", new SpeechConfiguration("Italiano", 0.9)]
]);

export const SPEECH_TEXTS = new Map([
    ["en", new SpeechText("The time is:")],
    ["es", new SpeechText("Son las")],
    ["fr", new SpeechText("Il est")],
    ["de", new SpeechText("Es ist")],
    ["it", new SpeechText("Sono le")]
]);

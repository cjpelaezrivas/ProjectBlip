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
    ["en-GB", new SpeechConfiguration("English", 0.8)],
    ["es-ES", new SpeechConfiguration("Spanish", 0.8)],
]);

export const SPEECH_TEXTS = new Map([
    ["en-GB", new SpeechText("The time is:")],
    ["es-ES", new SpeechText("Son las")]
]);

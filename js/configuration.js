import {
    ALL_CONFIGURATIONS,
    SPEECH_LANGUAGE,
    SPEECH_VOICE,
} from "./classes/configurations.js";
import { SPEECH_CONFIGURATIONS } from "./classes/speech-configurations.js";
import * as localStorage from "./utils/local-storage.js";

function init() {
    $("#s_speechVoiceLanguage").empty();
    SPEECH_CONFIGURATIONS.forEach((value, key) => {
        $("#s_speechVoiceLanguage").append(`<option value="${key}">${value.name}</option>`
        );
    });

    $("#s_speechVoice").empty().append(`<option value="">Language default</option>`);
    window.speechSynthesis.getVoices().forEach((voice) => {
        $("#s_speechVoice").append(`<option value="${voice.name}">${voice.name}</option>`
        );
    });
}

function loadConfiguration() {
    $("#s_speechVoiceLanguage").val(localStorage.getValue(SPEECH_LANGUAGE));
    $("#s_speechVoice").val(localStorage.getValue(SPEECH_VOICE));
}

function saveConfiguration() {
    localStorage.setValue(SPEECH_LANGUAGE, $("#s_speechVoiceLanguage").val());
    localStorage.setValue(SPEECH_VOICE, $("#s_speechVoice").val());
}

function clearAllConfiguration() {
    if (confirm("Are you sure you want to remove all local app configuration?")) {
        ALL_CONFIGURATIONS.forEach((configuration) => {
            localStorage.setValue(configuration, "");
        });
    }
}

//

$("#b_configuration").click(() => {
    init();
    loadConfiguration();
    $("#configuration-modal").modal("toggle");
});
$("#b_clear_configuration").click(() => {
    clearAllConfiguration();
    loadConfiguration();
});
$("#b_save_configuration").click(() => {
    saveConfiguration();
    $("#configuration-modal").modal("toggle");
});

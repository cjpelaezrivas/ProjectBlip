import { DARK_MODE } from "./classes/configurations.js";
import * as localStorage from "./utils/local-storage.js";

const PREFERS_COLOR_SCHEME = "(prefers-color-scheme: dark)";

let darkMode = false;

function init() {
    let userConfiguration = localStorage.getValue(DARK_MODE);
    let systemConfiguration = window.matchMedia(PREFERS_COLOR_SCHEME).matches;

    setDarkMode(!!userConfiguration ? userConfiguration === 'true' : systemConfiguration);
}

function toggleDarkMode(isUserInteraction = false) {
    setDarkMode(!darkMode, isUserInteraction);
}

function setDarkMode(newValue, isUserInteraction = false) {
    darkMode = newValue;
    document.documentElement.classList.toggle("dark-mode", darkMode);

    if (isUserInteraction) {
        localStorage.setValue(DARK_MODE, newValue);
    }
}

$("#darkModeToggle").click(() => {
    toggleDarkMode(true);
});

window.matchMedia(PREFERS_COLOR_SCHEME).addEventListener("change", (e) => {
    let isUserConfigured = !!localStorage.getValue(DARK_MODE);

    if(!isUserConfigured) {
        setDarkMode(e.matches);
    }
});

init();

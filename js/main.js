import { timeIntervals } from "./classes/time-intervals.js";
import { sounds } from "./classes/sounds.js";
import {
    VOLUME,
    TIME_INTERVAL,
    SOUND,
    PLAY_TWICE,
} from "./classes/configurations.js";
import * as localStorage from "./utils/local-storage.js";
import * as configureStyles from "./utils/configure-styles.js";

const MAX_VOLUME = 0.5;

let isRunning = false;
let timeoutId;

let timeInterval;
let volume;
let sound;
let playTwiceOnOclock;

let nextAlarm;

//

function init() {
    populateSoundSelect();
    loadConfiguration();
    clearNextAlarm();
}

function populateSoundSelect() {
    sounds.forEach((sound, index) => {
        $("#s_sounds").append(`<option value="${index}">${sound.name}</li>`);
    });
}

function loadConfiguration() {
    let timeInterval = localStorage.getValue(TIME_INTERVAL).toString();
    setTimeInterval(timeInterval, true);
    $("#r_timeInterval").val(timeInterval);

    let volume = localStorage.getValue(VOLUME).toString();
    setVolume(volume, true);
    $("#r_volume").val(volume);

    let sound = localStorage.getValue(SOUND);
    setSound(sound, true);
    $("#s_sounds").val(sound);

    let playTwice = (localStorage.getValue(PLAY_TWICE) === 'true');
    setPlayTwiceOnOclock(playTwice, true);
      $("#s_playTwice").prop("checked", playTwice);
}

//

function calculateNextAlarm() {
    const next = new Date();
    next.setSeconds(next.getSeconds() + sound.offset);

    const minutes =
        next.getMinutes() +
        (timeInterval.delta - (next.getMinutes() % timeInterval.delta));
    const seconds = -1 * sound.offset;

    next.setMinutes(minutes);
    next.setSeconds(seconds);
    next.setMilliseconds(0);

    nextAlarm = next;

    console.debug(`Calculate next alarm. New alarm: ${nextAlarm}`);

    displayNextAlarm();
}

function executeAlarm() {
    console.debug(`Execute next alarm: Now: ${new Date()}`);

    playSound();
    repeatSoundIfOclock();

    calculateNextAlarm();
    startTimeout();
}

function testAlarm() {
    playSound();
    if (playTwiceOnOclock) {
        setTimeout(playSound, sound.repeatIn);
    }
}

function repeatSoundIfOclock() {
    if (playTwiceOnOclock && nextAlarm && nextAlarm.getMinutes() === 0) {
        setTimeout(playSound, sound.repeatIn);
    }
}

function playSound(soundFile = sound.file) {
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play();

    console.debug(`Play sound. Sound: ${soundFile}`);
}

function startTimeout() {
    const now = new Date();
    const timeout = nextAlarm.getTime() - now.getTime();

    timeoutId = setTimeout(executeAlarm, timeout);

    console.debug(`Start timeout. Timeout ID: ${timeoutId}`);
}

function stopTimeout() {
    console.debug(`Stop timeout. Timeout ID: ${timeoutId}`);

    clearTimeout(timeoutId);
    timeoutId = undefined;
}

function displayNextAlarm() {
    $("#s_nextAlarm").html(formatDate(nextAlarm));
}

function clearNextAlarm() {
    $("#s_nextAlarm").html("Click on the hourglass to set the next alarm.");
}

function formatDate(date) {
    let options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };

    let today = date.getDate() === new Date().getDate() ? "Today" : "Tomorrow";

    return `Next alarm: ${today}, ${date.toLocaleDateString("es-ES", options)}`;
}

//

function toggleRunStatus() {
    isRunning = !isRunning;
    console.debug(
        "Toggle run status. New status: " + (isRunning ? "Running" : "Stopped")
    );

    if (isRunning) {
        playSound();
        calculateNextAlarm();
        startTimeout();
    } else {
        stopTimeout();
        clearNextAlarm();
    }

    configureStyles.toggleRunButton(isRunning);
}

function setTimeInterval(index, isInitialization = false) {
    timeInterval = timeIntervals[index];
    console.debug(
        `Set time interval. New time interval: ${timeInterval.label}`
    );

    $("#r_timeInterval").parent().css("--value", index);
    $("#r_timeInterval")
        .parent()
        .css("--text-value", JSON.stringify(timeInterval.label));

    if (!isInitialization) {
        if (isRunning) {
            stopTimeout();
            calculateNextAlarm();
            startTimeout();
        }

        localStorage.setValue(TIME_INTERVAL, index);
    }
}

function setVolume(percentage, isInitialization = false) {
    volume = (percentage * MAX_VOLUME) / 100;
    console.debug(`Set volume. New volume: ${percentage} %`);

    $("#r_volume").parent().css("--value", percentage);
    $("#r_volume").parent().css("--text-value", JSON.stringify(percentage));

    if (!isInitialization) {
        localStorage.setValue(VOLUME, percentage);
    }
}

function setSound(index, isInitialization = false) {
    sound = sounds[index];
    console.debug(`Set sound. New sound: ${sound.name}`);

    if (!isInitialization) {
        if (isRunning) {
            stopTimeout();
            calculateNextAlarm();
            startTimeout();
        }

        localStorage.setValue(SOUND, index);
    }
}

function setPlayTwiceOnOclock(playTwice, isInitialization = false) {
    playTwiceOnOclock = playTwice;
    console.debug(`Set play twice on o'clock. New value: ${playTwice}`);

    if (!isInitialization) {
        localStorage.setValue(PLAY_TWICE, playTwice);
    }
}

//

console.debug("Application starts");

init();

$("#b_run").click(() => toggleRunStatus());
$("#r_timeInterval").on("input", () =>
    setTimeInterval($("#r_timeInterval").val())
);
$("#r_volume").on("input", () => setVolume($("#r_volume").val()));
$("#s_sounds").on("change", () => setSound($("#s_sounds").val()));
$("#b_test").click(() => testAlarm());
$("#s_playTwice").on("change", () =>
    setPlayTwiceOnOclock($("#s_playTwice").is(":checked"))
);

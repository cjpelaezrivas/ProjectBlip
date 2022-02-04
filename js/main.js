import { timeIntervals } from './time-intervals.js'
import { sounds } from './sounds.js'
import { VOLUME, TIME_INTERVAL, SOUND } from './configurations.js'

let isPlaying = false;
let intervalId;

let timeInterval;
let sound;
let volume;

let nextAlarm;

//

function init() {
    populateSoundSelect();
    loadConfiguration();
    calculateNextAlarm();
}

function populateSoundSelect() {
    sounds.forEach((sound, index) => {
        $("#S_sounds").append($("<option/>")
                      .val(index)
                      .text(sound.name));
    });
}

function loadConfiguration() {
    let volumne = getValueFromLocalStorage(VOLUME);
    setVolume(volumne, true);
    $("#R_volume").val(volumne);

    let timeInterval = getValueFromLocalStorage(TIME_INTERVAL);
    setTimeInterval(timeInterval, true);
    $("#R_timeInterval").val(timeInterval)
    
    let sound = getValueFromLocalStorage(SOUND);
    setSound(sound, true);
    $("#S_sounds").val(sound);
}

function saveConfiguration() {
    setValueInLocalStorage(VOLUME, volume);
    setValueInLocalStorage(TIME_INTERVAL, $("#R_timeInterval").val());
    setValueInLocalStorage(SOUND, $("#S_sounds").val());
}

function getValueFromLocalStorage(configuration) {
   return localStorage.getItem(configuration.key) || configuration.defaultValue;
}

function setValueInLocalStorage(configuration, value) {
    return localStorage.setItem(configuration.key, value);
 }

//

function calculateNextAlarm() {
    const next = new Date();
    next.setSeconds(next.getSeconds() + sound.offset);

    const minutes = next.getMinutes() + (timeInterval.delta - next.getMinutes() % timeInterval.delta);
    const seconds = -1 * sound.offset;

    next.setMinutes(minutes)
    next.setSeconds(seconds);
    next.setMilliseconds(0);

    nextAlarm = next;

    console.log(`Calculate next alarm. New alarm: ${nextAlarm}`);
}

function checkNextAlarm() {
    console.log("Check next alarm...");

    const now = new Date();
    if(nextAlarm - now <= 0) {
        executeNextAlarm();
    }
}

function executeNextAlarm() {
    console.log(`Execute next alarm: Now: ${new Date()}`);

    if(isPlaying) {
        playSound();
    }

    calculateNextAlarm();
}

function testAlarm() {
    playSound();
}

function playSound() {
    const audio = new Audio(sound.file);
    audio.volume = volume;
    audio.play();
    
    console.log(`Play sound. Sound: ${sound.file}`);
}

function startTimeInterval() {
    calculateNextAlarm();
    intervalId = setInterval(checkNextAlarm, 1000);

    console.log(`Start interval. Interval ID: ${intervalId}`);
}

function stopTimeInterval() {
    console.log(`Stop interval. Interval ID: ${intervalId}`);
    
    clearInterval(intervalId);
    intervalId = undefined;
}

//

function togglePlayStatus() {
    isPlaying = !isPlaying;
    console.log("Toggle play status. New status: " + (isPlaying? "Play" : "Pause"));

    if(isPlaying) {
        startTimeInterval();
    } else {
        stopTimeInterval();
    }
}

function setTimeInterval(index, isInitialization = false) {
    timeInterval = timeIntervals[index];
    console.log(`Set time interval. New time interval: ${timeInterval.delta} minutes`);
    
    if(!isInitialization) {
        calculateNextAlarm();
        saveConfiguration();
    }
}

function setVolume(value, isInitialization = false) {
    volume = value;
    console.log(`Set volume. New volume: ${volume}`);

    if(!isInitialization) {
        saveConfiguration();
    }
}

function setSound(index, isInitialization = false) {
    sound = sounds[index];
    console.log(`Set sound. New sound: ${sound.name}`);

    if(!isInitialization) {
        calculateNextAlarm();
        saveConfiguration();
    }
}


$("#B_play").click(() => togglePlayStatus());
$("#B_test").click(() => testAlarm());
$("#R_timeInterval").change(() => setTimeInterval($("#R_timeInterval").val()));
$("#R_volume").change(() => setVolume($("#R_volume").val()));
$("#S_sounds").change(() => setSound($("#S_sounds").val()));

//

console.log("Application starts")
init();

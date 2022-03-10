import { timeIntervals } from "./classes/time-intervals.js";
import { sounds } from "./classes/sounds.js";
import { VOLUME, TIME_INTERVAL, SOUND } from "./classes/configurations.js";
import * as localStorage from "./utils/local-storage.js";
import * as configureStyles from "./utils/configure-styles.js";

const MAX_VOLUME = 0.5;

let isRunning = false;
let intervalId;

let timeInterval;
let sound;
let volume;

let nextAlarm;

//

function init() {
  populateSoundSelect();
  loadConfiguration();
}

function populateSoundSelect() {
  sounds.forEach((sound, index) => {
    $("#S_sounds").append($("<option/>").val(index).text(sound.name));
  });
}

function loadConfiguration() {
  let volumne = localStorage.getValue(VOLUME);
  setVolume(volumne, true);
  $("#r_volume").val(volumne);

  let timeInterval = localStorage.getValue(TIME_INTERVAL);
  setTimeInterval(timeInterval, true);
  $("#r_timeInterval").val(timeInterval);

  let sound = localStorage.getValue(SOUND);
  setSound(sound, true);
  $("#S_sounds").val(sound);
}

function saveConfiguration() {
  localStorage.setValue(VOLUME, $("#r_volume").val());
  localStorage.setValue(TIME_INTERVAL, $("#r_timeInterval").val());
  localStorage.setValue(SOUND, $("#S_sounds").val());
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

  console.log(`Calculate next alarm. New alarm: ${nextAlarm}`);

  if (isRunning) {
    displayNextAlarm();
  } else {
      clearNextAlarm();
  }
}

function checkNextAlarm() {
  console.log("Check next alarm...");

  const now = new Date();
  if (nextAlarm - now <= 0) {
    executeNextAlarm();
  }
}

function executeNextAlarm() {
  console.log(`Execute next alarm: Now: ${new Date()}`);

  if (isRunning) {
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

  clearNextAlarm();
}

function displayNextAlarm() {
  $("#s_nextAlarm").html(formatDate(nextAlarm));
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

function clearNextAlarm() {
  $("#s_nextAlarm").html("");
}

//

function toggleRunStatus() {
  isRunning = !isRunning;
  console.log(
    "Toggle run status. New status: " + (isRunning ? "Running" : "Pause")
  );

  if (isRunning) {
    playSound();
    startTimeInterval();
  } else {
    stopTimeInterval();
  }

  configureStyles.toggleRunButton(isRunning);
}

function setTimeInterval(index, isInitialization = false) {
  timeInterval = timeIntervals[index];
  console.log(`Set time interval. New time interval: ${timeInterval.label}`);

  $("#r_timeInterval").parent().css("--value", index);
  $("#r_timeInterval")
    .parent()
    .css("--text-value", JSON.stringify(timeInterval.label));

  if (!isInitialization) {
    calculateNextAlarm();
    saveConfiguration();
  }
}

function setVolume(percentage, isInitialization = false) {
  volume = (percentage * MAX_VOLUME) / 100;

  console.log(`Set volume. New volume: ${percentage} %`);

  $("#r_volume").parent().css("--value", percentage);
  $("#r_volume").parent().css("--text-value", JSON.stringify(percentage));

  if (!isInitialization) {
    saveConfiguration();
  }
}

function setSound(index, isInitialization = false) {
  sound = sounds[index];
  console.log(`Set sound. New sound: ${sound.name}`);

  if (!isInitialization) {
    calculateNextAlarm();
    saveConfiguration();
  }
}

//

console.log("Application starts");

$("#S_sounds").change(() => setSound($("#S_sounds").val()));
$("#B_test").click(() => testAlarm());

$("#b_run").click(() => toggleRunStatus());
$("#r_timeInterval").on("input", () =>
  setTimeInterval($("#r_timeInterval").val())
);
$("#r_volume").on("input", () => setVolume($("#r_volume").val()));

init();

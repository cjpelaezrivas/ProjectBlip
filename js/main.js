import { timeIntervals } from "./classes/time-intervals.js";
import { sounds } from "./classes/sounds.js";
import { VOLUME, TIME_INTERVAL, SOUND } from "./classes/configurations.js";
import * as localStorage from "./utils/local-storage.js";
import * as configureStyles from "./utils/configure-styles.js";

const MAX_VOLUME = 0.5;

let isRunning = false;
let timeoutId;

let timeInterval;
let volume;
let sound;

let nextAlarm;

//

function init() {
  populateSoundSelect();
  loadConfiguration();
  clearNextAlarm();
}

function populateSoundSelect() {
  sounds.forEach((sound, index) => {
    $("#s_sounds .options").append(
      `<li class="option" data-value="${index}">${sound.name}</li>`
    );
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
  $("#s_sounds").attr("data-value", sound);
  $("#s_sounds .selected").html(sounds[sound].name);
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

  console.debug(`Calculate next alarm. New alarm: ${nextAlarm}`);

  if (isRunning) {
    displayNextAlarm();
  } else {
    clearNextAlarm();
  }
}

function executeAlarm() {
  console.debug(`Execute next alarm: Now: ${new Date()}`);

  playSound();

  calculateNextAlarm();
  startTimeout();
}

function testAlarm() {
  playSound();
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
  console.debug(`Set time interval. New time interval: ${timeInterval.label}`);

  $("#r_timeInterval").parent().css("--value", index);
  $("#r_timeInterval")
    .parent()
    .css("--text-value", JSON.stringify(timeInterval.label));

  if (!isInitialization) {
    stopTimeout();
    calculateNextAlarm();
    startTimeout();

    localStorage.setValue(TIME_INTERVAL, $("#r_timeInterval").val());
  }
}

function setVolume(percentage, isInitialization = false) {
  volume = (percentage * MAX_VOLUME) / 100;
  console.debug(`Set volume. New volume: ${percentage} %`);

  $("#r_volume").parent().css("--value", percentage);
  $("#r_volume").parent().css("--text-value", JSON.stringify(percentage));

  if (!isInitialization) {
    localStorage.setValue(VOLUME, $("#r_volume").val());
  }
}

function setSound(index, isInitialization = false) {
  sound = sounds[index];
  console.debug(`Set sound. New sound: ${sound.name}`);

  if (!isInitialization) {
    stopTimeout();
    calculateNextAlarm();
    startTimeout();

    localStorage.setValue(SOUND, $("#s_sounds").attr("data-value"));
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

$("#b_test").click(() => testAlarm());

new MutationObserver((mutations) => {
  setSound($("#s_sounds").attr("data-value"));
}).observe(document.getElementById("s_sounds"), {
  attributes: true,
  attributeFilter: ["data-value"],
});

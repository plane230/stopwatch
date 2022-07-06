
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const resetBtn = document.querySelector('#reset');
const lapsBtn = document.querySelector('#lap');
const timerHrs = document.querySelector('#timerHrs');
const timerMin = document.querySelector('#timerMin');
const timerSec = document.querySelector('#timerSec');
const timerMilisec = document.querySelector('#timerMilisec');
const lapRecord = document.querySelector('#lapRecord');

let hours = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;

let displayHours = hours;
let displayMinutes = minutes;
let displaySec = seconds;
let displayMilisec = miliseconds;

let interval = null;

let status = "stopped";

let lapNow;

function start() {
    
    miliseconds++;

    if (miliseconds < 10) displayMilisec = "0" + miliseconds.toString();
    else displayMilisec = miliseconds;

    if (seconds < 10) displaySec = "0" + seconds.toString();
    else displaySec = seconds;

    if (minutes < 10) displayMinutes = "0" + minutes.toString();
    else displayMinutes = minutes;

    if (hours < 10) displayHours = "0" + hours.toString();
    else displayHours = hours;

    if (miliseconds / 100 === 1) {
        seconds++;
        miliseconds = 0;

        if (seconds / 60 === 1) {
            minutes++;
            seconds = 0;

            if (minutes / 60 === 1) {
                hours++;
                minutes = 0;
            }
        }
    }

    timerMilisec.innerHTML = displayMilisec;
    timerSec.innerHTML = displaySec;
    timerMin.innerHTML = displayMinutes;
    timerHrs.innerHTML = displayHours;

}

function startStop() {
    if (status === "stopped") {
        interval = setInterval(start, 10);
        startBtn.innerHTML = "Pause";
        status = "started";
    } else {
        clearInterval(interval);
        startBtn.innerHTML = "Start";
        status = "stopped";
    }
}

function reset() {
    clearInterval(interval);
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerMilisec.innerHTML = "00";
    timerSec.innerHTML = "00";
    timerMin.innerHTML = "00";
    timerHrs.innerHTML = "00";
    startBtn.innerHTML = "Start";
    lapRecord.innerHTML = '';
    status = "stopped";
    clickCount = 0;
}

function lap() {
    lapNow = `<li class="laps-list">${hours} : ${minutes} : ${seconds} : ${miliseconds}</li>`;
    lapRecord.innerHTML += lapNow;
}


startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapsBtn.addEventListener('click', countClicks);

let clickCount = 0;
let clickLimit = 23;

function countClicks() {
    if(clickCount <= clickLimit) {
        clickCount++;
        lap();
    } else 
        if(clickCount > clickLimit) {
            return;
        }
}


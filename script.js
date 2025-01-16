let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const modeToggle = document.getElementById('mode-toggle');
const modeText = document.getElementById('mode-text');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    const mode = isWorkTime ? 'Mission' : 'Rest';
    document.title = `${timeString} - ${mode}`;
}

function updateModeIcon() {
    modeToggle.className = isWorkTime ? 'fas fa-rocket active' : 'fas fa-bed active';
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Mission Active' : 'Hangar Rest';
    const initialTime = isWorkTime ? '25:00' : '05:00';
    document.title = `${initialTime} - ${isWorkTime ? 'Mission' : 'Rest'}`;
    updateDisplay();
    updateModeIcon();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Mission Active';
    document.title = '25:00 - Mission';
    updateDisplay();
    updateModeIcon();
}

modeToggle.addEventListener('click', () => {
    pauseTimer();
    switchMode();
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);

// Initialize the display
resetTimer(); 
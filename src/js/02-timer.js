import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const areaForInputDate = document.querySelector('#datetime-picker');
const startTimer = document.querySelector('[data-start]');
const timerArea = document.querySelector('.timer');
const daysInfo = document.querySelector('[data-days]');
const hourInfo = document.querySelector('[data-hours]');
const minutesInfo = document.querySelector('[data-minutes]');
const secondsInfo = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(areaForInputDate, options);

areaForInputDate.addEventListener('input', getDateInInput);
startTimer.addEventListener('click', adsStartTimer);
// timerArea.addEventListener('input', addLiveDifferent);

function getDateInInput(event) {
  const date = options.defaultDate;
  const inputNumber = new Date(event.currentTarget.value);

  if (inputNumber.getTime() < date.getTime()) {
    alert('Please choose a date in the future');
    startTimer.setAttribute('disabled', 'disabled');
  } else {
    startTimer.removeAttribute('disabled');
  }
}

function adsStartTimer() {
  const date = new Date(areaForInputDate.value);
  const liveDate = options.defaultDate;

  setInterval(() => {
    convertMs(date - liveDate);
    startTimer.setAttribute('disabled', 'disabled');
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  setInterval(() => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    // console.log(days);
    daysInfo.textContent = days;
    hourInfo.textContent = hours;
    minutesInfo.textContent = minutes;
    secondsInfo.textContent = seconds;

    addLeadingZero(daysInfo.textContent);
    addLeadingZero(hourInfo.textContent);
    addLeadingZero(minutesInfo.textContent);
    addLeadingZero(secondsInfo.textContent);
  }, 1000);

  // Remaining days
}

function addLeadingZero(value) {
  // console.log(value);
  if (value > 9) {
    console.log(value);
    value;
  }
  console.log(value.padStart(1, '0'));
  value.padStart(1, '0');
}

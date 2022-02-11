import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
let timerId = null;
flatpickr(areaForInputDate, options);

areaForInputDate.addEventListener('input', getDateInInput);
startTimer.addEventListener('click', adsStartTimer);

function getDateInInput(event) {
  const date = options.defaultDate;
  const inputNumber = new Date(event.currentTarget.value);

  if (inputNumber.getTime() < date.getTime()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startTimer.setAttribute('disabled', 'disabled');
  } else {
    startTimer.removeAttribute('disabled');
  }
}

function adsStartTimer() {
  timerId = setInterval(() => {
    const date = new Date(areaForInputDate.value);
    const liveDate = new Date();
    let different = date - liveDate.getTime();
    convertMs(different);
    startTimer.setAttribute('disabled', 'disabled');
    if (different < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  daysInfo.textContent = days;
  hourInfo.textContent = hours;
  minutesInfo.textContent = minutes;
  secondsInfo.textContent = seconds;

  addLeadingZero(daysInfo.textContent);
  addLeadingZero(hourInfo.textContent);
  addLeadingZero(minutesInfo.textContent);
  addLeadingZero(secondsInfo.textContent);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

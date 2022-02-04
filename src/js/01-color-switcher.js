const bodyOfButton = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let changeOrStopBackColor = null;
btnStart.addEventListener('click', addChangeColor);
btnStop.addEventListener('click', addStopChangeColor);

function addChangeColor() {
  changeOrStopBackColor = setInterval(() => {
    bodyOfButton.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', 'disabled');
}

function addStopChangeColor() {
  clearInterval(changeOrStopBackColor);
  btnStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

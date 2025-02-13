// import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

Notiflix.Notify.init({
  fontSize: '20px',
  width: '310px',
  failure: {
    textColor: '#000000',
  },
});

const ref = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  daysTxt: document.querySelector('[data-days]'),
  hoursTxt: document.querySelector('[data-hours]'),
  minsTxt: document.querySelector('[data-minutes]'),
  secTxt: document.querySelector('[data-seconds]'),
};

// let getEl = selector => document.querySelector(selector);
// getEl('[data-days]').textContent = `${days}`;
// getEl('[data-hours]').textContent = `${hours}`;
// getEl('[data-minutes]').textContent = `${minutes}`;
// getEl('[data-seconds]').textContent = `${seconds}`;

const DELAYINTERVAL = 1000;
const DELAYNOTIF = 4000;
let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    selectionDate(selectedDates[0]);
  },
};

flatpickr(ref.inputDate, options);

function selectionDate(param) {
  const dateNow = onDateNow();
  selectDate = param.getTime();

  if (selectDate < dateNow) {
    Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: DELAYNOTIF,
    });
    return;
  }
  ref.btnStart.removeAttribute('disabled');
  ref.btnStart.addEventListener('click', onClickBtn);
}

function onClickBtn() {
  const timerId = setInterval(() => {
    const dateNow = onDateNow();
    const diff = selectDate - dateNow;
    const convertData = convertMs(diff);
    onTextPaint(convertData);
    if (diff < 1000) {
      clearInterval(timerId);
      ref.btnStart.removeEventListener('click', onClickBtn);
    }
  }, DELAYINTERVAL);
  ref.btnStart.setAttribute('disabled', 'true');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onTextPaint({ days, hours, minutes, seconds }) {
  ref.daysTxt.textContent = addLeadingZero(days);
  ref.hoursTxt.textContent = addLeadingZero(hours);
  ref.minsTxt.textContent = addLeadingZero(minutes);
  ref.secTxt.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onDateNow() {
  return new Date().getTime();
}

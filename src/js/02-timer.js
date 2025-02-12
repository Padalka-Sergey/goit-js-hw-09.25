import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  daysTxt: document.querySelector('[data-days]'),
  hoursTxt: document.querySelector('[data-hours]'),
  minsTxt: document.querySelector('[data-minutes]'),
  secTxt: document.querySelector('[data-seconds]'),
};

// console.log(ref.daysTxt.textContent);

let dateNow = null;
let selectDate = null;
let diff = null;

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
  dateNow = new Date().getTime();
  selectDate = param.getTime();

  if (selectDate < dateNow) {
    window.alert('Please choose a date in the future');
    return;
  }
  ref.btnStart.removeAttribute('disabled');
  diff = selectDate - dateNow;
  ref.btnStart.addEventListener('click', onClickBtn);
}

function onClickBtn() {
  const timerId = setInterval(() => {
    dateNow = new Date().getTime();
    diff = selectDate - dateNow;
    // console.log(convertMs(diff));
    convertMs(diff);
  }, 1000);
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

  // return { days, hours, minutes, seconds };
  ref.daysTxt.textContent = days;
  ref.hoursTxt.textContent = hours;
  ref.minsTxt.textContent = minutes;
  ref.secTxt.textContent = seconds;
}

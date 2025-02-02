const ref = {
  bodyBcg: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let timerId = null;

ref.btnStart.addEventListener('click', startRandomBcg);
ref.btnStop.addEventListener('click', stopRandomBcg);

function startRandomBcg() {
  timerId = setInterval(() => {
    ref.bodyBcg.style.backgroundColor = getRandomHexColor();
  }, 1000);
  ref.btnStart.setAttribute('disabled', 'true');
  ref.btnStop.removeAttribute('disabled');
}

function stopRandomBcg() {
  clearInterval(timerId);
  ref.btnStop.setAttribute('disabled', 'true');
  ref.btnStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

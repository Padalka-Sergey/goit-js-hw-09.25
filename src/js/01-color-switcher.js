const ref = {
  bodyBcg: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let timerId = null;

ref.btnStart.addEventListener('click', startRandomBcg);
ref.btnStop.addEventListener('click', stopRandomBcg);

onClassList('btnStart', 'add');
onClassList('btnStop', 'add');

function startRandomBcg() {
  timerId = setInterval(() => {
    ref.bodyBcg.style.backgroundColor = getRandomHexColor();
  }, 1000);

  setAttrBtn('btnStart');
  removeAttrBtn('btnStop');
  onClassList('btnStart', 'remove');
  onClassList('btnStop', 'add');
}

function stopRandomBcg() {
  clearInterval(timerId);
  setAttrBtn('btnStop');
  removeAttrBtn('btnStart');
  onClassList('btnStop', 'remove');
  onClassList('btnStart', 'add');
}

function setAttrBtn(btn) {
  ref[btn].setAttribute('disabled', 'true');
}

function removeAttrBtn(btn) {
  ref[btn].removeAttribute('disabled');
}

function onClassList(refBtn, action) {
  ref[refBtn].classList[action]('btn-js');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

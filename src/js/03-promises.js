const formRef = document.querySelector('.form');
let counterPosition = null;
const DELAYNOTIF = 3000;

Notiflix.Notify.init({
  position: 'center-center',
});

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  let delayValue = Number(form.elements.delay.value);
  const stepValue = Number(form.elements.step.value);
  const amountValue = Number(form.elements.amount.value);
  for (
    let counterPosition = 1;
    counterPosition <= amountValue;
    counterPosition += 1
  ) {
    createPromise(counterPosition, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            timeout: DELAYNOTIF,
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            timeout: DELAYNOTIF,
          }
        );
      });

    delayValue += stepValue;
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

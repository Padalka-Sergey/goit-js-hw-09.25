const formRef = document.querySelector('.form');
let counterPosition = null;

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const delayValue = form.elements.delay.value;
  const stepValue = form.elements.step.value;
  const amountValue = form.elements.amount.value;
  onDelay(delayValue, stepValue, amountValue);
  form.reset();
}

function onDelay(delay, step, amount) {
  setTimeout(() => {
    counterPosition = 1;
    createPromise(counterPosition, delay);
    if (amount > 1) {
      onStep(delay, step, amount);
    }
  }, delay);
}

function onStep(delay, step, amount) {
  const timerId = setInterval(() => {
    counterPosition += 1;
    createPromise(counterPosition, delay);
    if (counterPosition === Number(amount)) {
      clearInterval(timerId);
    }
  }, step);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

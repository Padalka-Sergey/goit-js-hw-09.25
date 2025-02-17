const formRef = document.querySelector('.form');
let counterPosition = null;

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
    createPromise(counterPosition, delayValue);

    delayValue += stepValue;
  }
  form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  }, delay);
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

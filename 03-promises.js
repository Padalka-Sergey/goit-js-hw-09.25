import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */const u=document.querySelector(".form");let o=null;u.addEventListener("submit",m);function m(e){e.preventDefault();const t=e.target,n=t.elements.delay.value,l=t.elements.step.value,r=t.elements.amount.value;i(n,l,r),t.reset()}function i(e,t,n){setTimeout(()=>{o=1,s(o,e),n>1&&c(e,t,n)},e)}function c(e,t,n){const l=setInterval(()=>{o+=1,s(o,e),o===Number(n)&&clearInterval(l)},t)}function s(e,t){const n=Math.random()>.3;console.log(n?`✅ Fulfilled promise ${e} in ${t}ms`:`❌ Rejected promise ${e} in ${t}ms`)}
//# sourceMappingURL=03-promises.js.map

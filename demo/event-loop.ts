async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout0')
}, 0)

setTimeout(function () {
  console.log('setTimeout2')
}, 300)

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick1'));

async1();

process.nextTick(() => console.log('nextTick2'));

new Promise(function (resolve) {
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})

console.log('script end')

/**
 * 同步派发事件案例
 */
const btn = document.createElement('div');

btn.addEventListener('click', () => {
    Promise.resolve().then(() => console.log(11));
    console.log(1);
})

btn.addEventListener('click', () => {
    Promise.resolve().then(() => console.log(22));
    console.log(2);
})

btn.click();
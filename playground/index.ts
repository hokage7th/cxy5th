import { gasync } from "../demo/async-await";
import { arrayObj, plainObj, nestObj, createProxy } from "../demo/proxy";
import { cloneDeep } from "../demo/clone-deep";

gasync(function *() {
  const a1 = yield Promise.resolve(1);
  const a2 = yield Promise.resolve(2);
  const a3 = yield Promise.resolve(3);

  return a3 + 3;
});

const a = createProxy(arrayObj);

const p = createProxy(plainObj);

const n = createProxy(nestObj);

a.push(1);

console.log(a[1], a.length);

p.c = 4;
console.log(p.c);

n.a.d = 5;
n.b.c.t = 4;
console.log(n.a.d, n.b.c.t)

setTimeout(() => console.log(1));
setTimeout(() => console.log(2));
setTimeout(() => {
  document.body.style.background = 'red';
  console.log(3);
});
// requestAnimationFrame(() => console.log('raf'));

const source = {
  a: 1,
  b: [2],
  c: [{ a: 1 }],
  d: new Date(),
  e: new Map(),
};

const r = cloneDeep(source);

r.b[0] = 5;
r.c[0].a = 2;
r.e.set('1', 2);

console.log(r);
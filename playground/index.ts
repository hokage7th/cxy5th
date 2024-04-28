import { gasync } from "../demo/async-await";
import { arrayObj, plainObj, nestObj, createProxy } from "../demo/proxy";

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


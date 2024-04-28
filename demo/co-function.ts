// @ts-ignore
const thunkify = fn => (...rest) => callback => fn(...rest, callback)

function readAsync(flag, callback) {
  setTimeout(() => {
    callback(flag);
  }, 500);
}

const thunkifyReadAsync = thunkify(readAsync);

export function *gen() {
  yield thunkifyReadAsync(1);
  yield thunkifyReadAsync(2);
  yield thunkifyReadAsync(3);
}

export function co(generator) {
  const g = generator();

  const next = (e, ...reset) => {
    if (e) g.throw(e).value;

    // @ts-ignore
    const r = g.next(...reset);

    if (r.done) {
      return r.value;
    }

    r.value(next);
  }

  // @ts-ignore
  next();
}
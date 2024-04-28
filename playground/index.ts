import { gasync } from "../demo/async-await";

gasync(function *() {
  const a1 = yield Promise.resolve(1);
  const a2 = yield Promise.resolve(2);
  const a3 = yield Promise.resolve(3);

  return a3 + 3;
});


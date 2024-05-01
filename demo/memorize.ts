export function memorize(fn) {
  const cahce = new Map();

  return function (...args) {
    const k = args.toString();

    if (cahce.has(k)) {
      return cahce.get(k);
    }

    const result = fn.apply(this, args);
    cahce.set(k, result);
    return result;
  }
}
export function debounce(fn, wait = 500) {
  let timer = null;

  return function(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.aply(this, args), wait);
  }
}

export function debouncePro(fn, {
  wait = 500,
  immidate = false
} = {}) {
  let timer = null;

  return function (...args) {
    // 第一次执行，且没有触发定时器的情况下
    if (immidate && !timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, wait);

      return fn.apply(this, args);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}
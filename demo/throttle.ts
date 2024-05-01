// 调用比较频繁的情况
export function throttle(fn, wait) {
  let start = Date.now();

  return function (...args) {
    const now = Date.now();

    if (now - start >= wait) {
      fn.apply(this, args);
      start = now;
    }
  }
}

// 只会在首次调用的时候生效，而且存在误差
export function throttleTimer(fn, wait) {
  let timer = null;

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);

        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  }
}

/**
 * 精确节流
 * @param fn 
 * @param wait 
 * @returns 
 */
export function throttleExactly(fn, wait) {
  let timer = null;
  let start = Date.now();

  return function (...args) {
    timer && clearTimeout(timer);
    timer = null;

    const remaining = wait - (Date.now() - start);

    if (remaining <= 0) {
      fn.apply(this, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, remaining);
    }
  }
}
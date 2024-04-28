export const arrayObj = [];

export const plainObj = {};

export const nestObj = {
  a: {},
  b: {
    c: {},
  },
};

export const createProxy = t => new Proxy(t, {
  get(target, key) {
    console.log('get', target, key);
    return Reflect.get(target, key);
  },

  set(target, p, newValue, receiver) {
    console.log('set', target, p, newValue, receiver);
    return Reflect.set(target, p, newValue, receiver);
  },
})

export const createNestProxy = t => {
  const handler = {
    get(target, key) {
      console.log('get', target, key);

      const value =  Reflect.get(target, key);

      if (typeof value === 'object') {
        return createNestProxy(value);
      }

      return value;
    },
  
    set(target, p, newValue, receiver) {
      console.log('set', target, p, newValue, receiver);
      return Reflect.set(target, p, newValue, receiver);
    },
  };

  return new Proxy(t, handler);
}

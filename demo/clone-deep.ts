export function cloneDeep(t) {
  if (!t) return t;

  const baseType = typeof t;
  const type = Object.prototype.toString.call(t);

  if (baseType !== 'object') return t;

  switch(type) {
    case '[object Object]':
      return Object.keys(t).reduce((acc, k) => {
        acc[k] = cloneDeep(t[k]);
        return acc;
      }, {});
    case '[object Array]':
      return t.map(x => cloneDeep(x));
    default:
      return new t.constructor(t);
  }
}
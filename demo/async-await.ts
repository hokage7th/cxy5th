export function gasync(generator) {
  // @ts-ignore
  return new Promise((rs, rj) => {
    const g = generator();

    const next = (pre) => {
      const r = g.next(pre);

      if (r.done) {
        return rs(r.value);
      }

      r.value
        .then((p) => {
          next(p);
        })
        .catch((e) => {
          rj(g.throw(e).value);
        });
    };

    next(undefined);
  });
}

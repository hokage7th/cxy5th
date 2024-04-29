const forItem = {
  a: 1,
  b : 2,

  [Symbol.iterator]: function* () {
    yield this.a;
    yield this.b;
  }
}
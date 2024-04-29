Function.prototype.ibind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  const fn = this;

  return function Fn() {
    return fn.apply(
      this instanceof Fn ? new fn(...arguments) : context,
      args.concat(...arguments)
    );
  };
};

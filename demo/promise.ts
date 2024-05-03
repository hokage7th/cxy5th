Promise.prototype.finally = function(callback) {
  // 返回一个新的Promise实例
  return this.then(
      // 在原始Promise成功时执行回调
      value => Promise.resolve(callback()).then(() => value),
      // 在原始Promise失败时执行回调
      reason => Promise.resolve(callback()).then(() => { throw reason; })
  );
};

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
      // 遍历传入的 Promise 数组
      for (let promise of promises) {
          // 对每个 Promise 注册回调函数
          promise.then(
              // 当任何一个 Promise 成功时，将新 Promise 解决为该 Promise 的值
              value => resolve(value),
              // 当任何一个 Promise 失败时，将新 Promise 拒绝为该 Promise 的原因
              reason => reject(reason)
          );
      }
  });
};

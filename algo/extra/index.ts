/**
 * 求多个数组之间的交集
 */
export function qa1(list) {
  return list.reduce((acc, nums) => {
    return nums.filter((x) => acc.includes(x));
  }, list[0]);
}

/**
 * 一台饮水机，可以制备冷水、温水、热水；每秒钟可以装满2杯不同类型的水或者任意类型的一杯水
 * 给你一个下标从0开始，长度为3的数组amount，其中 0、1、2分别表示需要装满冷水、温水、热水的杯子数量
 * 返回装满所有辈子需要的最少秒
 */
export function qa2(amount) {
  amount.sort((a, b) => a - b);

  // 如果 x + y < z，因为z每一秒都会出现在组合中
  if (amount[2] >= amount[0] + amount[1]) {
    return amount[2];
  }

  return Math.floor((amount[0] + amount[1] + amount[2] + 1) / 2);
}

// 数字转汉语
export function qa3(num) {
  const code = "零一二三四五六七八九";
  const unitMap = {
    10: "十",
    [10 ** 2]: "百",
    [10 ** 3]: "千",
    [10 ** 4]: "万",
    [10 ** 5]: "十万",
    [10 ** 6]: "百万",
    [10 ** 7]: "千万",
    [10 ** 8]: "亿",
  };

  const units = Object.keys(unitMap)
    .map((x) => Number(x))
    .sort((a, b) => b - a);

  function getZH(t) {
    if (t < 10) {
      return code[t];
    }

    for (let k of units) {
      if (t > k) {
        const prefix = Math.floor(t / k);
        const suffix = t % k;

        return `${getZH(prefix)}${unitMap[k]}${getZH(suffix)}`;
      }
    }

    return t;
  }

  return getZH(num);
}

// 版本号排序
export function qa4(nums) {
  const compare = (a = "", b = "") => {
    let i = 0;

    while (a[i] && b[i] && a[i] === b[i]) {
      i++;
    }

    return (a[i]?.charCodeAt(0) ?? 0) - (b[i]?.charCodeAt(0) ?? 0);
  };

  return nums.sort((a, b) => {
    const aList = a.split(".");
    const bList = b.split(".");
    const length = Math.max(aList.length, bList.length);

    for (let i = 0; i < length; i++) {
      const ax = aList[i];
      const bx = bList[i];

      const c = compare(ax, bx);

      if (c !== 0) {
        return c;
      }
    }

    return 0;
  });
}

/**
 * 有 N 件物品和一个容量是 V 的背包。每件物品有且只有一件。
 * 第 i 件物品的体积是 v[i] ，价值是 w[i] 。
 * 求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
 */
export function qa5(N, V, v, w) {
  // 容积为j的时候取前i个物品
  // 来源1: 容积为 j - v[i]的时候，取前i-1个物品
  // 来源2: 容积为 j的时候，取前 i - 1 个物品

  const dp = new Array(V + 1).fill(0).map((_, j) =>
    new Array(N).fill(0).map((_, i) => {
      if (i === 0 && v[i] <= j) {
        return w[i];
      }

      return 0;
    })
  );

  for (let j = 1; j < V + 1; j++) {
    for (let i = 1; i < N; i++) {
      const pre1 = dp[j][i - 1] ?? 0;
      const pre2 = j - v[i] >= 0 ? dp[j - v[i]][i - 1] + w[i] : 0;

      dp[j][i] = Math.max(pre1, pre2);
    }
  }

  return dp[V][N - 1];
}

/**
 * 求多个数组之间的交集
 */
export function qa1(list) {
  return list.reduce((acc, nums) => {
    return nums.filter(x => acc.includes(x));
  }, list[0])
}

/**
 * 一台饮水机，可以制备冷水、温水、热水；每秒钟可以装满2杯不同类型的水或者任意类型的一杯水
 * 给你一个下标从0开始，长度为3的数组amount，其中 0、1、2分别表示需要装满冷水、温水、热水的杯子数量
 * 返回装满所有辈子需要的最少秒
 */
export function qa2(amount) {
  amount.sort((a,b) => a-b);

  // 如果 x + y < z，因为z每一秒都会出现在组合中
  if (amount[2] >= (amount[0] + amount[1])) {
    return amount[2];
  }

  return Math.floor((amount[0] + amount[1] + amount[2] + 1) / 2);
}

// 数字转汉语
export function qa3(num) {
  const code = '零一二三四五六七八九';
  const unitMap = {
    10: '十',
    [10 ** 2]: '百',
    [10 ** 3]: '千',
    [10 ** 4]: '万',
    [10 ** 5]: '十万',
    [10 ** 6]: '百万',
    [10 ** 7]: '千万',
    [10 ** 8]: '亿',
  };

  const units = Object.keys(unitMap).map(x => Number(x)).sort((a, b) => b - a);

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
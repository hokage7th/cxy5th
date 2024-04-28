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
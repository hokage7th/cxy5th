/**
 * 求多个数组之间的交集
 */
export function qa1(list) {
  return list.reduce((acc, nums) => {
    return nums.filter(x => acc.includes(x));
  }, list[0])
}
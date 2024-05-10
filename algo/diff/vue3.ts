/**
 * vue3 快速 diff 算法
 * @param list1 旧节点
 * @param list2 新节点
 */
export function diffChildren(list1, list2) {
  // 前置处理
  let i = 0;

  while(list1[i] === list2[i]) {
    i++;
  }

  // 后置处理
  let e1 = list1.length - 1;
  let e2 = list1.length - 1;

  while(list1[e1] === list2[e2]) {
    e1--;
    e2--;
  }

  // 只有新增操作操作的情况
  if (e1 < i) {
    return list2.slice(i, e2 + 1).map((x, index) => ({
      type: 'add',
      value: x,
      index: index + i,
    }));
  }

  // 只有删除操作的情况
  if (e2 < i) {
    return list1.slice(i, e1 + 1).map((x, index) => ({
      type: 'delete',
      value: x,
      index: index + i,
    }));
  }

  /**
   * 混合的复杂情况
   */

  // 1.创建新元素及其位置索引
  const newIndexToMap = new Map();

  for (let j = i;j <= e2;j++) {
    newIndexToMap.set(list2[j], j);
  }

  // 2.保存一个最大位置和是否需要移动的标记
  let maxNewIndexSoFar = 0; // 当前最远位置标记
  let moved = false; // 是否需要移动标记
  let s1 = i;
  let s2 = i;

  // 3.创建一个数组保存新旧节点位置映射表
  let needToPatch = e2 - s2 + 1; // 需要修改的节点数

  const newIndexToOldIndexMap = new Array(needToPatch).fill(0);

  // 4.遍历旧节点
  const patchList = [];

  for (let j = s1;j <= e1;j++) {
    const oldNode = list1[j];

    // 如果新节点中不存在此节点
    if (!newIndexToMap.has(oldNode)) {
      patchList.push({
        type: 'delete',
        value: oldNode,
        index: j,
      });

      continue;
    }

    const newIndex = newIndexToMap.get(oldNode);

    newIndexToOldIndexMap[newIndex - s2] = j + 1;

    // 判断当前位置相对于最远位置是否是递增的
    moved = newIndex < maxNewIndexSoFar;

    !moved && (maxNewIndexSoFar = newIndex);
  }

  // 5.寻找 newIndexToOldIndexMap 中的最长递增子序列

  const dp = new Array(needToPatch).fill(1);

  let maxI = 0;
  let max = 1;

  for (let j = 1;j < needToPatch;j++) {
    if (newIndexToOldIndexMap[j] > newIndexToOldIndexMap[j-1]) {
      dp[j] = dp[j-1] + 1;
    } 

    if (dp[j] > max) {
      maxI = j;
    }
  }

  const interval = [maxI - dp[maxI] + 1, maxI];

  // 遍历新节点中需要处理的片段

  for (let j = e2;j >= s2;j--) {
    const newNode = list2[j];

    const newIndex = j - s2;

    const mapNode = newIndexToOldIndexMap[newIndex];

    // 标记位置为0，只需要新增节点
    if (mapNode === 0) {
      patchList.push({
        type: 'add',
        value: newNode,
        index: j,
      });
      
      continue;
    }

    // 在最长递增子序列中，不需要移动的节点
    if (newIndex >= interval[0] && newIndex <= interval[1]) {
      continue;
    }

    patchList.push({
      type: 'move',
      value: newNode,
      moveTo: j,
    });
  }

  return patchList;
}
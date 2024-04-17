/**
 * 排序算法收集
 */
import { Heap } from "../basic-class";

function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}

/**
 * 冒泡排序
 * @param nums
 */
export function sort1(nums) {
  for (let i = 0; i < nums.length; i++) {
    let swapped = false;

    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[i] > nums[j]) {
        swap(nums, i, j);
        swapped = true;
      }
    }

    if (!swapped) break;
  }
}

/**
 * 两路冒泡
 * @param arr
 * @returns
 */
export function sort1a(arr) {
  const n = arr.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;

  while (swapped) {
    swapped = false;

    // 从左到右
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    // 如果没有发生交换，则说明数组已经有序
    if (!swapped) {
      break;
    }

    // 缩小右边界
    end--;

    // 从右到左
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }

    // 扩大左边界
    start++;
  }

  return arr;
}

/**
 * 选择排序
 * @param nums
 */
export function sort2(nums) {
  for (let i = 0; i < nums.length; i++) {
    let swapped = false;

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        swap(nums, i, j);
        swapped = true;
      }
    }

    if (!swapped) break;
  }
}

/**
 * 插入排序
 * @param nums
 */
export function sort3(nums) {
  for (let i = 1; i < nums.length; i++) {
    let j = i;

    while (nums[j] <= nums[j - 1] && j > 0) {
      swap(nums, j, j - 1);
    }
  }
}

/**
 * 希尔排序
 * 希尔排序是插入排序的一种改进版本，
 * 其核心思想是通过比较间隔为 gap 的子序列，将数组分为多个子序列进行插入排序。
 * 在每一轮排序中，将相邻元素间隔为 gap 的子序列进行插入排序，逐渐缩小间隔直至间隔为 1。
 * 最后一轮排序完成后，数组就变得近似有序，最后进行一次间隔为 1 的插入排序，使数组完全有序
 * @param nums
 */
export function sort4(nums) {
  for (
    let gap = Math.floor(nums.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let i = gap; i < nums.length; i++) {
      let j = i;

      while (j >= gap && nums[j - gap] > nums[j]) {
        swap(nums, j, j - gap);
        j -= gap;
      }
    }
  }
}

/**
 * 归并排序
 * @param nums
 */
export function sort5(nums) {
  function merge(left, right) {
    let n = left.length + right.length;

    let i = 0;
    let j = 0;

    const r = [];

    for (let k = 0; k < n; k++) {
      r[k] =
        left[i] && left[i] < (right[j] ?? Infinity) ? left[i++] : right[j++];
    }

    return r;
  }

  if (nums.length < 2) return nums;

  const mid = Math.floor(nums.length / 2);
  const right = sort5(nums.slice(0, mid));
  const left = sort5(nums.slice(mid));

  const r = merge(left, right);

  return r;
}

/**
 * 快速排序
 * @param nums
 */
export function sort6(target) {
  function quickSelect(nums) {
    if (nums.length < 2) return nums;

    const flag = nums[0];

    let i = 0;
    let j = nums.length - 1;

    while (i < j) {
      do {
        i++;
      } while (nums[i] < flag);

      do {
        j--;
      } while (nums[j] > flag);

      if (i < j) {
        swap(nums, i, j);
      }
    }

    let k = j;

    while (nums[k] == flag && k > 0) {
      k--;
    }

    const rightMid = nums.slice(k + 1, j + 1);

    const mid = [flag].concat(rightMid);
    const low = nums.slice(1, k + 1);
    const high = nums.slice(j + 1, nums.length);

    return quickSelect(low).concat(mid).concat(quickSelect(high));
  }

  return quickSelect(target);
}

/**
 * 堆排序
 * @param nums
 */
export function sort7(nums) {
  const heap = new Heap((a, b) => a < b, nums);

  const r = [];

  while (heap.size > 0) {
    r.push(heap.pop());
  }

  return r;
}

/**
 * 计数排序
 * @param nums
 */
export function sort8(nums) {
  const min = Math.min(...nums);
  const max = Math.max(...nums);

  const count = new Array(max - min + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    count[nums[i] - min]++;
  }

  let idx = 0;

  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      nums[idx++] = i + min;
      count[i]--;
    }
  }

  return nums;
}

/**
 * 桶排序
 * @param nums
 * @returns
 */
export function sort9(nums, bucketSize = 10) {
  const min = Math.min(...nums);
  const max = Math.max(...nums);

  const buckets = new Array(Math.ceil((max - min + 1) / bucketSize))
    .fill([])
    .map(() => []);

  for (let i = 0; i < nums.length; i++) {
    const bucketId = Math.floor((nums[i] - min) / bucketSize);

    buckets[bucketId].push(nums[i]);
  }

  for (let bucket of buckets) {
    bucket.sort();
  }

  let r = [];

  for (let bucket of buckets) {
    r = r.concat(bucket);
  }

  return r;
}

/**
 * 基数排序
 * @param nums
 */
export function sort10(nums) {
  function getDigit(n, i) {
    return Math.floor(Math.abs(n) / Math.pow(10, i)) % 10;
  }

  const max = Math.max(...nums);
  const maxLength = String(max).length;
  const buckets = new Array(10).fill([]).map(() => []);

  // 从个位到最高位进行分桶排序
  for (let k = 0; k < maxLength; k++) {
    // 将数组中的元素放入对应的桶中
    for (let num of nums) {
      const digit = getDigit(num, k);
      buckets[digit].push(num);
    }

    // 合并桶中的元素
    nums = [].concat(...buckets);

    // 清空桶
    buckets.forEach((bucket) => (bucket.length = 0));
  }
}

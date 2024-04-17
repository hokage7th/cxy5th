/**
 * leetcode 题目收集（面试必备150）
 */

import { Heap, ListNode, Node, TreeNode } from "../basic-class";

/**
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
  请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
  注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。
  为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
 */
export function qa1() {
  return function invoke(nums1, m, nums2, n) {
    if (!nums2 || nums2.length === 0) return nums1;

    let i = 0;

    while (nums2.length > 0 && nums1[i] !== undefined) {
      const right = nums2.shift();

      while (nums1[i] < right && i < m) {
        i++;
      }

      nums1.splice(i, 0, right);
      nums1.pop();
      m++;
    }

    return nums1;
  };
}

/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
  不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
  元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 * @returns 
 */
export function qa2() {
  return function invoke(nums, val) {
    let i = 0;

    while (i < nums.length) {
      if (nums[i] === val) {
        nums.splice(i, 1);
        continue;
      }

      i++;
    }
  };
}

/**
 * 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
 * 元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
  考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
  更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
返回 k 。
 * @returns 
 */
export function qa3() {
  return function invoke(nums) {
    let i = 0;

    while (i < nums.length) {
      let j = i;

      while (nums[j + 1] === nums[j]) {
        nums.splice(j + 1, 1);
      }

      i++;
    }
  };
}

/**
 * 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 * @returns
 */
export function qa4() {
  return function invoke(nums) {
    let i = 0;

    while (i < nums.length) {
      let j = i + 1;

      if (nums[i] == nums[j]) {
        while (nums[j + 1] === nums[i]) {
          nums.splice(j + 1, 1);
        }
      }

      i++;
    }
  };
}

/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * @returns
 */
export function qa5() {
  return function invoke(nums) {
    const map = {};

    for (let i = 0; i < nums.length; i++) {
      map[nums[i]] ??= 0;

      map[nums[i]]++;

      if (map[nums[i]] > nums.length / 2) {
        return nums[i];
      }
    }

    return null;
  };
}

/**
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 * @returns
 */
export function qa6() {
  return function invoke(nums, k) {
    const n = nums.length;
    const times = k % n;

    if (times === 0) return nums;

    nums.unshift(...nums.splice(n - times, times));
  };
}

/**
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
  你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
  返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 * @returns 
 */
export function qa7() {
  return function invoke(prices) {
    let buy = -prices[0];
    let sell = 0;

    for (let i = 0; i < prices.length; i++) {
      buy = Math.max(buy, -prices[i]);
      sell = Math.max(sell, buy + prices[i]);
    }

    return sell;
  };
}

/**
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
  在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
  返回 你能获得的 最大 利润 。
 * @returns 
 */
export function qa8() {
  return function invoke(prices) {
    const n = prices.length;

    const dp = new Array(n).fill("").map(() => [-prices[0], 0]);

    for (let i = 1; i < prices.length; i++) {
      // buy [这天买或者不买]
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
      // sell [这天卖或者不卖]
      dp[i][1] = Math.max(dp[i - 1][1], dp[i][0] + prices[i]);
    }

    return dp[n - 1][1];
  };
}

/**
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
  判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 */
export function qa9() {
  return function invoke(nums) {
    let rightMax = nums[0];
    let i = 1;

    while (i <= rightMax && i < nums.length) {
      rightMax = Math.max(rightMax, i + nums[i]);
      i++;
    }

    return rightMax >= nums.length - 1;
  };
}

/**
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
  每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:
  0 <= j <= nums[i] 
  i + j < n
  返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
 * @returns 
 */ [2, 7, 4, 1, 1, 1, 1];
export function qa10() {
  return function invoke(nums) {
    if (nums.length < 2) return 0;

    let rightMax = 0;
    let end = 0;
    let count = 0;
    let i = 0;

    while (i < nums.length) {
      rightMax = Math.max(rightMax, i + nums[i]);

      // 记录上一回合的regithMax
      if (i === end) {
        count++;
        end = rightMax;
      }

      if (end >= nums.length - 1) return count;
      i++;
    }

    return count;
  };
}

/**
 * 给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
  根据维基百科上 h 指数的定义：h 代表“高引用次数” ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且 至少 有 h 篇论文被引用次数大于等于 h 。
  如果 h 有多种可能的值，h 指数 是其中最大的那个。
 * @returns 
 */
export function qa11() {
  function invoke2(citations) {
    let h = 0;

    const counts = Array(citations.length).fill(0);

    for (let i = 0; i < citations.length; i++) {
      if (citations[i] >= citations.length) {
        h++;
        continue;
      }

      // 这一步相当于排序,坐标就等于值
      counts[citations[i]]++;
    }

    for (let i = counts.length; i > -1; i--) {
      h += counts[i] || 0;

      if (h >= i) {
        return i;
      }
    }

    return 0;
  }

  // [0,1,3,5,6]
  return function invoke(citations) {
    citations.sort((a, b) => a - b);

    // 相当于维护一个变量，此变量中有n个数字，均大于等于n

    let h = 0;
    let i = 0;
    let j = 0;

    while (j < citations.length) {
      while (citations[i] < j - i + 1 && i < j) {
        i++;
      }

      if (citations[i] >= j - i + 1) {
        h = Math.max(h, j - i + 1);
      }

      j++;
    }

    return h;
  };
}

/**
 * 实现RandomizedSet 类：
  RandomizedSet() 初始化 RandomizedSet 对象
  bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true ；否则，返回 false 。
  bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true ；否则，返回 false 。
  int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 相同的概率 被返回。
  你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1) 。
 */
export function qa12() {
  var RandomizedSet = function () {
    this._set = {};
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  RandomizedSet.prototype.insert = function (val) {
    if (this._set[val]) return false;
    this._set[val] = true;
    return true;
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  RandomizedSet.prototype.remove = function (val) {
    if (!this._set[val]) return false;
    delete this._set[val];
    return true;
  };

  /**
   * @return {number}
   */
  RandomizedSet.prototype.getRandom = function () {
    const target = Object.keys(this._set)[
      Math.floor(Math.random() * Object.keys(this._set).length)
    ];
    return target;
  };
  /**
   * Your RandomizedSet object will be instantiated and called as such:
   * var obj = new RandomizedSet()
   * var param_1 = obj.insert(val)
   * var param_2 = obj.remove(val)
   * var param_3 = obj.getRandom()
   */
}

/**
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 * 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 * @returns
 */
export function qa13() {
  return function invoke(nums) {
    let ans = [];

    let left = 1;
    let rightMap = {};

    for (let i = 0; i < nums.length; i++) {
      if (rightMap[i + 1] === undefined) {
        for (let r = nums.length - 1; r > i; r--) {
          rightMap[r] = (rightMap[r + 1] ?? 1) * nums[r];
        }
      }

      ans[i] = left * (rightMap[i + 1] ?? 1);

      left = left * nums[i];
    }

    return ans;
  };
}

/**
 * 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
 * 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
 * 给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。
 * @returns
 */
export function qa14() {
  return function invoke(gas, cost) {
    const n = gas.length;

    function dfs(start, i, lost = 0) {
      const pos = i % n;

      if (i > n && pos === start) return [true, start];

      lost += gas[pos];
      lost -= cost[pos];

      if (lost < 0) return [false, i];

      return dfs(start, i + 1, lost);
    }

    for (let i = 0; i < n; i++) {
      const [valid, endIndex] = dfs(i, i);

      if (valid) {
        return i;
      }

      i = endIndex;
    }

    return -1;
  };
}

/**
 * n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
  你需要按照以下要求，给这些孩子分发糖果：
  每个孩子至少分配到 1 个糖果。
  相邻两个孩子评分更高的孩子会获得更多的糖果。
  请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
 */
export function qa15() {
  return function invoke(ratings) {
    // 左右判断
    const n = ratings.length;

    const givers = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
      if (ratings[i] > ratings[i - 1]) {
        givers[i] = givers[i - 1] + 1;
      }
    }

    for (let i = n - 2; i > -1; i--) {
      if (ratings[i] > ratings[i + 1]) {
        givers[i] = Math.max(givers[i + 1] + 1, givers[i]);
      }
    }

    return givers.reduce((acc, x) => acc + x, 0);
  };
}

/**
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * @returns
 */
export function qa16() {
  function invoke2(height) {
    const n = height.length;

    const dpLeft = [];
    const dpRight = [];

    for (let i = 0; i < n; i++) {
      dpLeft[i] = Math.max(height[i], dpLeft[i - 1] ?? -Infinity);
    }

    for (let i = n - 1; i > -1; i--) {
      dpRight[i] = Math.max(height[i], dpRight[i + 1] ?? -Infinity);
    }

    let r = 0;

    for (let i = 0; i < n; i++) {
      r += Math.min(dpLeft[i], dpRight[i]) - height[i];
    }

    return r;
  }

  return function invoke(height) {
    const stack = [];

    let r = 0;

    for (let i = 0; i < height.length; i++) {
      while (height[i] > height[stack[0]]) {
        const h = height[stack.shift()];

        if (!stack.length) break;

        const min = Math.min(height[i], height[stack[0]]);

        r = r + (min - h) * (i - stack[0] - 1);
      }

      stack.unshift(i);
    }

    return r;
  };
}

/**
 * 罗马数字转整数
 */
export function qa17() {
  function invoke2(s) {
    const cMap = {
      CM: 900,
      XC: 90,
      CD: 400,
      XL: 40,
      IX: 9,
      IV: 4,
    };

    const Map = {
      M: 1000,
      D: 500,
      C: 100,
      L: 50,
      X: 10,
      V: 5,
      I: 1,
    };

    let r = 0;

    for (let key in cMap) {
      let count = 0;

      s = s.replaceAll(key, () => {
        count++;
      });

      r += count * cMap[key];
    }

    for (let key in Map) {
      let count = 0;

      s = s.replaceAll(key, () => {
        count++;
      });

      r += count * Map[key];
    }

    return r;
  }

  return function invoke(s) {
    const charMap = {
      I: 1,
      IV: 4,
      V: 5,
      IX: 9,
      X: 10,
      XL: 40,
      L: 50,
      XC: 90,
      C: 100,
      CD: 400,
      D: 500,
      CM: 900,
      M: 1000,
    };

    const prefixMap = {
      I: 1,
      X: 1,
      C: 1,
    };

    let sum = 0;

    for (let i = 0; i < s.length; i++) {
      const c = s[i];

      if (!prefixMap[c]) {
        sum += charMap[c];
        continue;
      }

      if (prefixMap[c]) {
        const comb = s.slice(i, i + 2);

        if (charMap[comb] && comb.length > 1) {
          sum += charMap[comb];
          i++;
        } else {
          sum += charMap[c];
        }
      }
    }

    return sum;
  };
}

/**
 * 整数转罗马数字
 */
export function qa18() {
  return function invoke(num) {
    const charMap = [
      { key: "I", value: 1 },
      { key: "IV", value: 4 },
      { key: "V", value: 5 },
      { key: "IX", value: 9 },
      { key: "X", value: 10 },
      { key: "XL", value: 40 },
      { key: "L", value: 50 },
      { key: "XC", value: 90 },
      { key: "C", value: 100 },
      { key: "CD", value: 400 },
      { key: "D", value: 500 },
      { key: "CM", value: 900 },
      { key: "M", value: 1000 },
    ];

    let p = num;
    let r = "";

    for (let i = charMap.length - 1; i > -1 && p > 0; i--) {
      const n = Math.floor(p / charMap[i].value);

      p = p % charMap[i].value;

      r += charMap[i].key.repeat(n);
    }

    return r;
  };
}

/**
 * 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
 * @returns
 */
export function qa19() {
  return function invoke(s) {
    /**
     * g 修饰符代表全局匹配（global），
     * 它会在整个字符串中查找所有匹配的模式，而不仅仅是找到第一个匹配项就停止。
     * 如果你不使用 g 修饰符，则正则表达式匹配到第一个匹配项后会停止，而不再继续查找。
     */
    const matchs = Array.from(s.matchAll(/[a-z]+/gi));

    const r = matchs.slice(-1)?.[0]?.[0];

    return r?.length ?? 0;
  };
}

/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * @returns
 */
export function qa20() {
  return function invoke(strs) {
    const n = strs[0].length;

    for (let i = 0; i < n; i++) {
      let flag = strs[0][i];
      let same = true;

      for (let j = 1; j < strs.length; j++) {
        if (strs[j][i] !== flag) {
          same = false;
          break;
        }
      }

      if (!same) {
        return strs[0].slice(0, i);
      }
    }

    return strs[0].slice(0, n);
  };
}

/** 反转字符串中的单词
 * 给你一个字符串 s ，请你反转字符串中 单词 的顺序。
 * 单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
 * 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
 * @returns
 */
export function qa21() {
  return function invoke(s) {
    const strs = Array.from(s.matchAll(/[a-z0-9]+/gi));

    const r = strs.reduce(
      (acc, s) => [s, acc].filter((x) => !!x).join(" "),
      ""
    );

    return r;
  };
}

/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 * @returns
 */
export function qa22() {
  return function invoke(s, numRows) {
    const t = new Array(numRows).fill("");

    const circleSum = 2 * numRows - 2;

    let sum = 0;

    for (let i = 0; i < s.length; i++) {
      if (sum >= circleSum) {
        sum = 1;
      } else {
        sum++;
      }

      if (sum <= numRows) {
        const r = sum - 1;
        t[r] = t[r] + s[i];
      }

      if (sum > numRows && sum <= circleSum) {
        const r = numRows - (sum - numRows) - 1;
        t[r] = t[r] + s[i];
      }
    }

    return t.reduce((acc, c) => acc.concat(c), []).join("");
  };
}

/**
 * 找出字符串中第一个匹配项的下标
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。
 * 如果 needle 不是 haystack 的一部分，则返回  -1 。
 * @returns
 */
export function qa23() {
  return function invoke(haystack, needle) {
    let i = 0;
    let j = 0;

    while (i < haystack.length) {
      if (haystack[i] !== needle[j]) {
        i++;
        continue;
      }

      let k = i;
      let next;

      while (needle[j] && haystack[k] === needle[j]) {
        if (haystack[k] === needle[0] && k > i && !next) {
          next = k;
        }

        k++;
        j++;
      }

      if (j === needle.length) {
        return i;
      }

      i = next ?? k;
      j = 0;
    }

    return -1;
  };
}

/**
 * 文本左右对齐
 * 给定一个单词数组 words 和一个长度 maxWidth ，重新排版单词，使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。
  你应该使用 “贪心算法” 来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，使得每行恰好有 maxWidth 个字符。
  要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。
  文本的最后一行应为左对齐，且单词之间不插入额外的空格。
 * @returns 
 */
export function qa24() {
  return function invoke(words, maxWidth) {
    // 左右对齐的标准是
    // 设每一行的单词数量为n，空格数量为m，则必须满足 m >= n - 1，如果空格数量大于所需要，则需要满足n-1个单词分到的空格平均

    const r = [];

    let i = 0;

    while (i < words.length) {
      let sum = 0;
      let j = i;

      while (i < words.length && sum + words[i].length + (i - j) <= maxWidth) {
        sum += words[i].length;
        i++;
      }

      // 到达最后一行
      if (i === words.length) {
        let row = words.slice(j, i).join(" ");

        row += " ".repeat(maxWidth - row.length);

        r.push(row);
        break;
      }

      const numberOfWords = i - j;
      const numberOfBlank = maxWidth - sum - numberOfWords - 1;

      if (numberOfWords === 1) {
        const row = words.slice(j, i).join(" ") + " ".repeat(numberOfBlank);

        r.push(row);
        continue;
      }

      const avgBlank = Math.floor(numberOfBlank / (numberOfWords - 1));
      const lostBlank = numberOfBlank % (numberOfWords - 1);

      const row = words.slice(j, i).reduce((acc, s, index) => {
        if (index === numberOfWords - 1) {
          return acc + s;
        }

        let blank = " ".repeat(1 + avgBlank);

        if (index < lostBlank) {
          blank += " ";
        }

        return acc + s + blank;
      }, "");

      r.push(row);
    }

    return r;
  };
}

/**
 * 验证回文串
 * @returns
 */
export function qa25() {
  return function invoke(s) {
    let i = 0;
    let j = s.length - 1;

    while (j > i) {
      if (!s[i] || !/[a-z0-9]/i.test(s[i])) {
        i++;
        continue;
      }

      if (!s[j] || !/[a-z0-9]/i.test(s[j])) {
        j--;
        continue;
      }

      if (s[i].toLowerCase() !== s[j].toLowerCase()) return false;

      i++;
      j--;
    }

    return true;
  };
}

/**
 * 判断子序列
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 */
export function qa26() {
  return function invoke(s, t) {
    if (s.length > t.length) return false;

    if (!s) return true;

    let si = 0;

    for (let i = 0; i < t.length; i++) {
      if (t[i] === s[si]) {
        si++;
      }

      if (si === s.length) return true;
    }

    return si === s.length;
  };
}

/**
 * 两数之和 II - 输入有序数组
 * 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。
 * 如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。
 * 以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。
 * @returns
 */
export function qa27() {
  function invoke2(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
      const left = numbers[i];
      const right = target - left;

      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[j] === right) {
          return [i + 1, j + 1];
        }
      }
    }

    return [-1, -1];
  }

  return function invoke(numbers, target) {
    let i = 0;
    let j = numbers.length - 1;

    while (j > i) {
      const sum = numbers[i] + numbers[j];

      if (sum === target) {
        return [i + 1, j + 1];
      }

      if (numbers[j] + numbers[i] > target) {
        j--;
      } else {
        i++;
      }
    }

    return [-1, -1];
  };
}

/** 盛最多水的容器
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * @returns
 */
export function qa28() {
  function invoke2(height) {
    const n = height.length;

    let maxS = 0;

    for (let i = 0; i < n; i++) {
      const hi = height[i];

      for (let j = n - 1; j > i; j--) {
        // 当前最大能达到的面积
        const currentMaxAreaJ = hi * (j - i);

        // 当前最大能达到的面积 小于等于 已经统计的最大面积的时候【结束】
        if (currentMaxAreaJ <= maxS) {
          break;
        }

        // 当前面积
        const currentAreaJ = Math.min(height[j], height[i]) * (j - i);

        // 设定最大面积
        maxS = Math.max(maxS, currentAreaJ);
      }
    }

    return maxS;
  }

  return function invoke(height) {
    let i = 0;
    let j = height.length - 1;
    let max = 0;

    while (j > i) {
      const area = Math.min(height[i], height[j]) * (j - i);

      max = Math.max(max, area);

      if (height[j] > height[i]) {
        i++;
      } else {
        j--;
      }
    }

    return max;
  };
}

/**
 * 三数之和
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]]
 * 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。
 * 你返回所有和为 0 且不重复的三元组。
 */
export function qa29() {
  return function invoke(nums) {
    nums.sort((a, b) => a - b);

    const r = [];
    const visited = {};

    for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
      if (visited[nums[i]]) continue;

      let j = i + 1;
      let k = nums.length - 1;

      visited[nums[i]] = 1;

      const target = -nums[i];

      const innerVisited = {};

      while (k > j) {
        const sum = nums[j] + nums[k];

        if (sum === target && !innerVisited[nums[j]]) {
          r.push([nums[i], nums[j], nums[k]]);
          innerVisited[nums[j]] = 1;
        }

        if (sum > target) {
          k--;
        } else {
          j++;
        }
      }
    }

    return r;
  };
}

/**
 * 长度最小的子数组
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 找出该数组中满足其总和大于等于 target 的长度最小的 连续子数组
 * [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 * @returns
 */
export function qa30() {
  function invoke2(target, nums) {
    let i = 0;
    let j = 1;

    let sum = nums[0];
    let minK = nums.length + 1;

    while (i < nums.length) {
      if (j > nums.length || j - i > minK) {
        i++;
        j = i + 1;
        sum = nums[i];
        continue;
      }

      if (sum >= target) {
        const k = j - i;

        if (k === 1) return 1;

        if (!minK || k < minK) {
          minK = k;
        }

        while (nums[i + 1] <= nums[i]) {
          i++;
        }

        i = i + 1;
        j = i + 1;
        sum = nums[i];
        continue;
      }

      sum += nums[j] ?? 0;
      j++;
    }

    if (minK > nums.length) return 0;

    return minK;
  }

  return function invoke(target, nums) {
    let i = 0;
    let j = 0;
    let sum = 0;
    let length = nums.length + 1;

    while (j < nums.length) {
      sum += nums[j];

      while (sum >= target) {
        length = Math.min(length, j - i + 1);

        sum -= nums[i];
        i++;
      }

      j++;
    }

    return length > nums.length ? 0 : length;
  };
}

/**
 * 无重复字符的最长子串
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串的长度。
 * @returns
 */
export function qa31() {
  return function invoke(s) {
    let i = 0;
    let j = 0;
    let max = 0;

    const map = {};

    while (j < s.length) {
      const preIndex = map[s[j]];

      if (preIndex !== undefined) {
        while (i <= preIndex) {
          map[s[i]] = undefined;
          i++;
        }
      }

      map[s[j]] = j;
      max = Math.max(max, j - i + 1);
      j++;
    }

    return max;
  };
}

/**
 * 串联所有单词的子串
 * 给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串 长度相同。
 s 中的 串联子串 是指一个包含  words 中所有字符串以任意顺序排列连接起来的子串。
  例如，如果 words = ["ab","cd","ef"]， 那么 "abcdef"， "abefcd"，"cdabef"， "cdefab"，"efabcd"， 和 "efcdab" 都是串联子串。
  "acdbef" 不是串联子串，因为他不是任何 words 排列的连接。
  返回所有串联子串在 s 中的开始索引。你可以以 任意顺序 返回答案。
 * @returns 
 */
export function qa32() {
  return function invoke(s, words) {
    const len = words[0].length;
    const wordsLen = words.length;

    const r = [];

    const wordsMap = words.reduce((acc, w, i) => {
      acc[w] = (acc[w] ?? 0) + 1;
      return acc;
    }, {});

    let i = 0;

    // 维护一个len * wordsLen 的窗口， 然后遍历这个窗口
    while (i <= s.length - len * wordsLen) {
      let wordsMapCopy = Object.assign({}, wordsMap);
      let wordsCount = 0;

      for (let k = 0; k < wordsLen; k++) {
        const subS = s.slice(i + k * len, i + (k + 1) * len);

        if (!wordsMapCopy[subS]) break;

        if (wordsMapCopy[subS]) {
          wordsMapCopy[subS]--;
          wordsCount++;
        }
      }

      if (wordsCount === wordsLen) {
        r.push(i);
      }

      i++;
    }

    return r;
  };
}

/**
 * 最小覆盖子串
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * @returns
 */
export function qa33() {
  function invoke2(s, t) {
    if (s.length < t.length) return "";

    const tMap = t.split("").reduce((acc, k) => {
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {});

    let lt = 0;
    let min = s.length + 1;
    let minS = "";

    for (let rt = 0; rt < s.length; rt++) {
      const rc = s[rt];

      if (tMap[rc] !== undefined) {
        tMap[rc]--;
      }

      const isRtDone = Object.keys(tMap).every((k) => tMap[k] <= 0);

      if (isRtDone) {
        while (lt < rt) {
          const lc = s[lt];

          if (tMap[lc] !== undefined) {
            tMap[lc]++;
          }

          const isLtDone = Object.keys(tMap).some((k) => tMap[k] > 0);

          if (isLtDone) {
            break;
          }

          lt++;
        }

        const distance = rt - lt;

        if (distance < min) {
          min = distance;
          minS = s.slice(lt, rt + 1);
        }

        lt++;
      }
    }

    return minS;
  }

  return function invoke(s, t) {
    const wordLength = t.length;

    const tMap = t.split("").reduce((acc, s) => {
      acc[s] ??= 0;
      acc[s]++;
      return acc;
    }, {});

    let min;
    let i = 0;
    let j = 0;
    let count = 0;

    while (i <= s.length - wordLength) {
      while (j < s.length) {
        if (tMap[s[j]] !== undefined) {
          tMap[s[j]]--;
        }

        if (tMap[s[j]] >= 0) {
          count++;
        }

        j++;

        if (count === wordLength) {
          break;
        }
      }

      while (i <= s.length - wordLength) {
        if (tMap[s[i]] !== undefined) {
          tMap[s[i]]++;

          if (count === wordLength) {
            if (j - i < (min?.length ?? Infinity)) {
              min = s.slice(i, j);
            }
          }

          if (tMap[s[i]] > 0) {
            count--;
            i++;
            break;
          }
        }

        i++;
      }
    }

    return min ?? "";
  };
}

/**
 * 有效的数独
 * 数字 1-9 在每一行只能出现一次。
  数字 1-9 在每一列只能出现一次。
  数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 * @returns 
 */
export function qa34() {
  // 行列/分割线生成一个完整的key
  return function invoke(board) {
    const rs = board.length;
    const cs = board[0].length;

    const cMap = {};
    const gMap = {};

    for (let r = 0; r < rs; r++) {
      const rMap = {};

      for (let c = 0; c < cs; c++) {
        const t = board[r][c];

        if (t === ".") continue;

        const cKey = `${c}-${t}`;
        // @ts-ignore
        const gKey = `${parseInt(r / 3)}-${parseInt(c / 3)}-${t}`;

        if (rMap[t]) {
          return false;
        }

        if (cMap[cKey]) {
          return false;
        }

        if (gMap[gKey]) {
          return false;
        }

        rMap[t] = true;
        cMap[cKey] = true;
        gMap[gKey] = true;
      }
    }

    return true;
  };
}

/**
 * 螺旋矩阵
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * https://leetcode.cn/problems/spiral-matrix/description/?envType=study-plan-v2&envId=top-interview-150
 * @returns
 */
export function qa35() {
  // 抓住规律，增增减减
  // function invoke2(matrix) {
  //   const r = [];

  //   let minX = 0;
  //   let minY = 0;
  //   let maxX = matrix[0].length - 1;
  //   let maxY = matrix.length - 1;

  //   // 循环的规律是不断改变 边界值/原始坐标/基础坐标，变换规律为 增/增/减/减
  //   const ir = {
  //     pos: 0,
  //     circle: 4,
  //     min: minX,
  //     max: maxX,
  //   };

  //   const get = (i) => {
  //     //@ts-ignore
  //     with (ir) {
  //       if (circle % 2 === 0) {
  //         return matrix[pos][i];
  //       }

  //       return matrix[i][pos];
  //     }
  //   };

  //   const run = () => {
  //     //@ts-ignore
  //     with (ir) {
  //       if (circle > 2) {
  //         for (let i = min; i <= max; i++) {
  //           r.push(get(i));
  //         }
  //       } else {
  //         for (let i = max; i >= min; i--) {
  //           r.push(get(i));
  //         }
  //       }
  //     }
  //   };

  //   //@ts-ignore
  //   with (ir) {
  //     while (min <= max) {
  //       run();

  //       circle--;

  //       switch (circle) {
  //         case 3:
  //           minY++;
  //           min = minY;
  //           max = maxY;
  //           pos = maxX;
  //           break;
  //         case 2:
  //           maxX--;
  //           min = minX;
  //           max = maxX;
  //           pos = maxY;
  //           break;
  //         case 1:
  //           maxY--;
  //           min = minY;
  //           max = maxY;
  //           pos = minX;
  //           break;
  //         case 0:
  //           minX++;
  //           min = minX;
  //           max = maxX;
  //           pos = minY;
  //           circle = 4;
  //           break;
  //       }
  //     }
  //   }

  //   return r;
  // }

  return function invoke(matrix) {
    // 右 -> 下 -> 左 - > 上

    const rows = matrix.length;
    const cols = matrix[0].length;
    const visited = new Array(rows)
      .fill("")
      .map(() => new Array(cols).fill(false));
    const r = [];

    function dfs(y, x, dir) {
      let newX = x,
        newY = y;

      switch (dir) {
        case 1:
          newX++;
          break;
        case 2:
          newY++;
          break;
        case 3:
          newX--;
          break;
        case 4:
          newY--;
          break;
      }

      if (newX < 0 || newY < 0 || newX >= cols || newY >= rows) return;

      y = newY;
      x = newX;

      if (visited[y][x]) return;

      visited[y][x] = 1;
      r.push(matrix[y][x]);

      const list = new Array(4).fill(0).map((_, i) => {
        const d = (dir + i) % 4;

        return d === 0 ? 4 : d;
      });

      list.forEach((d) => {
        dfs(y, x, d);
      });
    }

    dfs(0, -1, 1);

    return r;
  };
}

/**
 * 原地旋转图像
 * 行变列，列变行
 * @returns
 */
export function qa36() {
  return function invoke(matrix) {
    const n = matrix.length;

    for (let x = 0; x < n; x++) {
      const newRow = [];

      for (let y = n - 1; y >= 0; y--) {
        // 拿出的这一列需要成为行
        newRow.push(matrix[y][x]);
      }

      matrix.push(newRow);
    }

    matrix.splice(0, n);

    return matrix;
  };
}

/**
 * 原地矩阵置零
 * @returns
 */
export function qa37() {
  return function invoke(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const visited = new Array(rows)
      .fill("")
      .map(() => new Array(cols).fill(false));

    function dfs(y, x) {
      if (x < 0 || y < 0 || x >= cols || y >= rows || visited[y][x]) return;

      matrix[y][x] = 0;

      for (let i = 0; i < cols; i++) {
        if (!visited[y][i]) {
          visited[y][i] = matrix[y][i] !== 0;
        }
        matrix[y][i] = 0;
      }

      for (let i = 0; i < rows; i++) {
        if (!visited[i][x]) {
          visited[i][x] = matrix[i][x] != 0;
        }
        matrix[i][x] = 0;
      }

      visited[y][x] = true;
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (visited[y][x] || matrix[y][x] !== 0) continue;

        if (matrix[y][x] === 0) {
          dfs(y, x);
        }
      }
    }

    return matrix;
  };
}

/**
 * 生命游戏
 * @returns
 */
export function qa38() {
  // 计算好之后存在数字下方，或者制造两种中间态，死 -> 活 | 活 -> 死
  return function invoke(board) {
    const rows = board.length;
    const cols = board[0].length;

    const isLive = (y, x) => {
      let count = 0;

      const current = board[y][x];

      const steps = [-1, 0, 1];

      const canX = (x1) => x1 > -1 && x1 < cols;
      const canY = (y1) => y1 > -1 && y1 < rows;

      const combs = steps.reduce((acc, x1) => {
        return acc.concat(
          steps
            .map((y1) => [x1, y1])
            .filter((c) => {
              return (
                (c[0] !== 0 || c[1] !== 0) && canX(x + c[1]) && canY(y + c[0])
              );
            })
        );
      }, []);

      for (let i = 0; i < combs.length; i++) {
        const [ap, bp] = combs[i];

        if (board?.[y + ap]?.[x + bp] === 1) {
          count++;
        }
      }

      return Number(
        (current && count < 4 && count > 1) || (!current && count === 3)
      );
    };

    for (let y = 0; y < rows; y++) {
      !board[rows + y + 1] && (board[rows + y + 1] = []);

      for (let x = 0; x < cols; x++) {
        const live = isLive(y, x);

        board[rows + y + 1][x] = live;
      }
    }

    board.splice(0, rows + 1);

    return board;
  };
}

/**
 * 赎金信
 * 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
 */
export function qa39() {
  return function invoke(ransomNote, magazine) {
    if (magazine.length < ransomNote.length) return false;
    if (!magazine) return true;

    const map = magazine.split("").reduce((acc, s) => {
      acc[s] ??= 0;
      acc[s]++;
      return acc;
    }, {});

    for (let i = 0; i < ransomNote.length; i++) {
      if (map[ransomNote[i]] > 0) {
        map[ransomNote[i]]--;
      }

      if (map[ransomNote[i]] < 0) {
        return false;
      }
    }

    return true;
  };
}

/**
 * 同构字符串
 * @returns
 */
export function qa40() {
  // 按坐标把两个字符串变成同构的
  return function invoke(s, t) {
    if (s.length !== t.length) return false;

    const sMap = {};
    const tMap = {};
    const n = s.length;

    for (let i = 0; i < n; i++) {
      if (!tMap[t[i]]) {
        tMap[t[i]] = i + 1;
      }

      if (!sMap[s[i]]) {
        sMap[s[i]] = i + 1;
      }

      if (tMap[t[i]] !== sMap[s[i]]) return false;
    }

    return true;
  };
}

/** 单词规律
 * 给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。
 * 这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。
 * @returns
 */
export function qa41() {
  // 按坐标把两个字符串变成同构的
  return function invoke(pattern, s) {
    const words = Array.from(s.matchAll(/[a-z]+/gi)).map((x) => x[0]);

    if (pattern.length !== words.length) return false;

    const pMap = {};
    const wMap = {};

    for (let i = 0; i < pattern.length; i++) {
      const wk = `#${words[i]}`;

      pMap[pattern[i]] ??= i + "";
      wMap[wk] ??= i + "";

      pMap[pattern[i]] += i;
      wMap[wk] += i;

      if (pMap[pattern[i]] !== wMap[wk]) return false;
    }

    return true;
  };
}

/**
 * 有效的字母异位词
 */
export function qa42() {
  // map存储
  return function invoke(s, t) {
    if (s.length !== t.length) return false;

    const sMap = s.split("").reduce((acc, k) => {
      acc[k] ??= 0;
      acc[k]++;
      return acc;
    }, {});

    for (let i = 0; i < t.length; i++) {
      if (sMap[t[i]] === undefined) return false;

      sMap[t[i]]--;

      if (sMap[t[i]] < 0) return false;
    }

    return true;
  };
}

/**
 * 字母异位词分组
 * @returns
 */
export function qa43() {
  // 按照unicode排序之后
  return function invoke(strs) {
    const tMap = {};

    for (let i = 0; i < strs.length; i++) {
      const sortStr = strs[i].split("").sort().join("");

      tMap[sortStr] ??= [];

      tMap[sortStr].push(strs[i]);
    }

    // @ts-ignore
    return Object.values(tMap);
  };
}

/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 */
export function qa44() {
  return function invoke(nums, target) {
    const tMap = {};

    for (let i = 0; i < nums.length; i++) {
      tMap[nums[i]] ??= [];

      tMap[nums[i]].push(i);

      const left = target - nums[i];

      if (tMap[left]) {
        const leftIndex = tMap[left].find((x) => x !== i);

        if (leftIndex !== null && leftIndex !== undefined) {
          return [leftIndex, i];
        }
      }
    }

    return null;
  };
}

/**
 * 快乐数
 * 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
 * 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
 * 如果这个过程 结果为 1，那么这个数就是快乐数。
 * @returns
 */
export function qa45() {
  // 判断是否会重复出现同一个值
  return function invoke(n) {
    const map = {};

    while (!map[n]) {
      map[n] = 1;

      n = n
        .toString(10)
        .split("")
        .reduce((acc, x) => {
          return acc + parseInt(x, 10) ** 2;
        }, 0);

      if (n === 1) return true;
    }

    return false;
  };
}

/**
 * 存在重复元素 II
 * 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。
 * 如果存在，返回 true ；否则，返回 false 。
 * @returns
 */
export function qa46() {
  return function invoke(nums, k) {
    const map = {};

    for (let i = 0; i < nums.length; i++) {
      if (map[nums[i]]) {
        const index = map[nums[i]].find((x) => Math.abs(i - x) <= k);

        if (index !== undefined && index !== null && index !== i) {
          return true;
        }
      }

      map[nums[i]] ??= [];

      map[nums[i]].push(i);
    }

    return false;
  };
}

/**
 * 最长连续序列
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * @returns
 */
export function qa47() {
  return function invoke(nums) {
    const set = new Set(nums);

    let max = 0;

    for (let n of nums) {
      // 找到递增的最小值，相当于只搜索一边
      if (set.has(n - 1)) continue;

      let i = n;
      let count = 1;

      while (set.has(i + 1)) {
        i++;
        count++;
      }

      max = Math.max(max, count);
    }

    return max;
  };
}

/**
 * 汇总区间
 * 给定一个  无重复元素 的 有序 整数数组 nums 。
 * 返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表 。
 * 也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x 。
 */
export function qa48() {
  return function invoke(nums) {
    let i = 0;
    let j = 0;

    const r = [];

    while (j < nums.length) {
      while (nums[j + 1] === nums[j] + 1) {
        j++;
      }

      if (j > i) {
        r.push(`${nums[i]}->${nums[j]}`);
      } else {
        r.push(`${nums[i]}`);
      }

      j++;
      i = j;
    }

    return r;
  };
}

/**
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
 * 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * @returns
 */
export function qa49() {
  return function invoke(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    let j = 0;

    while (j < intervals.length) {
      while (intervals[j + 1] && intervals[j + 1][0] <= intervals[j][1]) {
        const newInterval = [
          intervals[j][0],
          Math.max(intervals[j][1], intervals[j + 1][1]),
        ];

        intervals.splice(j, 2, newInterval);
      }

      j++;
    }

    return intervals;
  };
}

/**
 * 插入区间
 * 给你一个 无重叠的 ，按照区间起始端点排序的区间列表 intervals，其中 intervals[i] = [starti, endi] 表示第 i 个区间的开始和结束，并且 intervals 按照 starti 升序排列。
 * 同样给定一个区间 newInterval = [start, end] 表示另一个区间的开始和结束。
 * 在 intervals 中插入区间 newInterval，使得 intervals 依然按照 starti 升序排列，且区间之间不重叠（如果有必要的话，可以合并区间）。
 * @returns
 */
export function qa50() {
  function invoke2(intervals, newInterval) {
    if (!intervals || !intervals.length) return [newInterval];

    let i = 0;
    let n = intervals.length;
    let ins = false;

    while (i < intervals.length) {
      const next = intervals[i + 1];
      const current = intervals[i];

      // 插入到前面的节点
      if (current[0] >= newInterval[0] && !ins) {
        intervals.splice(i, 0, newInterval);
        ins = true;

        i > 0 && i--;
        continue;
      }

      // 插入到最后的节点
      if (i === n - 1 && !ins && current[0] < newInterval[0]) {
        intervals.push(newInterval);
        ins = true;

        continue;
      }

      // 合并区间
      if (next && next[0] <= intervals[i][1]) {
        intervals[i] = [intervals[i][0], Math.max(intervals[i][1], next[1])];
        intervals.splice(i + 1, 1);
      } else {
        i++;
      }
    }

    return intervals;
  }

  return function invoke(intervals, newInterval) {
    if (!intervals || !intervals.length) return [newInterval];

    const [leftVal] = newInterval;
    const n = intervals.length;

    let i = 0;

    while (i < intervals.length) {
      const [start] = intervals[i];

      if (start >= leftVal) {
        intervals.splice(i, 0, newInterval);
        break;
      }

      i++;
    }

    if (intervals.length === n) {
      intervals.push(newInterval);
    }

    let j = i > 0 ? i - 1 : i;

    while (j < intervals.length) {
      while (intervals[j + 1] && intervals[j + 1][0] <= intervals[j][1]) {
        const newInterval = [
          intervals[j][0],
          Math.max(intervals[j][1], intervals[j + 1][1]),
        ];

        intervals.splice(j, 2, newInterval);
      }

      j++;
    }

    return intervals;
  };
}

/**
 * 用最少数量的箭引爆气球
 * 有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 points ，其中points[i] = [xstart, xend] 表示水平直径在 xstart 和 xend之间的气球。你不知道气球的确切 y 坐标。
  一支弓箭可以沿着 x 轴从不同点 完全垂直 地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被 引爆 。可以射出的弓箭的数量 没有限制 。 弓箭一旦被射出之后，可以无限地前进。
  给你一个数组 points ，返回引爆所有气球所必须射出的 最小 弓箭数 。
 * @returns 
 */
export function qa51() {
  function invoke2(points) {
    points.sort((a, b) => a[0] - b[0]);

    const steps = [];

    let count = 0;
    let rightMost = 0;
    let end = 0;

    for (let i = 0; i < points.length; i++) {
      const current = points[i];

      let j = i;
      let [lt, rt] = current;

      while (points[j]?.[0] <= rt) {
        rt = Math.min(points[j][1], rt);
        lt = points[j][0];

        j++;
      }

      steps.push(j - i);

      rightMost = Math.max(rightMost, i + steps[i]);

      if (i === end) {
        count++;
        end = rightMost;
      }

      if (end >= points.length) return count;
    }

    return count;
  }

  function invoke3(points) {
    points.sort((a, b) => a[0] - b[0]);

    let j = 0;

    // 相当于区间之间求并集
    while (j < points.length) {
      while (points[j + 1] && points[j + 1][0] <= points[j][1]) {
        const mergeInterval = [
          Math.max(points[j][0], points[j + 1][0]),
          Math.min(points[j][1], points[j + 1][1]),
        ];

        points.splice(j, 2, mergeInterval);
      }

      j++;
    }

    return points.length;
  }

  return function invoke(points) {
    points.sort((a, b) => a[1] - b[1]);

    if (!points.length) return 0;

    let pos = points[0][1];
    let ans = 1;

    for (let p of points) {
      if (p[0] > pos) {
        pos = p[1];
        ans++;
      }
    }

    return ans;
  };
}

/**
 * 有效的括号
 * 使用单调栈的方法，如果匹配到栈顶，则出栈
 */
export function qa52() {
  return function invoke(s) {
    if (!s) return true;

    const rMap = {
      ")": "(",
      "]": "[",
      "}": "{",
    };

    const stack = [];

    for (let i = 0; i < s.length; i++) {
      const t = s[i];

      if (rMap[t] && rMap[t] === stack[0]) {
        stack.shift();
        continue;
      }

      stack.unshift(t);
    }

    return stack.length === 0;
  };
}

/**
 * 简化路径
 * 使用单调栈的方式，遇到..则出栈一次
 * @returns
 */
export function qa53() {
  return function invoke(path) {
    const paths = path.split("/").filter((x) => !!x && x !== ".");

    let r = [];

    for (let i = 0; i < paths.length; i++) {
      if (paths[i] === "..") {
        r.pop();
        continue;
      }

      r.push(paths[i]);
    }

    return `/${r.join("/")}`;
  };
}

/**
 * 最小栈
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 */
export function qa54() {
  // 使用最小堆，或者在插入的时候维护一个排序数组
  var MinStack = function () {
    this.stack = [];

    this.heep = [];
  };

  /**
   * @param {number} val
   * @return {void}
   */
  MinStack.prototype.push = function (val) {
    this.stack.push(val);

    if (this.heep.length === 0) {
      this.heep.push({ i: 0, val });
      return;
    }

    let ins = false;

    for (let i = 0; i < this.heep.length; i++) {
      if (val < this.heep[i].val) {
        ins = true;
        this.heep.splice(i, 0, { i: this.stack.length - 1, val });
        break;
      }
    }

    if (!ins) {
      this.heep.push({ i: this.stack.length - 1, val });
    }
  };

  /**
   * @return {void}
   */
  MinStack.prototype.pop = function () {
    const i = this.heep.findIndex((x) => x.i === this.stack.length - 1);
    this.heep.splice(i, 1);

    this.stack.pop();
  };

  /**
   * @return {number}
   */
  MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1];
  };

  /**
   * @return {number}
   */
  MinStack.prototype.getMin = function () {
    return this.heep[0].val;
  };
}

/**
 * 逆波兰表达式求值
 * 给你一个字符串数组 tokens ，表示一个根据 逆波兰表示法 表示的算术表达式。
 */
export function qa55() {
  return function invoke(tokens) {
    const stack = [];

    const opMap = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];

      if (!opMap[t]) {
        stack.push(t);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        let r = eval(`${a} ${t} ${b}`);

        if (t === "/") {
          r = parseInt(r);
        }

        stack.push(r);
      }
    }

    return stack[0];
  };
}

/**
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
 * @returns
 */
export function qa56() {
  return function invoke(s) {
    const stack = [];

    const isBlank = (t) => t.trim().length === 0;

    const fs = s.trim();

    const oMap = {
      "(": 1,
      ")": -1,
      "+": 1,
      "-": 1,
    };

    const calc = (cStack) => {
      let result;

      for (let i = 0; i < cStack.length; i++) {
        const cur = cStack[i];

        let next = cStack[i + 1];

        if (cur == "-") {
          let j = i;

          while (cStack[j] == "-") {
            j++;
          }

          next = cStack[j];

          const isM = j - (i % 2) === 0;

          if (result !== undefined) {
            result = isM ? result + next : result - next;
          } else {
            result = isM ? next : -next;
          }

          i = j;

          continue;
        }

        if (cur === "+") {
          result = result + next;
          i++;
          continue;
        }

        result = cur;
      }

      return result;
    };

    for (let i = 0; i < fs.length; i++) {
      const t = fs[i];

      if (isBlank(t)) continue;

      // 处理数字
      if (!oMap[t]) {
        let n = "";
        let j = i;

        while (fs[j] && !oMap[fs[j]] && !isBlank(fs[j])) {
          n += fs[j];
          j++;
        }

        stack.push(parseInt(n));

        i = j - 1;
        continue;
      }

      // 处理括号
      if (t === ")") {
        const newStack = [];

        while (stack[stack.length - 1] !== "(") {
          newStack.unshift(stack.pop());
        }

        stack.pop();

        stack.push(calc(newStack));
        continue;
      }

      stack.push(t);
    }

    return calc(stack);
  };
}

/**
 * 环形链表
 * 给你一个链表的头节点 head ，判断链表中是否有环。
 * @returns
 */
export function qa57() {
  // 使用map记录指针
  return function invoke(head) {
    const pointerSet = new WeakSet();

    let pointer = head;

    while (pointer?.next) {
      if (pointerSet.has(pointer)) {
        return true;
      }

      pointerSet.add(pointer);
      pointer = pointer.next;
    }

    return false;
  };
}

/**
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * @returns
 */
export function qa58() {
  return function invoke(l1, l2) {
    // 进位
    let p = 0;

    let newHead;
    let newP;
    let left = l1;
    let right = l2;

    while (left || right) {
      const leftVal = left?.val ?? 0;
      const rightVal = right?.val ?? 0;

      let sum = leftVal + rightVal + p;

      if (sum > 9) {
        sum = sum % 10;
        p = 1;
      } else {
        p = 0;
      }

      const node = new ListNode(sum);

      if (!newHead) {
        newHead = node;
      }

      newP && newP.next == node;
      newP = node;
    }

    return newHead;
  };
}

/**
 * 合并两个有序链表
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 * @returns
 */
export function qa59() {
  return function invoke(list1, list2) {
    let head;
    let p;

    while (list1 || list2) {
      const left = list1?.val ?? Infinity;
      const right = list2?.val ?? Infinity;

      let node;

      if (left <= right) {
        node = list1;
        list1 = list1.next;
      } else {
        node = list2;
        list2 = list2.next;
      }

      node.next = null;

      !head && (head = node);
      p && (p.next = node);
      p = node;
    }

    return head;
  };
}

/**
 * 随机链表的复制
 * @returns
 */
export function qa60() {
  // 给每个节点标记上序号
  return function invoke(head) {
    let p = head;
    let np;
    let nHead;
    let i = 0;

    const nMap = new Map();

    while (p) {
      p.i = i;

      // @ts-ignore
      const n = new Node(p.val);

      nMap.set(i, n);

      !nHead && (nHead = n);
      np && (np.next = n);
      np = n;

      p = p.next;
      i++;
    }

    p = head;
    np = nHead;

    while (p) {
      if (p.random) {
        np.random = nMap.get(p.random.i);
      }

      p = p.next;
      np = np.next;
    }

    return nHead;
  };
}

/**
 * 反转链表 II
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 * @returns
 */
export function qa61() {
  // 把需要反转的部分放入栈中
  return function invoke(head, left, right) {
    if (!head) return head;

    let p = head;

    const stack = [];

    let leftP;

    while (p) {
      if (p.val < left) {
        leftP = p;
      }

      if (p.val >= left && p.val <= right) {
        stack.push(p);
      }

      p = p.next;

      let newHead;
      let np;

      if (p?.val > right || !p) {
        if (stack.length === 0) return head;

        while (stack.length > 0) {
          const newP = stack.pop();

          !newHead && (newHead = newP);
          np && (np.next = newP);
          np = newP;
        }

        np.next = p;

        if (leftP) {
          leftP.next = newHead;

          return head;
        } else {
          return newHead;
        }
      }
    }

    return head;
  };
}

/**
 *  K 个一组翻转链表
 * @returns
 */
export function qa62() {
  // 同上述操作
  return function invoke(head, k) {
    if (!head || !k || k < 2) return head;

    const reverse = (stack) => {
      let header;
      let footer;

      let p;

      while (stack.length > 0) {
        const n = stack.pop();

        !header && (header = n);
        p && (p.next = n);
        p = n;
      }

      footer = p;
      footer.next = null;

      return [header, footer];
    };

    let p = head;
    let pre = null;
    let newHead;

    const stack = [];

    while (p) {
      stack.push(p);

      p = p.next;

      if (stack.length === k) {
        const [h, f] = reverse(stack);

        !newHead && (newHead = h);

        pre && (pre.next = h);

        pre = f;

        p && (f.next = p);
      }
    }

    return newHead || head;
  };
}

/**
 * 删除链表的倒数第 N 个结点
 * @returns
 */
export function qa63() {
  // 使用回溯的方法
  return function invoke(head, n) {
    let rt = null;
    let lCount = 0;
    let newHead = head;

    function view(node) {
      if (!node) {
        return 0;
      }

      lCount++;

      const preI = view(node.next);

      const i = preI + 1;

      if (i === n - 1) {
        rt = node;
      }

      // 删除当前节点
      if (i === n) {
        if (i === lCount) {
          newHead = node.next;
        }

        node.next = null;
      }

      if (i === n + 1) {
        node.next = rt;
      }

      return i;
    }

    const count = view(head);

    if (count < n) return head;

    return newHead;
  };
}

/**
 * 删除排序链表中的重复元素 II
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
 * @returns
 */
export function qa64() {
  return function invoke(head) {
    let p = head;
    let pre = null;

    while (p) {
      let count = 0;

      while (p.next?.val == p.val) {
        p.next = p.next?.next;
        count++;
      }

      if (count > 0) {
        if (pre) {
          pre.next = p.next;
          p = pre.next;
          continue;
        } else {
          head = p.next;
          p = head;
          continue;
        }
      }

      pre = p;
      p = p.next;
    }

    return head;
  };
}

/**
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 * @returns
 */
export function qa65() {
  // 使用回溯的方法
  function invoke2(head, k) {
    let count = 0;
    let newHead = head;

    function view(node) {
      // 到达尾部
      if (!node) {
        return 0;
      }

      count++;

      const i = 1 + view(node.next);

      const times = k % count;

      // 到达尾部节点
      if (i === 1 && times > 0) {
        node.next = head;
      }

      if (i === times) {
        newHead = node;
      }

      if (i === times + 1) {
        node.next = null;
      }

      return i;
    }

    view(head);

    return newHead;
  }

  return function invoke(head, k) {
    if (!head) return head;

    let p = head;
    let pre = null;
    let ft;
    let count = 0;

    while (p) {
      if (!p?.next) {
        ft = p;
      }

      count++;

      p.prev = pre;

      pre = p;
      p = p.next;
    }

    const times = k % count;

    if (times === 0) return head;

    ft.next = head;

    let np = ft;

    for (let i = 1; i < times; i++) {
      np = np.prev;
    }

    np.prev.next = null;

    return np;
  };
}

/**
 * 分隔链表
 * 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
 * @returns
 */
export function qa66() {
  // 使用数组排序之后串联
  function invoke2(head, x) {
    if (!head) return head;

    let p = head;

    const stack = [];

    let i = -1;

    while (p) {
      if (p.val >= x) {
        stack.push(p);
        i === -1 && (i = stack.length - 1);
      } else {
        if (i > -1) {
          stack.splice(i, 0, p);
          i++;
        } else {
          stack.push(p);
        }
      }

      p = p.next;
    }

    for (let i = 0; i < stack.length - 1; i++) {
      const cur = stack[i];
      const next = stack[i + 1];

      cur.next = next;
      next.next = null;
    }

    return stack[0];
  }

  return function invoke(head, x) {
    let p = head;
    let pre = null;

    const stack = [];

    while (p) {
      if (p.val >= x) {
        stack.push(p);

        if (pre) {
          pre.next = p.next;
          p = pre.next;
        } else {
          head = p.next;
          p = head;
        }

        continue;
      }

      pre = p;
      p = p.next;
    }

    p = pre;

    for (let i = 0; i < stack.length; i++) {
      stack[i].next = null;

      if (!p) {
        head = stack[i];
        p = head;
        continue;
      }

      p && (p.next = stack[i]);
      p = p.next;
    }

    return head;
  };
}

/**
 * LRU 缓存
 * 使用一个栈去维护使用的顺序
 * @returns
 */
export function qa67() {
  /**
   * @param {number} capacity
   */
  var LRUCache = function (capacity) {
    this.capacity = capacity;

    // 怎么能在指针变动的情况下，指针不动
    this.map = {};
    this.stack = [];
  };

  /**
   * @param {number} key
   * @return {number}
   */
  LRUCache.prototype.get = function (key) {
    const t = this.map[key] ?? -1;

    if (t !== -1) {
      const dataIndex = this.stack.findIndex((t) => t === key);

      this.stack.splice(dataIndex, 1);

      this.stack.push(key);
    }

    return t;
  };

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  LRUCache.prototype.put = function (key, value) {
    if (this.map[key]) {
      this.map[key] = value;

      const dataIndex = this.stack.findIndex((t) => t === key);

      this.stack.splice(dataIndex, 1);

      this.stack.push(key);

      return;
    }

    if (this.stack.length === this.capacity) {
      const lastKey = this.stack.shift();
      delete this.map[lastKey];
    }

    this.map[key] = value;
    this.stack.push(key);
    return;
  };
}

/**
 * 二叉树的最大深度
 * @returns
 */
export function qa68() {
  return function invoke(root) {
    function dfs(node, deepth = 0) {
      if (!node) return deepth;

      return Math.max(dfs(node.left, deepth + 1), dfs(node.right, deepth + 1));
    }

    return dfs(root);
  };
}

/**
 * 相同的树
 * @returns
 */
export function qa69() {
  return function invoke(p, q) {
    function dfs(p, q) {
      if (!p && !q) return true;

      if (p?.val !== q?.val) return false;

      return dfs(p.left, q.left) && dfs(p.right, q.right);
    }

    return dfs(p, q);
  };
}

/**
 * 翻转二叉树
 * @returns
 */
export function qa70() {
  return function invoke(root) {
    function dfs(node) {
      if (!node) return root;

      const temp = node.left;

      node.left = node.right;
      node.right = temp;

      dfs(node.left);
      dfs(node.right);

      return node;
    }

    return dfs(root);
  };
}

/**
 * 对称二叉树
 * @returns
 */
export function qa71() {
  return function invoke(root) {
    function isSame(node1, node2) {
      if (!node1 && !node2) return true;

      if (node1?.val !== node2?.val) return false;

      return isSame(node1.left, node2.right) && isSame(node1.right, node2.left);
    }

    return isSame(root?.left, root?.right);
  };
}

/**
 * 从前序与中序遍历序列构造二叉树
 * @returns
 */
export function qa72() {
  // 利用回溯
  return function invoke(preorder, inorder) {
    const [rootV] = preorder;

    const mid = inorder.indexOf(rootV);

    const preOrderLeft = preorder.slice(1, mid + 1);
    const preOrderRight = preorder.slice(mid + 1);

    const inorderLeft = inorder.slice(0, mid);
    const inorderRight = inorder.slice(mid + 1);

    const rootNode = new TreeNode(rootV);

    rootNode.left = invoke(preOrderLeft, inorderLeft);

    rootNode.right = invoke(preOrderRight, inorderRight);

    return rootNode;
  };
}

/**
 * 从中序与后序遍历序列构造二叉树
 * @returns
 */
export function qa73() {
  // 利用回溯
  return function invoke(inorder, postorder) {
    if (!inorder?.length && !postorder?.length) return null;

    const rootV = postorder[postorder.length - 1];

    const mid = inorder.indexOf(rootV);

    const inorderLeft = inorder.slice(0, mid);
    const inorderRight = inorder.slice(mid + 1);

    const postOrderLeft = postorder.slice(0, mid);
    const postOrderRight = postorder.slice(mid, -1);

    const root = new TreeNode(rootV);

    root.left = invoke(inorderLeft, postOrderLeft);
    root.right = invoke(inorderRight, postOrderRight);

    return root;
  };
}

/**
 * 填充每个节点的下一个右侧节点指针 II
 * 利用层次遍历
 * @returns
 */
export function qa74() {
  return function (root) {
    let stack = [root];

    while (stack.length > 0) {
      let i = 0;
      let len = stack.length;

      while (i < len) {
        const t = stack.shift();

        if (t) {
          t.next = i + 1 < len ? stack[0] : null;
          t.left && stack.push(t.left);
          t.right && stack.push(t.right);
        }

        i++;
      }
    }

    return root;
  };
}

/**
 * 二叉树展开为链表
 * @returns
 */
export function qa75() {
  return function invoke(root) {
    function dfs(node) {
      if (!node?.left && !node?.right) return node;

      const rightNode = dfs(node.right);

      let p = node;

      node.left = null;

      const next = dfs(node.left);

      if (next) {
        p.right = next;
        p = next;
      }

      if (rightNode) {
        p.right = rightNode;
      }

      return node;
    }

    return dfs(root);
  };
}

/**
 * 路径总和
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
 * 如果存在，返回 true ；否则，返回 false 。
 * @returns
 */
export function qa76() {
  return function invoke(root, targetSum) {
    function dfs(node, targetSum) {
      if (!node) return false;

      if (node.val === targetSum && !node.left && !node.right) {
        return true;
      }

      return (
        dfs(node.left, targetSum - node.val) ||
        dfs(node.right, targetSum - node.val)
      );
    }

    return dfs(root, targetSum);
  };
}

/**
 * 求根节点到叶节点数字之和
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。每条从根节点到叶节点的路径都代表一个数字：
 * @returns
 */
export function qa77() {
  function invoke2(root) {
    const r = [];

    function dfs(node, acc = "") {
      if (node && !node.left && !node.right) {
        r.push(acc + node.val);
        return;
      }

      dfs(node.left, acc + node.val);
      dfs(node.right, acc + node.val);
    }

    dfs(root);

    const res = r.reduce((acc, x) => acc + parseInt(x), 0);

    return res;
  }

  return function invoke(root) {
    function dfs(node, sum = 0) {
      if (!node) return 0;

      const newSum = sum * 10 + node.val;

      if (!node.left && !node.right) {
        return newSum;
      }

      return dfs(node.left, newSum) + dfs(node.right, newSum);
    }

    return dfs(root);
  };
}

/**
 * 二叉树中的最大路径和
 * 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。
 * 该路径 至少包含一个 节点，且不一定经过根节点。
 * @returns
 */
export function qa78() {
  return function invoke(root) {
    let max = -Infinity;

    function dfs(node) {
      if (!node) return 0;

      // 计算某一节点的最大路径和
      // 要么取左子树，要么不取
      const leftMax = Math.max(0, dfs(node.left));
      // 要么取右边子树，要么不取
      const rightMax = Math.max(0, dfs(node.right));

      // 最大路径和为左子树，加右子树，加当前节点
      max = Math.max(max, leftMax + rightMax + node.val);

      // 从当前节点出发，只能到左子树，或者右子树
      return Math.max(leftMax, rightMax) + node.val;
    }

    return dfs(root);
  };
}

/**
 * 二叉搜索树迭代器
 * 使用栈去管理顺序
 */
export function qa79() {
  function bfs(node, onView) {
    if (!node) onView(null);

    node.left && bfs(node.left, onView);

    onView(node);

    node.right && bfs(node.right, onView);
  }

  var BSTIterator = function (root) {
    this.min = Infinity;
    this.dataIndex = 0;

    this.stack = [];

    bfs(root, (node) => {
      if (node) {
        this.stack.push(node);
      }

      if (node?.val < this.min) {
        this.min = node.val;
        this.dataIndex = this.stack.length - 1;
      }
    });

    this.initDataIndex = this.dataIndex;
    this.dataIndex--;
  };

  /**
   * @return {number}
   */
  BSTIterator.prototype.next = function () {
    this.dataIndex++;

    if (this.dataIndex > this.stack.length + this.initDataIndex) {
      return null;
    }

    return this.stack[this.dataIndex % this.stack.length]?.val;
  };

  /**
   * @return {boolean}
   */
  BSTIterator.prototype.hasNext = function () {
    return this.dataIndex + 1 < this.stack.length + this.initDataIndex;
  };
}

/**
 * 完全二叉树的节点个数
 */
export function qa80() {
  return function invoke(root) {
    function countLevel(node) {
      let lv = 0;
      while (node.left) {
        lv++;
        node = node.left;
      }

      return lv;
    }

    /**
     * 本质就是二分查找： 比较左右两颗子树的高度：
     * 1.如果当前节点左右子树高度相等：当前节点的左子树就是一颗满二叉树，可以直接计算左子树节点个树为：
     * 2的左子树高度次方。总的节点个树，则只需再加上右子树的节点树。把右子节点树继续递归求解。
     * 2.如果当前节点左右子树高度不相等：则左子树可能不是满二叉树，且右子树是满二叉树，则利用右子树高度就可以求出右子树节点个树。
     * 此时只需继续递归求解左子树，就可以得到总节点树。
     * @param node
     * @returns
     */
    function count(node) {
      if (!node) return 0;

      const lvLeft = countLevel(node.left);
      const lvRight = countLevel(node.right);

      // 左右子树高度一致，则左树为满二叉树
      if (lvLeft === lvRight) {
        return count(node.right) + (1 << lvLeft);
      } else {
        return count(node.left) + (1 << lvRight);
      }
    }

    return count(root);
  };
}

/**
 * 二叉树的最近公共祖先
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先
 * @returns
 */
export function qa81() {
  return function invoke(root, p, q) {
    let pi;
    let qi;

    function dfs(node, acc = 0) {
      if (!node || (pi && qi)) return acc;

      node.i = acc;

      if (node.val === p.val) {
        pi = node;
      }

      if (node.val === q.val) {
        qi = node;
      }

      node.left && (node.left.father = node);
      node.right && (node.right.father = node);

      const left = dfs(node.left, acc + 1);
      const right = dfs(node.right, left);

      return right;
    }

    dfs(root);

    while (pi?.i !== qi?.i) {
      if (pi.i > qi.i) {
        pi = pi.father;
      } else {
        qi = qi.father;
      }
    }

    return qi;
  };

  function invoke2(root, p, q) {
    function dfs(node, onView) {
      if (!node) return;

      onView(node, !!(node.left || node.right));

      node.left && (node.left.father = node);
      node.right && (node.right.father = node);

      dfs(node.left, onView);
      dfs(node.right, onView);
    }

    const fathers = [];

    // 相当于栈中的父亲节点顺序为 根父节点，左父亲节点，右父亲节点，要确保为同一个父亲，则要确定两者的父亲在同一个分支中
    // 父亲栈节点中存储的为父亲节点的先序遍历结果

    let pi;
    let qi;

    dfs(root, (node, isFather) => {
      if (isFather) {
        node.i = fathers.length;
        fathers.push(node);
      }

      if (node.val === p.val) {
        pi = isFather ? node.i : node.father?.i ?? 0;
      }

      if (node.val === q.val) {
        qi = isFather ? node.i : node.father?.i ?? 0;
      }
    });

    if (pi == undefined || qi === undefined) {
      return null;
    }

    while (pi !== qi) {
      if (pi < qi) {
        qi = fathers[qi].father.i;
      }

      if (pi > qi) {
        pi = fathers[pi].father.i;
      }
    }

    return fathers[pi];
  }
}

/**
 * 二叉树的右视图
 * @returns
 */
export function qa82() {
  return function invoke(root) {
    let stack = [root];

    const rightView = [];

    while (stack.length > 0) {
      stack.slice(-1)[0] && rightView.push(stack.slice(-1)[0].val);

      const children = stack.reduce((acc, father) => {
        father?.left && acc.push(father.left);
        father?.right && acc.push(father.right);

        return acc;
      }, []);

      stack = children;
    }

    return rightView;
  };
}

/**
 * 二叉树的层平均值
 * @returns
 */
export function qa83() {
  return function invoke(root) {
    let stack = [root];

    const avgs = [];

    while (stack.length > 0) {
      const filter = stack.filter((x) => !!x);

      avgs.push(
        filter.length > 0
          ? filter.reduce((acc, cur) => acc + cur.val, 0) / filter.length
          : 0
      );

      const children = stack.reduce((acc, father) => {
        father?.left && acc.push(father.left);
        father?.right && acc.push(father.right);

        return acc;
      }, []);

      stack = children;
    }

    return avgs;
  };
}

/**
 * 叉树的层序遍历
 * @returns
 */
export function qa84() {
  return function invoke(root) {
    if (!root) return [];

    let stack = [root];

    const list = [];

    while (stack.length > 0) {
      list.push(stack.filter((x) => !!x).map((x) => x?.val));

      const children = stack.reduce((acc, father) => {
        father?.left && acc.push(father.left);
        father?.right && acc.push(father.right);

        return acc;
      }, []);

      stack = children;
    }

    return list;
  };
}

/**
 * 二叉树的锯齿形层序遍历
 * @returns
 */
export function qa85() {
  return function invoke(root) {
    if (!root) return [];

    let stack = [root];

    const list = [];

    let i = 0;

    while (stack.length > 0) {
      const children = stack.reduce((acc, father) => {
        father?.left && acc.push(father.left);
        father?.right && acc.push(father.right);

        return acc;
      }, []);

      const nodes = [];

      while (stack.length > 0) {
        const target = i % 2 === 0 ? stack.shift() : stack.pop();

        target && nodes.push(target.val);
      }

      list.push(nodes);

      stack = children;
      i++;
    }

    return list;
  };
}

/**
 * 二叉搜索树的最小绝对差
 * @returns
 */
export function qa86() {
  return function invoke(root) {
    let min = Infinity;

    const bfs = (node, onView) => {
      if (!node) return;

      bfs(node.left, onView);
      onView(node);
      bfs(node.right, onView);
    };

    let pre = Infinity;

    bfs(root, (node) => {
      min = Math.min(Math.abs(pre - node.val), min);
      pre = node.val;
    });

    return min;
  };
}

/**
 * 二叉搜索树中第K小的元素
 * @returns
 */
export function qa87() {
  // 栈的遍历方法
  return function invoke(root, k) {
    const stack = [];
    while (root != null || stack.length) {
      while (root != null) {
        stack.push(root);
        root = root.left;
      }
      root = stack.pop();
      --k;
      if (k === 0) {
        break;
      }
      root = root.right;
    }
    return root.val;
  };

  function invoke2(root, k) {
    const dfs = (node, onView) => {
      if (!node) return;

      dfs(node.left, onView);
      onView(node);
      dfs(node.right, onView);
    };

    let i = 0;
    let r;

    dfs(root, (node) => {
      i++;
      if (i === k) {
        r = node.val;
      }
    });

    return r;
  }
}

/**
 * 验证二叉搜索树
 */
export function qa88() {
  function invoke2(root) {
    const bfs = (node, onView) => {
      if (!node) return;

      bfs(node.left, onView);
      onView(node);
      bfs(node.right, onView);
    };

    let isValid = true;
    let pre = -Infinity;

    bfs(root, (node) => {
      if (isValid) {
        isValid = pre < node.val;
      }

      pre = node.val;
    });

    return isValid;
  }

  return function invoke(root) {
    const stack = [];

    let pre = -Infinity;

    while (root != null || stack.length) {
      while (root != null) {
        stack.push(root);
        root = root.left;
      }

      root = stack.pop();

      if (root && root.val <= pre) {
        return false;
      }

      pre = root.val;

      root = root.right;
    }

    return true;
  };
}

/**
 * 岛屿数量
 * 图的深度遍历
 * @returns
 */
export function qa89() {
  return function invoke(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    const visited = new Array(rows)
      .fill(0)
      .map(() => new Array(cols).fill(false));

    function dfs([y, x]) {
      if (x < 0 || x >= cols || y < 0 || y >= rows || visited[y][x])
        return false;

      visited[y][x] = true;

      if (grid[y][x] == 0) {
        return false;
      }

      const t = dfs([y + 1, x]);
      const b = dfs([y - 1, x]);
      const l = dfs([y, x - 1]);
      const r = dfs([y, x + 1]);

      return true || t || b || l || r;
    }

    let count = 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x] == 1 && !visited[y][x]) {
          dfs([y, x]);
          count++;
        }
      }
    }

    return count;
  };
}

/**
 * 被围绕的区域
 */
export function qa90() {
  return function invoke(board) {
    const rows = board.length;
    const cols = board[0].length;

    const visited = new Array(rows)
      .fill(0)
      .map(() => new Array(cols).fill(false));

    function dfs([y, x], onView) {
      // 如果是超出边界的或者是访问过的，直接返回
      if (x < 0 || x >= cols || y < 0 || y >= rows) return false;

      if (visited[y][x] || board[y][x] == "X") {
        return true;
      }

      visited[y][x] = true;

      // 如果是边界值，直接返回
      const isLine = x == 0 || x == cols - 1 || y == 0 || y == rows - 1;

      if (isLine) return false;

      onView([y, x]);

      const t = dfs([y + 1, x], onView);
      const b = dfs([y - 1, x], onView);
      const l = dfs([y, x - 1], onView);
      const r = dfs([y, x + 1], onView);

      return true && t && b && l && r;
    }

    for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
        if (board[y][x] == "O" && !visited[y][x]) {
          const arr = [];

          const isValid = dfs([y, x], (p) => arr.push(p));

          if (isValid) {
            arr.forEach(([y, x]) => {
              board[y][x] = "X";
            });
          }
        }
      }
    }

    return board;
  };
}

/**
 * 克隆图
 * 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。
 * @returns
 */
export function qa91() {
  return function invoke(node) {
    const nodeMap = {};

    function copy(graphNode) {
      if (!node) return;

      if (nodeMap[graphNode.val]) {
        return nodeMap[graphNode.val];
      }

      const newNode = new Node(graphNode.val);

      nodeMap[graphNode.val] = newNode;

      newNode.neighbors = graphNode.neighbors.map((n) => copy(n));

      return newNode;
    }

    const newNode = copy(node);

    return newNode;
  };
}

/**
 * 除法求值
 * 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，
 * 其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。
 * 另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案。
 * @returns
 */
export function qa92() {
  /**
   * 图的深度遍历
   */
  return function invoke(equations, values, queries) {
    const graph = {};

    const equationMap = {};

    for (let i = 0; i < equations.length; i++) {
      const [s, e] = equations[i];

      equationMap[`${s}_${e}`] = values[i];
      equationMap[`${e}_${s}`] = 1 / values[i];

      graph[s] ??= new Set();
      graph[e] ??= new Set();

      if (!graph[s].has(e)) {
        graph[s].add(e);
      }

      if (!graph[e].has(s)) {
        graph[e].add(s);
      }
    }

    function findQuery(start, end, visited = {}, acc = 1) {
      if (!graph[start]) return -1;

      if (start === end) {
        return acc;
      }

      for (const p of graph[start]) {
        if (visited[p]) continue;

        visited[p] = true;

        const result = findQuery(
          p,
          end,
          visited,
          acc * equationMap[`${start}_${p}`]
        );

        if (result !== -1) return result;
      }

      return -1;
    }

    const rs = queries.map((x) => findQuery(x[0], x[1]));

    return rs;
  };
}

/**
 * 课程表
 * 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
 * 在选修某些课程之前需要一些先修课程。
 * 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，
 * 表示如果要学习课程 ai 则 必须 先学习课程  bi 。
 * @returns
 */
export function qa93() {
  return function invoke2(numCourses, prerequisites) {
    const linkedMap = prerequisites.reduce((acc, x) => {
      acc[x[0]] ??= [];
      acc[x[0]].push(x[1]);
      return acc;
    }, {});

    function dfs(
      i,
      visited = new Array(numCourses).fill(0),
      length = numCourses
    ) {
      if (length === 0) return [];

      const linked = linkedMap[i];

      // 判断能否修这门课程
      if ((linked && linked.some((x) => !visited[x])) || visited[i]) {
        return [];
      }

      // 查找其它课程
      visited[i] = 1;

      const path = [i];

      if (length === 1) return path;

      for (let j = 0; j < numCourses; j++) {
        if (visited[j]) continue;

        const innerPath = dfs(j, visited, length - 1);

        const newPath = path.concat(innerPath);

        if (newPath.length === length) {
          return newPath;
        }
      }

      return [];
    }

    for (let i = 0; i < numCourses; i++) {
      const path = dfs(i);

      if (path.length > 0) return true;
    }

    return false;
  };

  function invoke(numCourses, prerequisites) {
    if (!prerequisites.length) return true;

    const dep = {};

    for (let i = 0; i < prerequisites.length; i++) {
      const [e, s] = prerequisites[i];

      dep[e] ??= [];

      // 如果存在相互依赖的情况
      if (dep[s] && dep[s].indexOf(e) > -1) {
        return false;
      }

      dep[e].push(s);
    }

    function dfs(node, visited = {}) {
      let maxPaths = [];

      // 判断是否能到达该点
      const canAccess = (dep[node] || []).every((x) => visited[x]);

      if (!canAccess) return [];

      visited[node] = true;

      for (let p = 0; p < numCourses; p++) {
        if (visited[p]) continue;

        const result = dfs(p, visited);

        if (result.length > maxPaths.length) {
          maxPaths = result;
        }
      }

      return [node].concat(maxPaths);
    }

    for (let i = 0; i < numCourses; i++) {
      const paths = dfs(i);

      if (paths.length >= numCourses) {
        return true;
      }
    }

    return false;
  }
}

/**
 * 课程表 II
 * 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi] ，
 * 表示在选修课程 ai 前 必须 先选修 bi 。
 * 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。
 * 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。
 * @returns
 */
export function qa94() {
  function invoke(numCourses, prerequisites) {
    if (!prerequisites.length)
      return new Array(numCourses).fill(0).map((_, i) => i);

    const dep = {};

    for (let i = 0; i < prerequisites.length; i++) {
      const [e, s] = prerequisites[i];

      dep[e] ??= [];

      // 如果存在相互依赖的情况
      if (dep[s] && dep[s].indexOf(e) > -1) {
        return [];
      }

      dep[e].push(s);
    }

    function dfs(node, length = 1, visited = {}) {
      // 判断是否能到达该点
      const canAccess = (dep[node] || []).every((x) => visited[x]);

      if (!canAccess) return null;

      if (length === 1) return [node];

      visited[node] = true;

      for (let p = 0; p < numCourses; p++) {
        if (visited[p]) continue;

        const paths = dfs(p, length - 1, visited);

        if (paths) {
          return [node].concat(paths);
        }
      }

      return null;
    }

    for (let i = 0; i < numCourses; i++) {
      const paths = dfs(i, numCourses);

      if (paths) return paths;
    }

    return [];
  }
}

/**
 * 蛇梯棋
 * 图的层序遍历，坐标转换
 * 每次筛选出突变的和最大的入栈
 */
export function qa95() {
  return function invoke(board) {
    const n = board.length;

    // 起点为 [rows - 1, 0]; 终点为 [0, 0]
    const getXY = (pos) => {
      const cy = Math.floor((pos - 1) / n);
      const y = n - cy - 1;

      const cX = pos - cy * n;
      const x = cy % 2 === 0 ? cX - 1 : n - cX;

      if (x < 0 || y < 0) return undefined;

      return board[y][x];
    };

    const visited = {};
    const queue = [1];

    let count = 0;

    while (queue.length > 0) {
      const len = queue.length;

      for (let j = 0; j < len; j++) {
        const node = queue.shift();

        if (node === n * n) return count;

        visited[node] = true;

        let maxStep = node;

        for (let i = 1; i < 7; i++) {
          const gridNext = getXY(node + i);

          if (gridNext === undefined) continue;

          if (gridNext !== -1) {
            !visited[gridNext] && queue.push(gridNext);

            visited[gridNext] = true;
          } else {
            maxStep = Math.max(maxStep, node + i);
          }
        }

        if (maxStep !== node) {
          !visited[maxStep] && queue.push(maxStep);
          visited[maxStep] = true;
        }
      }

      count++;
    }

    return -1;
  };
}

/**
 * 最小基因变化
 * 图的层序遍历，每次从bank中筛选出子元素
 * @returns
 */
export function qa96() {
  return function invoke(startGene, endGene, bank) {
    const isValid = (source, target) => {
      if (source === target) return false;

      let count = 0;

      for (let i = 0; i < source.length; i++) {
        if (source[i] !== target[i]) {
          count++;
        }

        if (count > 1) return false;
      }

      return count === 1;
    };

    const queue = [startGene];

    const visited = {};

    let count = 0;

    while (queue.length > 0) {
      const len = queue.length;

      for (let i = 0; i < len; i++) {
        const gene = queue.shift();

        visited[gene] = true;

        if (gene === endGene) {
          return count;
        }

        queue.push(...bank.filter((x) => isValid(gene, x) && !visited[x]));
      }

      count++;
    }

    return -1;
  };
}

/**
 * 单词接龙
 * 字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列 beginWord -> s1 -> s2 -> ... -> sk：
  每一对相邻的单词只差一个字母。
  对于 1 <= i <= k 时，每个 si 都在 wordList 中。注意， beginWord 不需要在 wordList 中。
  sk == endWord
  给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回 从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0 。
 * @returns 
 */
export function qa97() {
  // 同上，层序遍历，每次筛选出
  return function invoke(beginWord, endWord, wordList) {
    const isValid = (source, target) => {
      if (source === target) return false;

      let count = 0;

      for (let i = 0; i < source.length; i++) {
        if (source[i] !== target[i]) {
          count++;
        }

        if (count > 1) return false;
      }

      return count === 1;
    };

    const queue = [beginWord];

    const visited = {};

    let count = 1;

    while (queue.length > 0) {
      const len = queue.length;

      for (let i = 0; i < len; i++) {
        const word = queue.shift();

        visited[word] = true;

        if (word === endWord) {
          return count;
        }

        const validWords = wordList.filter(
          (x) => isValid(word, x) && !visited[x]
        );

        validWords.forEach((x) => {
          queue.push(x);
          visited[x] = true;
        });
      }

      count++;
    }

    return 0;
  };
}

/**
 * 实现 Trie (前缀树)
 */
export function qa98() {
  function TrieNode(val) {
    this.val = val;
    this.children = new Array(26);
    this.count = 0;
    this.prefix = 0;
  }

  var Trie = function () {
    this.root = new TrieNode("");
  };

  /**
   * @param {string} word
   * @return {void}
   */
  Trie.prototype.insert = function (word) {
    let p = this.root;

    for (let i = 0; i < word.length; i++) {
      const w = word.charAt(i);
      const index = w.charCodeAt(0) - "a".charCodeAt(0);

      if (!p.children[index]) {
        p.children[index] = new TrieNode(w);
      }

      p.prefix++;
      p = p.children[index];
    }

    p.count++;
  };

  /**
   * @param {string} word
   * @return {boolean}
   */
  Trie.prototype.search = function (word) {
    let p = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!p) return false;

      const w = word.charAt(i);
      const index = w.charCodeAt(0) - "a".charCodeAt(0);
      p = p.children[index];
    }

    return p?.count > 0;
  };

  /**
   * @param {string} prefix
   * @return {boolean}
   */
  Trie.prototype.startsWith = function (prefix) {
    let p = this.root;

    for (let i = 0; i < prefix.length; i++) {
      if (!p) return false;

      const w = prefix.charAt(i);
      const index = w.charCodeAt(0) - "a".charCodeAt(0);
      p = p.children[index];
    }

    return p?.prefix > 0 || p?.count > 0;
  };

  return Trie;
}

/**
 * 添加与搜索单词 - 数据结构设计
 * 前缀树的dfs
 * @returns
 */
export function qa99() {
  return function invoke() {
    function DicNode(w) {
      this.word = w;
      this.count = 0;
      this.children = new Array(26);
    }

    var WordDictionary = function () {
      this.root = new DicNode("");
    };

    /**
     * @param {string} word
     * @return {void}
     */
    WordDictionary.prototype.addWord = function (word) {
      let p = this.root;

      for (let i = 0; i < word.length; i++) {
        const index = word.charCodeAt(i) - "a".charCodeAt(0);

        if (!p.children[index]) {
          p.children[index] = new DicNode(word.charAt(i));
        }

        p = p.children[index];
      }

      p.count++;
    };

    function dfs(word, index = 0, node) {
      if (index === word.length) {
        return node.count > 0;
      }

      const w = word.charAt(index);
      const wIndex = word.charCodeAt(index) - "a".charCodeAt(0);

      if (w === ".") {
        for (let i = 0; i < 26; i++) {
          if (!!node.children[i] && dfs(word, index + 1, node.children[i])) {
            return true;
          }
        }
      } else {
        return (
          !!node.children[wIndex] && dfs(word, index + 1, node.children[wIndex])
        );
      }

      return false;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    WordDictionary.prototype.search = function (word) {
      return dfs(word, 0, this.root);
    };
  };
}

/**
 * 单词搜索 II
 * 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words， 返回所有二维网格上的单词 。
 */
export function qa100() {
  const Trie = qa98();

  return function invoke(board, words) {
    const trie = new Trie();

    words.forEach((w) => trie.insert(w));

    const rows = board.length;
    const cols = board[0].length;

    const createVisited = () =>
      new Array(rows).fill("").map(() => new Array(cols).fill(false));

    const r = new Set();

    function dfs(y, x, acc = "", p = trie.root, visited = createVisited()) {
      if (y < 0 || x < 0 || y >= rows || x >= cols || visited[y][x] || !p)
        return;

      const w = board[y][x];
      const wIndex = w.charCodeAt(0) - "a".charCodeAt(0);

      if (!p.children[wIndex]) return;

      const next = p.children[wIndex];

      const newAcc = acc + w;

      if (next.count > 0) {
        r.add(newAcc);
      }

      visited[y][x] = true;

      dfs(y - 1, x, newAcc, next, visited);
      dfs(y + 1, x, newAcc, next, visited);
      dfs(y, x - 1, newAcc, next, visited);
      dfs(y, x + 1, newAcc, next, visited);

      visited[y][x] = false;
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dfs(y, x);
      }
    }

    return Array.from(r);
  };
}

/**
 * 电话号码的字母组合
 * 排列组合，回溯，用最小的单位去考虑
 * @returns
 */
export function qa101() {
  return function invoke(digits) {
    const charMap = {
      2: "abc",
      3: "def",
      4: "ghi",
      5: "jkl",
      6: "mno",
      7: "pqrs",
      8: "tuv",
      9: "wxyz",
    };

    const numbers = digits.split("").map((x) => charMap[x].split(""));

    function select(list) {
      // 如何 list 中只有一位，那么直接返回
      if (list.length <= 1) return list[0] ?? [];

      const rt = select(list.slice(1));

      return rt.reduce((acc, n) => {
        return acc.concat(list[0].map((x) => x + n));
      }, []);
    }

    const r = select(numbers);

    return r;
  };
}

/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * @returns
 */
export function qa102() {
  return function invoke(n, k) {
    if (k > n) return [];

    function select(list, num) {
      if (num === 1) return list.map((x) => [x]);

      let r = [];

      for (let i = 0; i < list.length - 1; i++) {
        const left = list[i];

        const right = select(list.slice(i + 1), num - 1);

        r = r.concat(right.map((x) => [left].concat(x)));
      }

      return r;
    }

    const list = new Array(n).fill(1).map((_, i) => i + 1);

    if (k === n) return [list];

    const r = select(list, k);

    return r;
  };
}

/**
 * 全排列
 * @returns
 */
export function qa103() {
  return function invoke(nums) {
    function select(list) {
      if (list.length === 1) return [list];

      let r = [];

      for (let i = 0; i < list.length; i++) {
        const lt = list[i];

        const rt = select(list.slice(0, i).concat(list.slice(i + 1)));

        r = r.concat(rt.map((right) => right.concat(lt)));
      }

      return r;
    }

    return select(nums);
  };
}

/**
 * 组合总和
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，
 * 找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
 */
export function qa104() {
  function invoke2(candidates, target) {
    function select(list, t) {
      const r = [];

      const selectd = {};

      for (let i = 0; i < list.length; i++) {
        if (selectd[list[i]] || list[i] > t) continue;

        selectd[list[i]] = true;

        if (list[i] === t) {
          r.push([list[i]]);
          continue;
        }

        const rt = select(list, t - list[i]);

        const selectedR = rt.map((right) => [list[i]].concat(right));

        selectedR.length > 0 && r.push(...selectedR);
      }

      return r;
    }

    const selectd = select(candidates, target);

    const r = Array.from(new Set(selectd.map((x) => x.sort().join(",")))).map(
      (x) => x.split(",").map((y) => parseInt(y, 10))
    );

    return r;
  }

  return function invoke(candidates, target) {
    const ans = [];

    function dfs(t, acc = [], idx = 0) {
      if (idx >= candidates.length) return;

      if (t === 0) {
        ans.push(acc);
        return;
      }

      // 核心思路是每次可以选择当前元素，也可以不选择
      // 跳过当前元素
      dfs(t, acc, idx + 1);

      if (t - candidates[idx] >= 0) {
        dfs(t - candidates[idx], [candidates[idx]].concat(acc.slice()), idx);
      }
    }

    dfs(target);

    return ans;
  };
}

/**
 * N 皇后 II
 */
export function qa105() {
  return function invoke(n) {
    // x (x = x0)
    // y (y = y0)
    // z1 (x - y = z0)
    // z2 (x + y = z0)

    function select(
      numOf = n,
      axesMap = {
        x: {},
        z1: {},
        z2: {},
      }
    ) {
      if (numOf === 0) return [];

      let r = [];

      for (let x = 0; x < n; x++) {
        const [y0, x0] = [n - numOf, x];

        if (axesMap.z1[x0 - y0] || axesMap.z2[x0 + y0] || axesMap.x[x0])
          continue;

        if (numOf === 1) {
          r.push([[y0, x0]]);
          continue;
        }

        const newAxesMap = {
          x: Object.assign({}, axesMap.x, {
            [x0]: 1,
          }),
          z1: Object.assign({}, axesMap.z1, {
            [x0 - y0]: 1,
          }),
          z2: Object.assign({}, axesMap.z2, {
            [x0 + y0]: 1,
          }),
        };

        const rt = select(numOf - 1, newAxesMap);

        rt.length > 0 && r.push(...rt.map((x) => [[y0, x0]].concat(x)));
      }

      return r;
    }

    const solutions = select(n);

    return solutions.length;
  };
}

/**
 * 括号生成
 * @returns
 */
export function qa106() {
  return function invoke(n) {
    const r = [];

    function select(left = 0, right = 0, acc = "") {
      if (left === n && right === n) {
        r.push(acc);
        return;
      }

      // 这样的条件下能选择左括号
      if (left < n) {
        select(left + 1, right, acc + "(");
      }

      // 左边括号比右边大的情况下
      if (left > right) {
        select(left, right + 1, acc + ")");
      }
    }

    select();

    return r;
  };
}

/**
 * 单词搜索
 * @returns
 */
export function qa107() {
  // 图的深度遍历
  return function invoke2(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    const dfs = (y, x, i = 0, visited = {}) => {
      if (y < 0 || y >= rows || x < 0 || x >= cols) return false;

      const t = board[y][x];

      if (t !== word[i]) return false;

      if (i === word.length - 1) return true;

      const grid = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      visited[`${y}-${x}`] = true;

      for (let j = 0; j < grid.length; j++) {
        const [dy, dx] = grid[j];

        const [ny, nx] = [y + dy, x + dx];

        if (visited[`${ny}-${nx}`]) continue;

        const canMove = dfs(ny, nx, i + 1, visited);

        if (canMove) return true;
      }

      visited[`${y}-${x}`] = false;

      return false;
    };

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const r = dfs(y, x);

        if (r) return true;
      }
    }

    return false;
  };
}

/**
 * 将有序数组转换为二叉搜索
 */
export function qa108() {
  return function invoke(nums) {
    function build(left = 0, right = nums.length - 1) {
      if (right < left) return null;

      const mid = Math.floor((left + right) / 2);

      const node = new TreeNode(nums[mid]);

      node.left = build(left, mid - 1);
      node.right = build(mid + 1, right);

      return node;
    }

    return build();
  };
}

/**
 * 排序链表
 */
export function qa109() {
  return function invoke2(head) {
    const arr = [];

    let cur = head;

    while (cur) {
      arr.push(cur.val);
      cur = cur.next;
    }

    arr.sort((a, b) => a - b);

    let dummy = new ListNode(0);
    let curNode = dummy;

    for (const val of arr) {
      curNode.next = new ListNode(val);
      curNode = curNode.next;
    }

    return dummy.next;
  };

  // !!!!!!!! 重点看看
  return function invoke(head) {
    const merge = (head1, head2) => {
      const dummyHead = new ListNode(0);
      let temp = dummyHead,
        temp1 = head1,
        temp2 = head2;
      while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
          temp.next = temp1;
          temp1 = temp1.next;
        } else {
          temp.next = temp2;
          temp2 = temp2.next;
        }
        temp = temp.next;
      }
      if (temp1 !== null) {
        temp.next = temp1;
      } else if (temp2 !== null) {
        temp.next = temp2;
      }
      return dummyHead.next;
    };

    const toSortList = (head, tail) => {
      if (head === null) {
        return head;
      }
      if (head.next === tail) {
        head.next = null;
        return head;
      }
      let slow = head,
        fast = head;
      while (fast !== tail) {
        slow = slow?.next;
        fast = fast?.next;
        if (fast !== tail) {
          fast = fast?.next;
        }
      }
      const mid = slow;
      return merge(toSortList(head, mid), toSortList(mid, tail));
    };

    return toSortList(head, null);
  };
}

/**
 * 建立四叉树
 * 分区之后递归建立
 */
export function qa110() {
  return function invoke(grid) {
    function split(matrix) {
      const n = matrix.length;

      const splitX = (t) => {
        return t.reduce((acc, list) => {
          const [left, right] = [list.slice(0, n / 2), list.slice(n / 2)];

          acc[0] ??= [];
          acc[1] ??= [];

          acc[0].push(left);
          acc[1].push(right);

          return acc;
        }, []);
      };

      const [top, bottom] = [matrix.slice(0, n / 2), matrix.slice(n / 2)];

      return splitX(top).concat(splitX(bottom));
    }

    function createNode(matrix) {
      const n = matrix.length;

      const flag = matrix[0][0];

      const root = new Node(flag);

      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          if (matrix[y][x] !== flag) {
            const [topLeft, topRight, bottomLeft, bottomRight] = split(matrix);

            root.topLeft = createNode(topLeft);
            root.topRight = createNode(topRight);
            root.bottomLeft = createNode(bottomLeft);
            root.bottomRight = createNode(bottomRight);

            return root;
          }
        }
      }

      root.isLeaf = true;

      return root;
    }

    const r = createNode(grid);

    return r;
  };
}

/**
 * 合并 K 个升序链表
 */
export function qa111() {
  return function invoke(lists) {
    let head = new ListNode(0);
    let p = head;

    while (lists.length > 0) {
      let minNodeIndex = -1;
      let i = 0;

      while (i < lists.length) {
        if (!lists[i]) {
          lists.splice(i, 1);
          continue;
        }

        if (lists[i].val < (lists[minNodeIndex]?.val ?? Infinity)) {
          minNodeIndex = i;
        }

        i++;
      }

      if (minNodeIndex < 0) continue;

      const minNode = lists[minNodeIndex];

      lists[minNodeIndex] = minNode?.next;

      if (!minNode?.next) {
        lists.splice(minNodeIndex, 1);
      }

      p.next = minNode;
      p = p.next;
    }

    return head.next;
  };
}

/**
 * 最大子数组和
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 */
export function qa112() {
  return function invoke(nums) {
    let max = -Infinity;
    let sumMax = -Infinity;

    for (let i = 0; i < nums.length; i++) {
      sumMax = Math.max(sumMax + nums[i], nums[i]);
      max = Math.max(max, sumMax);
    }

    return max;
  };
}

/**
 * 环形子数组的最大和
 * 给定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。
 * 环形数组 意味着数组的末端将会与开头相连呈环状。
 * 形式上， nums[i] 的下一个元素是 nums[(i + 1) % n] ， nums[i] 的前一个元素是 nums[(i - 1 + n) % n] 。
 */
export function qa113() {
  return function invoke(nums) {
    // 左端最大和 + 右端点最大和
    let max = -Infinity;
    let sumMax = -Infinity;
    let leftMax = [];
    let leftsum = 0;

    for (let i = 0; i < nums.length; i++) {
      sumMax = Math.max(sumMax + nums[i], nums[i]);
      max = Math.max(max, sumMax);

      leftsum += nums[i];
      leftMax[i] = Math.max(leftMax[i - 1] ?? -Infinity, leftsum);
    }

    let rightSum = 0;

    for (let j = nums.length - 1; j > 0; j--) {
      rightSum += nums[j];

      max = Math.max(max, rightSum + leftMax[j - 1]);
    }

    return max;
  };
}

/**
 * 搜索插入位置
 * @returns
 */
export function qa114() {
  return function invoke(nums, target) {
    const n = nums.length;

    let left = 0;
    let right = n - 1;
    let midIndex = Math.floor((left + right) / 2);

    while (left <= right) {
      midIndex = Math.floor((left + right) / 2);

      const t = nums[midIndex];

      if (t === target) return midIndex;

      if (target > t) {
        left = midIndex + 1;
      } else {
        right = midIndex - 1;
      }
    }

    return target < nums[midIndex] ? midIndex : midIndex + 1;
  };
}

/**
 * 搜索二维矩阵
 */
export function qa115() {
  return function invoke(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;

    const getYx = (i) => {
      const y = Math.floor(i / n);
      const x = i % n;

      return [y, x];
    };

    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
      const midIndex = Math.floor((left + right) / 2);

      const [y, x] = getYx(midIndex);
      const t = matrix[y][x];

      if (t === target) return true;

      if (target > t) {
        left = midIndex + 1;
      } else {
        right = midIndex - 1;
      }
    }

    return false;
  };
}

/**
 * 寻找峰值
 * @returns
 */
export function qa116() {
  return function invoke(nums) {
    const n = nums.length;

    let left = 0;
    let right = n - 1;

    while (left <= right) {
      const midIndex = Math.floor((left + right) / 2);

      const t = nums[midIndex];
      const leftT = nums[midIndex - 1] ?? -Infinity;
      const rightT = nums[midIndex + 1] ?? -Infinity;

      if (t >= leftT && t >= rightT) return midIndex;

      if (leftT > t) {
        right = midIndex - 1;
      } else {
        left = midIndex + 1;
      }
    }

    return -1;
  };
}

/**
 * 搜索旋转排序数组
 * @returns
 */
export function qa117() {
  return function invoke(nums, target) {
    const n = nums.length;
    const endVal = nums[n - 1];

    let left = 0;
    let right = n - 1;

    while (left <= right) {
      const midIndex = Math.floor((left + right) / 2);
      const midVal = nums[midIndex];

      if (midVal === target) return midIndex;

      const isRight = target <= endVal;

      if (isRight) {
        // 在右区间内

        // 中间值存在于左区间
        if (midVal > endVal) {
          left = midIndex + 1;
          right = n - 1;
          continue;
        }
      } else {
        // 在左区间内

        // 中间值存在于右区间
        if (midVal < endVal) {
          right = midIndex - 1;
          left = 0;
          continue;
        }
      }

      if (target > midVal) {
        left = midIndex + 1;
      } else {
        right = midIndex - 1;
      }
    }

    return -1;
  };
}

/**
 * 在排序数组中查找元素的第一个和最后一个位置
 * @returns
 */
export function qa118() {
  return function invoke(nums, target) {
    const n = nums.length;

    let left = 0;
    let right = n - 1;
    let midIndex = Math.floor((left + right) / 2);

    while (left <= right) {
      midIndex = Math.floor((left + right) / 2);

      const t = nums[midIndex];

      if (t === target) {
        let j = midIndex;
        let i = midIndex;

        while (i < n && nums[i] === target) {
          i++;
        }

        while (j >= 0 && nums[j] === target) {
          j--;
        }

        return [j + 1, i - 1];
      }

      if (target > t) {
        left = midIndex + 1;
      } else {
        right = midIndex - 1;
      }
    }

    return [-1, -1];
  };
}

/**
 * 寻找旋转排序数组中的最小值
 */
export function qa119() {
  return function invoke(nums) {
    const n = nums.length;

    const endVal = nums[n - 1];

    if (endVal >= nums[0]) return nums[0];

    let left = 0;
    let right = n - 1;

    while (left <= right) {
      const midIndex = Math.floor((left + right) / 2);

      const t = nums[midIndex];
      const leftT = nums[midIndex - 1] ?? -Infinity;
      const rightT = nums[midIndex + 1] ?? Infinity;

      if (t <= leftT && t <= rightT) return t;

      // 落在左区间
      if (t < endVal) {
        right = midIndex - 1;
      } else {
        // 落在右区间
        left = midIndex + 1;
      }
    }

    return -1;
  };
}

/**
 * 寻找两个正序数组的中位数
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 */
export function qa120() {
  return function invoke(nums1, nums2) {
    const getMid = (t) => {
      const len = t.length;

      const isMuti = len % 2 === 0;

      if (!isMuti) return t[Math.floor(len / 2)];

      const mid1 = len / 2;
      const mid2 = len / 2 - 1;
      return (t[mid1] + t[mid2]) / 2;
    };

    if (!nums1?.length || !nums2?.length) {
      const t = nums1?.length ? nums1 : nums2;

      return getMid(t);
    }

    const [s1, e1] = [nums1[0], nums1[nums1.length - 1]];

    const [s2, e2] = [nums2[0], nums2[nums2.length - 1]];

    if (s1 > e2 || s2 > e1) {
      const newArr =
        s1 > e2
          ? [].concat(nums2).concat(nums1)
          : [].concat(nums1).concat(nums2);

      return getMid(newArr);
    }

    const newArr = [];

    while (nums1.length || nums2.length) {
      const [s1] = nums1;
      const [s2] = nums2;

      if (s1 <= s2 || s2 === undefined) {
        newArr.push(s1);
        nums1.shift();
      } else {
        newArr.push(s2);
        nums2.shift();
      }
    }

    return getMid(newArr);
  };
}

/**
 * 数组中的第K个最大元素
 */
export function qa121() {
  function invoke2(nums, k) {
    const swap = (list, i, j) => {
      [list[j], list[i]] = [list[i], list[j]];
    };

    function quickSelect(list, left, right, n) {
      if (left === right) return list[left];

      let i = left;
      let j = right;

      const flag = list[left];

      while (i < j) {
        do {
          i++;
        } while (list[i] < flag);

        do {
          j--;
        } while (list[j] > flag);
      }

      if (i < j) {
        swap(list, i, j);
      }

      if (n <= j) {
        return quickSelect(list, left, j, n);
      }

      return quickSelect(list, j + 1, right, n);
    }
  }

  return function invoke(nums, k) {
    const heap = new Heap((a, b) => a > b, nums);

    for (let i = 0; i < k - 1; i++) {
      heap.pop();
    }

    return heap.peek;
  };
}

/**
 * IPO
 * 假设 力扣（LeetCode）即将开始 IPO 。为了以更高的价格将股票卖给风险投资公司，力扣 希望在 IPO 之前开展一些项目以增加其资本。 
 * 由于资源有限，它只能在 IPO 之前完成最多 k 个不同的项目。帮助 力扣 设计完成最多 k 个不同项目后得到最大总资本的方式。
  给你 n 个项目。对于每个项目 i ，它都有一个纯利润 profits[i] ，和启动该项目需要的最小资本 capital[i] 。
  最初，你的资本为 w 。当你完成一个项目时，你将获得纯利润，且利润将被添加到你的总资本中。
  总而言之，从给定项目中选择 最多 k 个不同项目的列表，以 最大化最终资本 ，并输出最终可获得的最多资本。
 */
export function qa122() {
  return function invoke(k, w, profits, capital) {
    const n = profits.length;
    const dp = new Array(n).fill([]).map((_, i) => [capital[i], profits[i]]);

    dp.sort((a, b) => a[0] - b[0]);

    let has = w;

    const heap = new Heap((a, b) => a[1] > b[1]);

    for (let i = 0;i < k;i++) {

      while(dp.length > 0 && dp[0][0] <= has) {
        heap.push(dp.shift());
      }

      if (heap.size > 0) {
        has += heap.pop()[1];
      }
    }

    return has;
  }
}

/**
 * 查找和最小的 K 对数字
 * 给定两个以 非递减顺序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。
  定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。

  请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。
 */
export function qa123() {
  return function invoke(nums1, nums2, k) {
    const heap = new Heap((a, b) => a[0] < b[0], nums1.map((n1, i) => [
      n1 + nums2[0],
      i,
      0
    ]));

    const r = [];

    while(k > 0 && heap.size > 0) {
      const [,i1, i2] = heap.pop();

      r.push([nums1[i1], nums2[i2]]);

      // 由于数组是有序的，(a[0],b[0])是和最小的数对，计入答案。
      // 并且次小的只能是 (a[0],b[1]) 或 (a[1],b[0])
      if (i2 + 1 < nums2.length) {
        heap.push([nums1[i1] + nums2[i2+1], i1, i2 + 1]);
      }

      k--;
    }

    return r;
  }
}

/**
 * 数据流的中位数
 * 中位数是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。
 * 维护一个最小堆和一个最大堆，中位数位最大堆的堆顶元素
 */
export function qa124() {
  var MedianFinder = function () {
    this.minHeap = new Heap((a, b) => a < b);
    this.maxHeap = new Heap((a, b) => a > b);
  };

  /**
   * @param {number} num
   * @return {void}
   */
  MedianFinder.prototype.addNum = function (num) {
    if (this.minHeap.size === 0 || num > this.minHeap.peek) {
      this.minHeap.push(num);
    } else {
      this.maxHeap.push(num);
    }

    while (this.maxHeap.peek > this.minHeap.peek) {
      this.minHeap.push(this.maxHeap.pop());
    }

    while (this.maxHeap.size > this.minHeap.size + 1) {
      this.minHeap.push(this.maxHeap.pop());
    }

    while (this.minHeap.size > this.maxHeap.size + 1) {
      this.maxHeap.push(this.minHeap.pop());
    }
  };

  /**
   * @return {number}
   */
  MedianFinder.prototype.findMedian = function () {
    if (this.maxHeap.size > this.minHeap.size) {
      return this.maxHeap.peek;
    }

    if (this.minHeap.size > this.maxHeap.size) {
      return this.minHeap.peek;
    }

    return (this.maxHeap.peek + this.minHeap.peek) / 2;
  };

  return MedianFinder;
}

/**
 * 二进制求和
 */
export function qa125() {
  return function invoke(a, b) {
    /**
     * js 中 number 为 64 为双精度浮点
     * 1 位用于符号位（表示正数还是负数）。
     * 11 位用于指数（确定小数点的位置）。
     * 52 为有效数字 M
     * JavaScript 使用 64 位双精度浮点数来存储所有数字，这种表示方法遵循 IEEE 754 标准。
     * 在这种浮点表示中，数字首先会被转换为二进制数，然后再进行计算。
     */
    const na = BigInt(`0b${a}`);
    const nb = BigInt(`0b${b}`);

    const c = na + nb;

    return c.toString(2);
  };
}

/**
 * 颠倒二进制位
 * 颠倒给定的 32 位无符号整数的二进制位。
 */
export function qa126() {
  return function invoke(n) {
    let r = 0;

    for (let i = 0; i < 32; i++) {
      r <<= 1;
      r >>>= 0;

      if (n & 1) {
        r++;
      }

      n >>>= 1;
    }

    return r;
  };
}

/**
 * 位1的个数
 */
export function qa127() {
  return function invoke(n) {
    let r = 0;

    while (n) {
      n & 1 && r++;
      n >>>= 1;
    }

    return r;
  };
}

/**
 *  只出现一次的数字
 */
export function qa128() {
  return function invoke(nums) {
    return nums.reduce((acc, n) => {
      return acc ^ n;
    }, 0);
  };
}

/**
 * 只出现一次的数字 II
 * 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
 */
export function qa129() {
  return function invoke(nums) {
    let ans = 0;

    for (let i = 0; i < 32; i++) {
      let total = 0;

      for (let n of nums) {
        // 将最右边的一位数字相加
        total = total + ((n >> i) & 1);
      }

      if (total % 3 !== 0) {
        ans = ans | (1 << i);
      }
    }

    return ans;
  };
}

/**
 * 数字范围按位与
 * 寻找公共前缀
 */
export function qa130() {
  /**
   * x与x-1做位于操作会去除掉公共前缀多余的1
   */
  return function invoke(left, right) {
    while(left < right) {
      right = right & (right - 1);
    }

    return right;
  }

  function invoke2(left, right) {
    let count = 0;

    while(left < right) {
      right = right >> 1;
      left = left >> 1;
      count++;
    }

    return left << count;
  }
}

/**
 * 回文数
 */
export function qa131() {
  return function invoke(x) {
    if (x < 0) return false;

    function getDigit(n, k) {
      return Math.floor(n / Math.pow(10, k - 1)) % 10;
    }

    const n = x.toString().length;

    if (n === 1) return true;

    let i = 1;
    let j = n;

    while(i < j) {
      if (getDigit(x, i) !== getDigit(x, j)) {
        return false;
      }

      i++;
      j--;
    }

    return true;
  }
}

/**
 * 加一
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 */
export function qa132() {
  return function invoke(digits) {
    let plus = 1;

    for (let i = digits.length - 1;i > -1;i--) {
      const sum = digits[i] + plus;

      digits[i] = sum % 10;
      plus = Math.floor(sum / 10);

      if (!plus) break;
    }

    if (plus) {
      digits.unshift(plus);
    }

    return digits;
  }
}

/**
 * 阶乘后的零
 */
export function qa133() {
  // 统计阶乘中5的数量
  return function invoke(n) {
    function count5(x) {
      if (x % 5 !== 0) return 0;

      return 1 + count5(x / 5);
    }

    let i = 1;
    let count = 0;

    while(5 * i <= n) {
      count += 1 + count5(i);
      i++;
    }

    return count;
  }
}

/**
 * x 的平方根 
 * @returns 
 */
export function qa134() {
  return function invoke(x) {
    let l = 0, r = x, ans = 0;

    while(l <= r) {
      const mid = Math.floor(l + (r - l) / 2);

      if (mid ** 2 <= x) {
        ans = mid;
        l = mid + 1;
        continue;
      }

      r = mid - 1;
    }

    return ans;
  }
}

/**
 * Pow(x, n)
 * 快速幂
 */
export function qa135() {
  return function invoke(x, n) {
    if (x === 0) return 0;
    if (x === 1 || n === 0) return 1;

    function pow(x0, n0) {
      if (n0 === 1) return x0;

      if (n0 % 2 === 0) {
        return pow(x0 * x0, n0 / 2);
      } else {
        return x0 * pow(x0 * x0, (n0 - 1) / 2)
      }
    }

    return pow(n > 0 ? x : 1 /x, n > 0 ? n : -n);
  }
}

/**
 * 直线上最多的点数
 * @returns 
 */
export function qa136() {
  return function invoke(points) {
    // 如果点在一条直线上，则要满足 f(x) = ax + b，其中 a 为一个常数
    // 两点可以确定一条直线，其中 a = (y1 - y2) / (x1 - x2)， b = y1 - a * x1
    if (points.length === 0) return 0;

    const n = points.length;

    let max = 1;

    const visited = new Array(n).fill(false).map(() => new Array(n).fill(false));

    function defineFx(p1, p2) {
      // y 轴固定的情况
      if (p1[1] === p2[1]) {
        return function (_, y) {
          return y === p1[1];
        }
      }

      // x轴固定的情况
      if (p1[0] === p2[0]) {
        return function (x, _) {
          return x === p1[0];
        }
      }

      const a = (p1[1] - p2[1]) / (p1[0] - p2[0]);

      const b = p1[1] - a * p1[0];

      return function (x, y) {
        const isIn = Math.abs(y - (a * x + b)) < 0.0001;

        return isIn;
      }
    }

    function findNum(fx, i1, i2) {
      let count = 2;

      for (let i = 0;i < points.length;i++) {
        if (i === i1 || i === i2) continue;

        if (fx(...points[i])) count++;
      }

      return count;
    }

    for (let i = 0;i < n;i++) {
      for (let j = i + 1; j < n;j++) {
        if (visited[i][j] || visited[j][i]) continue;

        const fx = defineFx(points[i], points[j]);

        max = Math.max(max, findNum(fx, i, j));

        visited[i][j] = true;
        visited[j][i] = true;
      }
    }

    return max;
  }
}

/**
 * 爬楼梯
 */
export function qa137() {
  return function invoke(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    const dp = [];
    
    dp[0] = 1;
    dp[1] = 2;

    for (let i = 2;i < n;i++) {
      const methods = dp[0] + dp[1];

      dp[0] = dp[1];
      dp[1] = methods;
    }

    return dp[1];
  }
}

/**
 * 打家劫舍
 * @returns 
 */
export function qa138() {
  return function invoke(nums) {
    if (nums.length < 2) return nums[0] ?? 0;

    const dp = [];
    
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2;i < nums.length;i++) {
      const max = Math.max(dp[1], dp[0] + nums[i]);

      dp[0] = dp[1];
      dp[1] = max;
    }

    return dp[1];
  }
}

/**
 * 单词拆分
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
 * 如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
 * @returns 
 */
export function qa139() {
  return function invoke(s, wordDict) {
    const dict = new Set(wordDict);

    const dp = new Array(s.length).fill(false);

    dp[0] = true;

    for (let right = 1;right <= s.length;right++) {
      for (let left = 0;left < right;left++) {
        dp[right] = dp[left] && dict.has(s.slice(left, right));

        if (dp[right]) {
          break;
        }
      }
    }

    return dp[s.length];
  }
}

/**
 * 零钱兑换
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * @returns 
 */
export function qa140() {
  return function invoke(coins, amount) {
    const gallary = new Set(coins);

    const dp = new Array(amount + 1).fill(-1);

    dp[0] = 0;

    let count = 1;

    while(count < amount + 1) {
      // 最少的情况
      if (gallary.has(count)) {
        dp[count] = 1;

        count++;
        continue;
      }

      let min = Infinity;

      for (let coin of coins) {
        if (count - coin < 0 || dp[count - coin] === -1) {
          continue;
        }

        min = Math.min(min, dp[count - coin] + 1);
      }

      if (min !== Infinity) {
        dp[count] = min;
      }

      count++;
    }

    return dp[amount];
  }
}

/**
 * 最长递增子序列
 * @returns 
 */
export function qa141() {
  return function invoke(nums) {
    const dp = new Array(nums.length).fill(1);

    let max = 1;

    for (let i = 1;i < nums.length;i++) {
      for (let j = 0;j < i;j++) {
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }

      max = Math.max(max, dp[i]);
    }

    return max;
  }
}

/**
 * 三角形最小路径和
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和。
 * @returns 
 */
export function qa142() {
  return function invoke(triangle) {
    const n = triangle.length;
    const dp = new Array(n).fill('').map(() => new Array(n).fill(Infinity));

    let r = triangle[0][0];

    for (let i = 0;i < n;i++) {
      let min = Infinity;

      for (let j = 0;j <= i;j++) {
        if (i === 0) {
          dp[i][j] = triangle[i][j];
        } else {
          const father1 = dp[i-1][j];
          const father2 = dp[i-1][j-1] ?? Infinity;
  
          dp[i][j] = Math.min(
            father1,
            father2
          ) + triangle[i][j];
        }

        min = Math.min(min, dp[i][j]);
        r = min;
      }
    }

    return r;
  }
}

/**
 * 最小路径和
 * @returns 
 */
export function qa143() {
  return function invoke(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const dp = new Array(m).fill(undefined).map(() => new Array(n).fill(Infinity));

    for (let i = 0;i < m;i++) {
      for (let j = 0;j < n;j++) {
        const father1 = dp?.[i-1]?.[j];
        const father2 = dp[i]?.[j-1];

        if (father1 === undefined && father2 === undefined) {
          dp[i][j] = grid[i][j];
          continue;
        }

        dp[i][j] = Math.min(
          father1 ?? Infinity,
          father2 ?? Infinity
        ) + grid[i][j];
      }
    }

    return dp[m-1][n-1];
  }
}

/**
 * 不同路径 II
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 */
export function qa144() {
  return function invoke(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    const dp = new Array(m).fill(undefined).map(() => new Array(n).fill(1));

    for (let i = 0;i < m;i++) {
      for (let j = 0;j < n;j++) {
        if (obstacleGrid[i][j] === 1) {
          dp[i][j] = 0;
          continue;
        }

        const father1 = dp?.[i-1]?.[j] ?? 0;
        const father2 = dp?.[i]?.[j-1] ?? 0;

        dp[i][j] = father1 + father2;
      }
    }

    return dp[m-1][n-1];
  }
}

/**
 * 最长回文子串
 */
export function qa145() {
  return function invoke(s) {
    if (s.length < 2) return s;

    const n = s.length;
    const dp = new Array(n + 1).fill(undefined).map((_, i) => 
      new Array(n).fill(undefined).map((_, j) => {
        if (i - j <= 1) return true;

        return false;
      }),
    );

    let max = '';

    for (let i = 1;i <= n;i++) {
      for (let j = 0; j < i;j++) {
        const father = dp[i-1][j+1];

        dp[i][j] = father && (s[j] === s[i-1]);

        if (dp[i][j] && i - j > max.length) {
          max = s.slice(j, i);
        }
      }
    }

    return max;
  }
}

/**
 * 交错字符串
 * 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。
 * @returns 
 */
export function qa146() {
  return function invoke(s1, s2, s3) {
    const n1 = s1.length;
    const n2 = s2.length;
    const n3 = s3.length;

    if (n2 + n1 !== n3) return false;

    const dp = new Array(n1 + 1).fill(undefined).map(() => new Array(n2 + 1).fill(false));

    for (let i = 0;i <= n1;i++) {
      for (let j = 0;j <= n2;j++) {
        const x1 = s1[i - 1];
        const x2 = s2[j - 1];
        const x3 = s3[i + j - 1];

        if (!x3) {
          dp[i][j] = true;
          continue;
        }

        if (x1 === x3 && dp[i-1][j]) {
          dp[i][j] = true;
        }

        if (x2 === x3 && dp[i][j-1]) {
          dp[i][j] = true;
        }
      }
    }

    return dp[n1][n2];
  }
}

/**
 * 编辑距离
 * 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
 * 你可以对一个单词进行如下三种操作：
  插入一个字符
  删除一个字符
  替换一个字符
 */
export function qa147() {
  return function invoke(word1, word2) {
    // 从word1变成word2，相当于word1和word2保持一致
    const m = word1.length;
    const n = word2.length;

    const dp = new Array(m + 1).fill(undefined).map((_, i) => 
      new Array(n + 1).fill(Infinity).map((_, j) => {
        if (i === 0) return j;
        if (j === 0) return i;

        return Infinity;
      }),
    );
    
    for (let i = 1;i <= m;i++) {
      for (let j = 1;j <= n;j++) {
        const w1 = word1[i-1];
        const w2 = word2[j-1];

        const father1 = dp?.[i-1][j];
        const father2 = dp?.[i]?.[j-1];
        const father3 = dp?.[i-1]?.[j-1];

        if (w1 === w2) {
          dp[i][j] = father3;
        } else {
          dp[i][j] = father3 + 1;
        }

        dp[i][j] = Math.min(
          dp[i][j],
          father1 + 1,
          father2 + 1,
        )
      }
    }

    return dp[m][n];
  }
}

/**
 * 买卖股票的最佳时机 III
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 */
export function qa148() {
  return function invoke(prices) {
    let buy1 = -prices[0];
    let sell1 = 0;
    let buy2 = -prices[0];
    let sell2 = 0;

    for (let i = 1;i < prices.length;i++) {
      buy1 = Math.max(buy1, -prices[i]);
      sell1 = Math.max(sell1, buy1 + prices[i]);
      buy2 = Math.max(buy2, sell1 - prices[i]);
      sell2 = Math.max(sell2, buy2 + prices[i]);
    }

    return sell2;
  }
}

/**
 * 买卖股票的最佳时机 IV
 * 给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。
 * @returns 
 */
export function qa149() {
  return function invoke(prices, k) {
    const dp = new Array(k).fill(undefined).map(() => [
      -prices[0],
      0,
    ]);

    for (let i = 1;i < prices.length;i++) {
      for (let j = 0;j < dp.length;j++) {
        if (!dp[j-1]) {
          dp[j][0] = Math.max(dp[j][0], -prices[0]);
          dp[j][1] = Math.max(dp[j][1], dp[j][0] + prices[i]);
          continue;
        }

        const [,preSelle] = dp[j-1];

        dp[j][0] = Math.max(dp[j][0], preSelle - prices[0]);
        dp[j][1] = Math.max(dp[j][1], dp[j][0] + prices[i]);
      }
    }

    return dp[k-1][1];
  }
}

/**
 * 最大正方形
 * 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
 */
export function qa150() {
  return function invoke(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let max = 0;

    for (let y = 0;y < rows;y++) {
      for (let x = 0;x < cols;x++) {
        if (matrix[y][x] == 0) continue;

        const top = matrix[y - 1]?.[x] ?? 0;
        const left = matrix[y]?.[x - 1] ?? 0;
        const topLeft = matrix[y-1]?.[x-1] ?? 0;

        matrix[y][x] = Math.min(
          top,
          left,
          topLeft
        ) + 1;

        max = Math.max(max, matrix[y][x]);
      }
    }

    return max ** 2;
  }
}
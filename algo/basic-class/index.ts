// @ts-nocheck

export class ListNode {
  val: any;
  next?: ListNode;
  neighbors?: ListNode[];
  isLeaf?: boolean;
  topLeft?: ListNode;
  topRight?: ListNode;
  bottomLeft?: ListNode;
  bottomRight?: ListNode;

  constructor(val: any, next?: ListNode, neighbors?: ListNode[]) {
    this.val = val;
    this.next = next;
    this.neighbors = neighbors;
  }
}

export const Node = ListNode;

export class TreeNode {
  val: any;
  left?: TreeNode;
  right?: TreeNode;

  constructor(val: any, left?: TreeNode, right?: TreeNode) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export class GraphNode {
  val: any;
  neighbors?: GraphNode[];

  constructor(val: any, neighbors?: GraphNode[]) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

// 默认最大堆
const defaultCmp = (x, y) => x > y;

// 交换元素
const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

// 堆类，默认最大堆
export class Heap {  
  container = [];

  cmp = defaultCmp;

  // 获取堆大小
  get size() {
    return this.container.length;
  }

  get peek() {
    return this.container[0];
  }

  constructor(cmp = defaultCmp, nums = []) {
    this.container = [];
    this.cmp = cmp;

    this.init(nums);
  }

  init(nums) {
    this.container = nums.slice();

    for (let i = nums.length >> 1;i >= 0;i--) {
      this.heapify2(i);
    }

    return this.container;
  }

  // 自底向上
  heapify1(index) {
    const { container, cmp } = this;

    while (index) {
      let parent = (index - 1) >> 1;
      if (!cmp(container[index], container[parent])) {
        return;
      }
      swap(container, index, parent);
      index = parent;
    }
  }

  // 自顶向下
  heapify2(index) {
    const { container, cmp } = this;

    let exchange = index * 2 + 1;

    while (exchange < this.size) {
      // // 以最大堆的情况来说：如果有右节点，并且右节点的值大于左节点的值
      let right = index * 2 + 2;
      if (right < this.size && cmp(container[right], container[exchange])) {
        exchange = right;
      }
      if (!cmp(container[exchange], container[index])) {
        break;
      }
      swap(container, exchange, index);
      index = exchange;
      exchange = index * 2 + 1;
    }
  }

  // 插入
  push(data) {
    this.container.push(data);

    let index = this.size - 1;

    this.heapify1(index);
  }

  // 弹出堆顶，并返回
  pop() {
    if (!this.size) {
      return null;
    }

    swap(this.container, 0, this.size - 1);

    const res = this.container.pop();

    this.heapify2(0);

    return res;
  }
}
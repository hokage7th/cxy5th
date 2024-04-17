// @ts-nocheck
import * as qas from "./index";
import { ListNode, TreeNode, Node } from "../basic-class";

qas.qa1()([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);

qas.qa6()([1, 2, 3, 4, 5, 6, 7], 3);

qas.qa9()([2, 3, 1, 1, 4]);

qas.qa10()([2, 3, 0, 1, 4]);

qas.qa11()([0, 1, 3, 5, 6]);

qas.qa14()([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]);

qas.qa18()(1994);

qas.qa19()("   fly me   to   the moon  ");

qas.qa20()(["flower", "flow", "flight"]);

qas.qa21()("the sky is blue");

qas.qa22()("AB", 1);

qas.qa23()("aabaaabaaac", "aabaaac");

qas.qa24()(
  [
    "Science",
    "is",
    "what",
    "we",
    "understand",
    "well",
    "enough",
    "to",
    "explain",
    "to",
    "a",
    "computer.",
    "Art",
    "is",
    "everything",
    "else",
    "we",
    "do",
  ],
  20
);

qas.qa27()([2, 7, 11, 15], 9);

qas.qa29()([-1, 0, 1, 2, -1, -4]);

qas.qa30()(6, [10, 2, 3]);

qas.qa31()("abcabcbb");

qas.qa32()("barfoofoobarthefoobarman", ["bar", "foo", "the"]);

qas.qa33()("bdab", "ab");

qas.qa35()([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]);

qas.qa37()([
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
]);

qas.qa41()("aba", "dog cat cat");

qas.qa44()([2, 7, 11, 15], 9);

qas.qa47()([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]);

qas.qa48()([0, 1, 2, 4, 5, 7]);

qas.qa49()([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
]);

qas.qa50()([[1, 5]], [1, 7]);

qas.qa51()([
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
]);

qas.qa55()(["2", "1", "+", "3", "*"]);

qas.qa64()(new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(2)))));

qas.qa65()(
  new ListNode(
    1,
    new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
  ),
  2
);

qas.qa66()(new ListNode(1), 0);

qas.qa77()(
  new TreeNode(
    4,
    new TreeNode(9, new TreeNode(5), new TreeNode(1)),
    new TreeNode(0)
  )
);

qas.qa81()(
  new TreeNode(
    3,
    new TreeNode(
      5,
      new TreeNode(6),
      new TreeNode(2, new TreeNode(7), new TreeNode(4))
    ),
    new TreeNode(1, new TreeNode(0), new TreeNode(8))
  ),
  new TreeNode(5),
  new TreeNode(1)
);

qas.qa86()(
  new TreeNode(
    4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(6)
  )
);

qas.qa90()([
  ["X", "X", "X", "X", "X"],
  ["X", "O", "O", "O", "X"],
  ["X", "O", "O", "O", "X"],
  ["X", "O", "O", "O", "X"],
  ["X", "X", "X", "X", "X"],
]);

const create91Ins = () => {
  const node1 = new Node(1);
  const node2 = new Node(2);
  const node3 = new Node(3);
  const node4 = new Node(4);

  node1.neighbors = [node2, node4];
  node2.neighbors = [node1, node3];
  node3.neighbors = [node2, node4];
  node4.neighbors = [node1, node3];

  return node1;
}

qas.qa91()(create91Ins());

qas.qa93()(2, [[0,1]]);

qas.qa100()([["a", "b"]], ["ba"]);

qas.qa101()("234");

qas.qa102()(4, 2);

qas.qa104()([2,3,6,7], 7);

qas.qa105()(4);

qas.qa106()(3);

qas.qa109()(
  new ListNode(
    4,
    new ListNode(
      2,
      new ListNode(
        1,
        new ListNode(3)
      )
    )
  )
);

qas.qa121()([3,2,1,5,6,4], 2);

qas.qa147()("horse", "ros");

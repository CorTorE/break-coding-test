const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */

    const n = +input[0];
    const parents = input[1].split(" ").map(Number);
    const removed = +input[2];
    console.log(solution(n, parents, removed));

    process.exit();
  });

function solution(n, parents, removed) {
  const tree = new Map();
  let rootNode = -1;

  for (let i = 0; i < n; i++) {
    if (parents[i] === -1) rootNode = i;
    if (i === removed) continue;
    if (tree.has(parents[i])) {
      tree.set(parents[i], [...tree.get(parents[i]), i]);
      continue;
    }

    tree.set(parents[i], [i]);
  }

  if (removed === rootNode) return 0;

  // 삭제할 트리 연결 끊기
  tree.delete(removed);

  return getLeaf(tree, rootNode);
}

function getLeaf(tree, rootNode) {
  const queue = [];
  let leafCount = 0;
  let i = 0;

  queue.push(rootNode);

  while (i < queue.length) {
    const node = queue[i];

    if (tree.has(node)) {
      for (const next of tree.get(node)) {
        queue.push(next);
      }
    } else {
      leafCount++;
    }

    i++;
  }

  return leafCount;
}

// Case 1. 루트를 제거하는 경우
// 12
// -1 0 0 1 1 2 2 3 3 5 6 6
// 0
// output 0

// Case 2. 자식이 없는 경우
// 12
// -1 0 0 1 1 2 2 3 3 5 6 6
// 8
// output: 5

// Case 3. 자식이 하나인 경우
// 12
// -1 0 0 1 1 2 2 3 3 5 6 6
// 5
// output: 5

// Case 5. 자식이 두개인 경우
// 12
// -1 0 0 1 1 2 2 3 3 5 6 6
// 6
// output: 4

// Case 6. 삭제할 노드 번호가 존재하지 않는 경우
// 12
// -1 0 0 1 1 2 2 3 3 5 6 6
// 12
// output: 6

// Case 7. 상위 노드를 제거하는 경우
// 12
// -1 0 0 1 1 2 2 3 3 5 6 6
// 1
// output: 3

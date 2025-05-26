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
    const m = +input[1];
    const buses = input.slice(2, m + 2).map((el) => el.split(" ").map(Number));
    const [start, end] = input[m + 2].split(" ").map(Number);
    console.log(solution(n, buses, start, end));

    process.exit();
  });

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  getParentIdx(child) {
    return Math.floor((child - 1) / 2);
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    return this.heap;
  }

  getLeftChildIdx(parent) {
    return parent * 2 + 1;
  }

  getRightChildIdx(parent) {
    return parent * 2 + 2;
  }

  push(source, dist) {
    this.heap.push({ source, dist });
    this.bubbleUp();

    return this.heap;
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (parent !== -1 && this.heap[child].dist < this.heap[parent].dist) {
      this.swap(parent, child);

      child = parent;
      parent = this.getParentIdx(child);
    }
  }

  pop() {
    const heapSize = this.size();
    if (heapSize === 0) return null;
    if (heapSize === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return root;
  }

  bubbleDown() {
    let parent = 0;
    let leftChild = this.getLeftChildIdx(parent);
    let rightChild = this.getRightChildIdx(parent);

    while (
      (leftChild <= this.size() - 1 &&
        this.heap[leftChild].dist < this.heap[parent].dist) ||
      (rightChild <= this.size() - 1 &&
        this.heap[rightChild].dist < this.heap[parent].dist)
    ) {
      if (
        rightChild <= this.size() - 1 &&
        this.heap[rightChild] < this.heap[leftChild]
      ) {
        this.swap(parent, rightChild);
        parent = rightChild;
      } else {
        this.swap(parent, leftChild);
        parent = leftChild;
      }

      leftChild = this.getLeftChildIdx(parent);
      rightChild = this.getRightChildIdx(parent);
    }
  }
}

function solution(n, buses, start, end) {
  const distances = Array.from({ length: n }, () => Infinity);
  const graph = Array.from({ length: n }, () => []);

  for (const [src, dest, dist] of buses) {
    graph[src - 1].push([dest - 1, dist]);
  }

  const pq = new PriorityQueue();
  distances[start - 1] = 0;
  pq.push(start - 1, 0);

  while (pq.size() > 0) {
    const { source, dist } = pq.pop();

    if (dist > distances[source]) continue;

    for (const [dest, extra] of graph[source]) {
      const nextDist = dist + extra;

      if (distances[dest] > nextDist) {
        distances[dest] = nextDist;
        pq.push(dest, nextDist);
      }
    }
  }

  return distances[end - 1];
}

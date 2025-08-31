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
    const times = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, times));

    process.exit();
  });

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  getLeftChildIdx(idx) {
    return idx * 2 + 1;
  }

  getRightChildIdx(idx) {
    return idx * 2 + 2;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    return this.heap;
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (this.heap[child] < this.heap[parent]) {
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
        this.heap[leftChild] < this.heap[parent]) ||
      (rightChild <= this.size() - 1 &&
        this.heap[rightChild] < this.heap[parent])
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

  peak() {
    if (this.size() === 0) return -1;

    return this.heap[0];
  }
}

function solution(n, times) {
  times.sort((a, b) => a[0] - b[0]);

  // 종료 시간을 기준으로 최소 힙 적용
  const pq = new PriorityQueue();

  for (const [start, end] of times) {
    if (pq.peak() <= start) {
      // 가장 빨리 끝나는 강의실 재사용
      pq.pop();
    }

    // 새 강의실 추가 or 재사용
    pq.push(end);
  }

  return pq.size();
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let V = [];
let start, end;

rl.on("line", (line) => {
  if (!N) {
    N = Number(line);
  } else if (!M) {
    M = Number(line);
  } else if (V.length !== M) {
    V.push(line.split(" ").map(Number));
  } else {
    [start, end] = line.split(" ").map(Number);
    solution(N, M, V, start, end);
    rl.close();
  }
});

class Heap {
  constructor() {
    this.heap = [null];
  }
  getParentIndex(index) {
    return Math.floor(index / 2);
  }
  getLeftIndex(index) {
    return index * 2;
  }
  getRightIndex(index) {
    return index * 2 + 1;
  }
  getLastIndex() {
    return this.heap.length - 1;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  push(value) {
    this.heap.push(value);
    this.up();
  }
  up() {
    let index = this.getLastIndex();
    while (index > 1) {
      let parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex].dist > this.heap[index].dist) {
        this.swap(parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  }
  pop() {
    if (this.getLastIndex() === 1) return this.heap.pop();
    const node = this.heap[1];
    const lastNode = this.heap.pop();
    this.heap[1] = lastNode;
    this.down();
    return node;
  }
  down() {
    let index = 1;
    while (index <= this.getLastIndex()) {
      let leftIndex = this.getLastIndex(index);
      let rightIndex = this.getRightIndex(index);
      let minIndex = index;

      if (
        leftIndex <= this.getLastIndex() &&
        this.heap[leftIndex].dist < this.heap[minIndex].dist
      ) {
        minIndex = leftIndex;
      }
      if (
        rightIndex <= this.getLastIndex() &&
        this.heap[rightIndex].dist < this.heap[minIndex].dist
      ) {
        minIndex = rightIndex;
      }
      if (minIndex !== index) {
        this.swap(minIndex, index);
        index = minIndex;
      } else {
        break;
      }
    }
  }
}

function solution(N, M, V, start, end) {
  const graph = [];
  const distArr = [];
  for (let i = 0; i <= N; i++) {
    graph.push([]);
    distArr.push(Infinity);
  }
  for (const [from, to, dist] of V) {
    graph[from].push({ to: to, dist: dist });
  }

  const heap = new Heap();
  heap.push({ to: start, dist: 0 });
  distArr[start] = 0;

  while (heap.getLastIndex() > 0) {
    const { to: t, dist: d } = heap.pop();
    if (distArr[t] < d) continue;
    for (const edge of graph[t]) {
      const newDist = edge.dist + d;
      if (distArr[edge.to] > newDist) {
        distArr[edge.to] = newDist;
        heap.push({ to: edge.to, dist: newDist });
      }
    }
  }
  console.log(distArr[end]);
}

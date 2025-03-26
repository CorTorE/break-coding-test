const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let V, E;
let edges = [];

rl.on("line", (line) => {
  if (!V && !E) {
    [V, E] = line.split(" ").map(Number);
  } else {
    edges.push(line.split(" ").map(Number));
    if (edges.length === E) {
      solution(V, E, edges);
      rl.close();
    }
  }
});

// class Heap {
//   constructor() {
//     this.heap = [null];
//   }
//   getParentIndex(index) {
//     return Math.floor(index / 2);
//   }
//   getLeftIndex(index) {
//     return index * 2;
//   }
//   getRightIndex(index) {
//     return index * 2 + 1;
//   }
//   getLastIndex() {
//     return this.heap.length - 1;
//   }
//   swap(a, b) {
//     [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
//   }
//   push(value) {
//     this.heap.push(value);
//     this.up();
//   }
//   pop() {
//     if (this.getLastIndex() === 1) return this.heap.pop();
//     const node = this.heap[1];
//     const lastNode = this.heap.pop();
//     this.heap[1] = lastNode;
//     this.down();
//     return node;
//   }
//   up() {
//     let index = this.getLastIndex();
//     while (index > 1) {
//       let parentIndex = this.getParentIndex(index);
//       if (this.heap[index].dist < this.heap[parentIndex].dist) {
//         this.swap(index, parentIndex);
//         index = parentIndex;
//       } else {
//         break;
//       }
//     }
//   }
//   down() {
//     let index = 1;
//     while (index <= this.getLastIndex()) {
//       let leftIndex = this.getLeftIndex(index);
//       let rightIndex = this.getRightIndex(index);
//       let minIndex = index;
//       if (
//         leftIndex <= this.getLastIndex() &&
//         this.heap[leftIndex].dist < this.heap[index].dist
//       ) {
//         minIndex = leftIndex;
//       }
//       if (
//         rightIndex <= this.getLastIndex() &&
//         this.heap[rightIndex].dist < this.heap[index].dist
//       ) {
//         minIndex = rightIndex;
//       }
//       if (minIndex !== index) {
//         this.swap(index, minIndex);
//         index = minIndex;
//       } else {
//         break;
//       }
//     }
//   }
// }

// function solution(V, E, edges) {
//   let minCycle = Infinity;
//   const graph = [null];
//   for (let i = 0; i <= V; i++) {
//     graph[i] = [];
//   }
//   for (const [from, to, dist] of edges) {
//     graph[from].push({ to: to, dist: dist });
//   }
//   for (let start = 1; start <= V; start++) {
//     const heap = new Heap();
//     const distArr = [];
//     for (let i = 0; i <= V; i++) {
//       distArr[i] = Infinity;
//     }
//     heap.push({ to: start, dist: 0 });
//     distArr[start] = 0;
//     while (heap.getLastIndex() !== 0) {
//       const { to: t, dist: d } = heap.pop();
//       if (distArr[t] < d) continue;
//       for (const edge of graph[t]) {
//         const newDist = edge.dist + d;
//         if (newDist < distArr[edge.to]) {
//           distArr[edge.to] = newDist;
//           heap.push({ to: edge.to, dist: newDist });
//         }
//       }
//     }
//     for (const [from, to, dist] of edges) {
//       if (to === start && distArr[from] !== Infinity) {
//         minCycle = Math.min(minCycle, distArr[from] + dist);
//       }
//     }
//   }
//   console.log(minCycle);
// }

function solution(V, E, edges) {
  let minCycle = Infinity;
  const graph = [];
  for (let i = 0; i <= V; i++) {
    graph.push(Array(V + 1).fill(Infinity));
  }
  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      if (i === j) {
        graph[i][j] = 0;
      }
    }
  }
  for (const [from, to, dist] of edges) {
    graph[from][to] = dist;
  }

  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      for (let k = 1; k <= V; k++) {
        if (graph[i][j] > graph[i][k] + graph[k][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }

  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      if (i !== j) minCycle = Math.min(minCycle, graph[i][j] + graph[j][i]);
    }
  }
  console.log(minCycle !== Infinity ? minCycle : -1);
}

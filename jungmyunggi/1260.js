const { fchown } = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M, V;
let edges = [];
let c = 0;

rl.on("line", (line) => {
  if (N === undefined) {
    [N, M, V] = line.split(" ").map(Number);
  } else {
    edges.push(line.split(" ").map(Number));
    c++;
    if (c === M) {
      dfs(N, M, V, edges);
      bfs(N, M, V, edges);

      rl.close();
    }
  }
});

function makeGraph(N, edges) {
  const graph = [];
  const visited = [];

  for (let i = 0; i <= N; i++) {
    graph.push([]);
    visited.push(false);
  }
  for (const edge of edges) {
    [from, to] = edge;
    graph[from].push(to);
    graph[to].push(from);
  }
  for (const g of graph) {
    g.sort((a, b) => a - b);
  }
  return [graph, visited];
}

function dfs(N, M, V, edges) {
  const [graph, visited] = makeGraph(N, edges);
  const stack = [];
  const output = [];
  stack.push(V);
  while (stack.length !== 0) {
    let cur = stack.pop();
    if (visited[cur] === true) continue;
    visited[cur] = true;
    output.push(cur);
    for (const node of graph[cur].reverse()) {
      stack.push(node);
    }
  }
  console.log(output.join(" "));
}

function bfs(N, M, V, edges) {
  const [graph, visited] = makeGraph(N, edges);
  const queue = [];
  const output = [];
  let front = 0;
  queue.push(V);

  while (front !== queue.length) {
    let cur = queue[front++];
    if (visited[cur] === true) continue;
    visited[cur] = true;
    output.push(cur);
    for (const g of graph[cur]) {
      queue.push(g);
    }
  }
  console.log(output.join(" "));
}

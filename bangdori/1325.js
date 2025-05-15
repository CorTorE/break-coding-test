const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [front, back] = arr[i].split(" ");
  graph[+back].push(+front);
}

function dfs(start) {
  const stack = [start];
  const visited = new Array(N + 1).fill(false);

  let count = 0;
  visited[start] = true;

  while (stack.length) {
    const node = stack.pop();

    for (let next of graph[node]) {
      if (visited[next]) continue;
      stack.push(next);
      visited[next] = true;
      count++;
    }
  }

  return count;
}

let max = -1;
let answer = [];

for (let i = 1; i <= N; i++) {
  let count = dfs(i);
  if (count > max) {
    max = count;
    answer = [i];
  } else if (count === max) {
    answer.push(i);
  }
}

console.log(answer.join(" "));

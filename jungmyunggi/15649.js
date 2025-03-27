const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;

rl.on("line", (line) => {
  [N, M] = line.split(" ").map(Number);
  solution(N, M);
  rl.close();
});

function getCombination(arr, r) {
  const result = [];
  function combinate(current, visited) {
    if (current.length === r) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (visited[i] === true) continue;
      visited[i] = true;
      current.push(arr[i]);
      combinate(current, visited);
      current.pop();
      visited[i] = false;
    }
  }
  const visited = [];
  for (let i = 0; i < arr.length; i++) {
    visited.push(false);
  }
  combinate([], visited);
  return result;
}

function solution(N, M) {
  const arr = [];
  for (let i = 1; i <= N; i++) {
    arr.push(i);
  }
  const answer = getCombination(arr, M);
  for (let i = 0; i < answer.length; i++) {
    console.log(...answer[i]);
  }
}

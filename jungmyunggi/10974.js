const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;

rl.on("line", (line) => {
  n = Number(line);
  solution(n);
  rl.close();
});

function solution(n) {
  const visited = [];
  const arr = [];
  const result = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
    visited.push(false);
  }

  function permutaion(current, visited) {
    if (current.length === n) {
      result.push([...current]);
    }
    for (let i = 0; i < n; i++) {
      if (visited[i] === true) continue;
      visited[i] = true;
      current.push(arr[i]);
      permutaion(current, visited);
      current.pop();
      visited[i] = false;
    }
  }
  permutaion([], visited);
  for (let i = 0; i < result.length; i++) {
    console.log(result[i].join(" "));
  }
}

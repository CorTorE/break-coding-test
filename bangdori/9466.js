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
    const tc = +input[0];

    for (let i = 0; i < tc; i++) {
      const n = +input[i * 2 + 1];
      const array = [0, ...input[i * 2 + 2].split(" ").map(Number)];
      console.log(solution(n, array));
    }

    process.exit();
  });

function solution(n, array) {
  const visited = new Array(n + 1).fill(false); // 방문 여부
  const done = new Array(n + 1).fill(false); // 사이클 체크 완료 여부
  let cnt = 0;

  const dfs = (node) => {
    visited[node] = true;
    const next = array[node];

    if (!visited[next]) dfs(next);
    else if (!done[next]) {
      for (let i = next; i !== node; i = array[i]) {
        cnt++;
      }

      cnt++;
    }

    done[node] = true;
  };

  for (let i = 1; i <= n; i++) {
    dfs(i);
  }

  return n - cnt;
}

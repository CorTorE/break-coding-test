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

    const [n, m] = input[0].split(" ").map(Number);
    const buses = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, buses));

    process.exit();
  });

function solution(n, buses) {
  const INF = Infinity;
  const dist = new Array(n + 1).fill(INF);

  dist[1] = 0;

  // 거리 갱신
  for (let i = 1; i < n; i++) {
    for (const [src, dest, cost] of buses) {
      if (dist[src] !== INF && dist[dest] > dist[src] + cost) {
        dist[dest] = dist[src] + cost;
      }
    }
  }

  // 음수 사이클
  for (const [src, dest, cost] of buses) {
    if (dist[src] !== INF && dist[dest] > dist[src] + cost) {
      return -1;
    }
  }

  const answer = [];

  for (let i = 2; i <= n; i++) {
    answer.push(dist[i] === INF ? -1 : dist[i]);
  }

  return answer.join("\n");
}

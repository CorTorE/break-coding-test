const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */

    const n = +input[0];
    const edges = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, edges));

    process.exit();
  });

function solution(n, edges) {
  if (n === 1) return 0;

  const distances = Array.from({ length: n }, () => []);

  for (const [src, dest, dist] of edges) {
    distances[src - 1].push([dest - 1, dist]);
    distances[dest - 1].push([src - 1, dist]);
  }

  const start = bfs(1, distances).pos;
  const answer = bfs(start, distances).dist;

  return answer;
}

function bfs(source, distances) {
  const visited = Array(distances.length).fill(-1);
  let queue = [];

  queue.push([source, 0]); // 위치, 거리
  visited[source] = 0;

  while (queue.length > 0) {
    const nextQueue = [];

    for (const [current, dist] of queue) {
      for (const [next, extra] of distances[current]) {
        if (visited[next] > -1) continue;

        const total = dist + extra;
        nextQueue.push([next, total]);
        visited[next] = total;
      }
    }

    queue = nextQueue;
  }

  const dist = Math.max(...visited);
  const pos = visited.indexOf(dist);

  return { pos, dist };
}

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
    const [edges, _, source] = input[0].split(" ").map(Number);
    const connections = input
      .slice(1)
      .map((conn) => conn.split(" ").map(Number));
    console.log(solution(edges, source, connections));

    process.exit();
  });

function solution(edges, start, connections) {
  const answer = [[], []];
  const graph = Array.from({ length: edges + 1 }, () => []);
  const visited = new Array(edges + 1).fill(false);

  const reset = () => {
    for (let i = 1; i <= edges; i++) {
      graph[i] = [];
      visited[i] = false;
    }

    for (const [src, dest] of connections) {
      graph[src].push(dest);
      graph[dest].push(src);
    }

    for (let i = 1; i <= edges; i++) {
      graph[i].sort((a, b) => a - b);
    }
  };

  const dfs = (src) => {
    if (visited[src]) return;

    visited[src] = true;
    answer[0].push(src);

    for (const dest of graph[src]) {
      if (visited[dest]) continue;
      dfs(dest);
    }
  };

  const bfs = (start) => {
    let queue = [];

    queue.push(start);
    visited[start] = true;

    while (queue.length > 0) {
      const nextQueue = [];
      const src = queue.shift();

      answer[1].push(src);

      for (const dest of graph[src]) {
        if (visited[dest]) continue;

        nextQueue.push(dest);
        visited[dest] = true;
      }

      queue = [...queue, ...nextQueue];
    }
  };

  reset();
  dfs(start);
  reset();
  bfs(start);

  return answer.map((line) => line.join(" ")).join("\n");
}

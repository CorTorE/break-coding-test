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
    const [vertexs, edges] = input[0].split(" ").map(Number);
    const distances = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(vertexs, edges, distances));

    process.exit();
  });

function solution(vertexs, edges, distances) {
  const graph = Array.from({ length: vertexs }, () =>
    new Array(vertexs).fill(Infinity)
  );

  for (const [source, dest, dist] of distances) {
    graph[source - 1][dest - 1] = dist;
  }

  for (let k = 0; k < vertexs; k++) {
    for (let i = 0; i < vertexs; i++) {
      for (let j = 0; j < vertexs; j++) {
        if (graph[i][j] > graph[i][k] + graph[k][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }

  let answer = Infinity;

  for (let n = 0; n < vertexs; n++) {
    answer = Math.min(answer, graph[n][n]);
  }

  return answer === Infinity ? -1 : answer;
}

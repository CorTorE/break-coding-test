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
    const n = +input[0];
    const k = +input[1];
    const sensors = input[2].split(" ").map(Number);
    console.log(solution(n, k, sensors));

    process.exit();
  });

function solution(n, k, sensors) {
  let answer = 0;

  sensors.sort((a, b) => a - b);

  // i -> i+1 거리 계산
  const dist = Array.from(
    { length: n - 1 },
    (_, i) => sensors[i + 1] - sensors[i]
  ).sort((a, b) => b - a);

  for (let i = k - 1; i < n - 1; i++) {
    answer += dist[i];
  }

  return answer;
}

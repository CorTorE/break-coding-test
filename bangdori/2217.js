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
    const ropes = input.slice(1).map(Number);
    console.log(solution(n, ropes));

    process.exit();
  });

function solution(n, ropes) {
  let answer = 0;
  ropes.sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    const maxWeight = ropes[i] * (n - i);

    answer = Math.max(answer, maxWeight);
  }

  return answer;
}

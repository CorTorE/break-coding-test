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
    console.log(solution(n));

    process.exit();
  });

function solution(n) {
  if (n <= 1) return 1;

  let answer = 1;
  for (let i = 2; i <= n; i++) answer *= i;

  return answer;
}

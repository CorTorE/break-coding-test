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
    const triangle = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, triangle));

    process.exit();
  });

function solution(n, triangle) {
  const dp = Array.from({ length: n }, (_, k) => new Array(k + 1).fill(0));

  dp[0][0] = triangle[0][0];

  for (let r = 1; r < n; r++) {
    for (let c = 0; c < r + 1; c++) {
      if (c - 1 >= 0) {
        dp[r][c] = Math.max(dp[r][c], dp[r - 1][c - 1] + triangle[r][c]);
      }
      if (c <= r - 1) {
        dp[r][c] = Math.max(dp[r][c], dp[r - 1][c] + triangle[r][c]);
      }
    }
  }

  return Math.max(...dp[n - 1]);
}

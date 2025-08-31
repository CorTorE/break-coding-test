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
    const schedule = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, schedule));

    process.exit();
  });

function solution(n, schedule) {
  const dp = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    const [required, profit] = schedule[i];
    const nextDate = required + i;

    dp[i + 1] = Math.max(dp[i + 1], dp[i]);

    if (nextDate <= n) {
      dp[nextDate] = Math.max(dp[nextDate], dp[i] + profit);
    }
  }

  return Math.max(...dp);
}

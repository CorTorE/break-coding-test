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
    const lines = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, lines));

    process.exit();
  });

function solution(n, lines) {
  lines.sort((a, b) => a[0] - b[0]);
  const dp = [];

  for (let i = 0; i < n; i++) {
    const end = lines[i][1];

    if (dp.length === 0 || dp[dp.length - 1] < end) {
      dp.push(end);
      continue;
    }
    let left = 0,
      right = dp.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (dp[mid] < end) left = mid + 1;
      else right = mid;
    }

    dp[right] = end;
  }

  return n - dp.length;
}

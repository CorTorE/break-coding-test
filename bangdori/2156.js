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
    const array = input.slice(1).map(Number);
    console.log(solution(n, array));

    process.exit();
  });

function solution(n, array) {
  if (n === 1) return array[0];
  if (n === 2) return array[0] + array[1];

  const dp = new Array(n + 1).fill(0);
  dp[1] = array[0];
  dp[2] = array[0] + array[1];

  for (let i = 3; i <= n; i++) {
    // dp[n]이 최대가 되는 경우
    // 1. dp[i-3] + array[i-1] + array[i]     i-2번째 잔을 거르고, i-1과 i를 마시는 경우
    // 2. dp[i-2] + array[i]                  i-1번쨰 잔을 거르고, i를 마시는 경우
    // 3. dp[i-1]                             현재를 마시지 않는 경우
    // array 길이가 dp보다 1 작으므로, array의 인덱스는 1뺀 값으로 채택한다.

    dp[i] = Math.max(
      dp[i - 3] + array[i - 2] + array[i - 1],
      dp[i - 2] + array[i - 1],
      dp[i - 1]
    );
  }

  return dp[dp.length - 1];
}

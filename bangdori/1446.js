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
    const [n, d] = input[0].split(" ").map(Number);
    const shortcuts = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(d, shortcuts));

    process.exit();
  });

function solution(end, shortcuts) {
  const shortcutsMap = new Map();

  const dp = Array(end + 1)
    .fill(0)
    .map((_, idx) => idx);

  for (const [src, dest, dist] of shortcuts) {
    if (dest > end) continue;

    if (!shortcutsMap.has(src)) shortcutsMap.set(src, [[dest, dist]]);
    else shortcutsMap.set(src, [...shortcutsMap.get(src), [dest, dist]]);
  }

  for (let i = 0; i <= end; i++) {
    if (i > 0) dp[i] = Math.min(dp[i], dp[i - 1] + 1); // 1km 그냥 이동한 경우

    if (shortcutsMap.has(i)) {
      for (const [dest, dist] of shortcutsMap.get(i)) {
        dp[dest] = Math.min(dp[dest], dp[i] + dist); // 지름길 사용 시 거리 업데이트
      }
    }
  }

  return dp[end];
}

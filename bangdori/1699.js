const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];

const dp = Array(n + 1).fill(Infinity);

dp[0] = 0;
dp[1] = 1;
dp[2] = 2;
dp[3] = 3;

for (let i = 4; i <= n; i++) {
  if (Math.sqrt(i) - Math.floor(Math.sqrt(i)) === 0) {
    dp[i] = 1;
  } else {
    dp[i] = i;
  }

  for (let k = 1; k < Math.sqrt(i); k++) {
    // + 제곱수
    dp[i] = Math.min(dp[i], dp[i - k ** 2] + 1);
  }
}

console.log(dp[n]);

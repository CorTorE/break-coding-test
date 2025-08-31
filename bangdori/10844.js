const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const rest = 1_000_000_000;

const n = +input[0];

const dp = Array.from({ length: n + 1 }, () => Array(10).fill(0));

for (let i = 1; i <= 9; i++) {
  dp[1][i] = 1;
}

for (let i = 2; i <= n; i++) {
  dp[i][0] = dp[i - 1][1] % rest;

  for (let digit = 1; digit <= 8; digit++) {
    dp[i][digit] = (dp[i - 1][digit - 1] + dp[i - 1][digit + 1]) % rest;
  }

  dp[i][9] = dp[i - 1][8] % rest;
}

const answer = dp[n].reduce((acc, curr) => (acc + curr) % rest, 0);

console.log(answer);

// 길이가 1

// 길이가 n일때, 계단 수가 총 몇개인가요?

// 1 -> 2
// 2 -> 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9 -> 1

// 2의 자리 수 = 이전 수에서 0으로 끝나는거 + 1, 1~8까지 끝나는거 + 2, 9로 끝나는거 + 1

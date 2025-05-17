const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [coin_count, total_price] = input[0].split(" ").map(Number);
const coins = input.slice(1).map(Number);

coins.sort((a, b) => a - b);
const dp = Array(total_price + 1).fill(Infinity);

dp[0] = 0;

for (const coin of coins) {
  for (let i = coin; i <= total_price; i++) {
    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  }
}

console.log(dp[total_price] === Infinity ? -1 : dp[total_price]);

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[amount] = 0;

  coins.sort((a, b) => b - a);

  for (const coin of coins) {
    for (let i = amount; i >= coin; i--) {
      dp[i - coin] = Math.min(dp[i - coin], dp[i] + 1);
    }
  }

  return dp[0] === Infinity ? -1 : dp[0];
};

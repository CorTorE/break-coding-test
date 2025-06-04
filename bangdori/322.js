/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1);
  dp[amount] = 0;

  for (const coin of coins) {
    for (let i = amount; i >= coin; i--) {
      if (dp[i - coin] > dp[i] + 1) {
        dp[i - coin] = dp[i] + 1;
      }
    }
  }

  return dp[0] > amount ? -1 : dp[0];
};

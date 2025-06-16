/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) return nums[0];

  return Math.max(robHelper(nums.slice(0, -1)), robHelper(nums.slice(1)));
};

function robHelper(money) {
  const n = money.length;

  if (n <= 2) return Math.max(...money);

  const dp = Array(n).fill(0);

  dp[0] = money[0];
  dp[1] = money[1];
  dp[2] = money[2] + dp[0];

  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3]);
    dp[i] += money[i];
  }

  return Math.max(dp[n - 1], dp[n - 2]);
}

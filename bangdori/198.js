/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length;

  if (n <= 2) return Math.max(...nums);

  const dp = Array(n).fill(0);

  dp[0] = nums[0];
  dp[1] = nums[1];
  dp[2] = nums[2] + dp[0];

  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3]);
    dp[i] += nums[i];
  }

  return Math.max(dp[n - 1], dp[n - 2]);
};

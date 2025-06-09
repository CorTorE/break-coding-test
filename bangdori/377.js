/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  const dp = Array(target + 1).fill(-1);

  const comb = (current) => {
    if (current === 0) return 1;
    if (current < 0) return 0;
    if (dp[current] !== -1) return dp[current];

    let count = 0;
    for (const num of nums) {
      count += comb(current - num);
    }
    dp[current] = count;

    return count;
  };

  comb(target);
  return dp[target];
};

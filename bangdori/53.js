/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const acc = Array(nums.length).fill(0);

  acc[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    acc[i] = acc[i - 1] >= 0 ? nums[i] + acc[i - 1] : nums[i];
  }

  return Math.max(...acc);
};

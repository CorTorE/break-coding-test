/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const n = nums.length;
  const original = (n * (n + 1)) / 2;
  const result = nums.reduce((acc, curr) => acc + curr, 0);

  return original - result;
};

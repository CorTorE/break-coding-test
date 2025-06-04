/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const answer = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (answer[answer.length - 1] < nums[i]) {
      answer.push(nums[i]);
      continue;
    }

    const pos = upperbound(answer, nums[i]);
    answer[pos] = nums[i];
  }

  return answer.length;
};

function upperbound(nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] > target) right = mid;
    else left = mid + 1;
  }

  return right;
}

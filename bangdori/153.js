/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0,
    right = nums.length - 1;
  let answer = nums[right];

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < answer) {
      answer = nums[mid];
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return answer;
};

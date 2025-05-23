/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const totalSize = nums1.length + nums2.length;
  const isOdd = totalSize % 2 === 1;
  const answer = [];

  let i1 = 0;
  let i2 = 0;
  for (let count = 1; count <= totalSize; count++) {
    if (answer.length === 2) continue;

    if (i1 >= nums1.length || (i2 < nums2.length && nums2[i2] <= nums1[i1])) {
      i2++;

      if (count >= totalSize / 2) {
        answer.push(nums2[i2 - 1]);
      }
    } else {
      i1++;

      if (count >= totalSize / 2) {
        answer.push(nums1[i1 - 1]);
      }
    }
  }

  return isOdd ? answer[0] : (answer[0] + answer[1]) / 2;
};

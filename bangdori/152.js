/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const segments = splitByZero(nums);
  let maxProduct = Number.NEGATIVE_INFINITY;

  for (const segment of segments) {
    const currentProduct = maxProductOfSegment(segment);
    maxProduct = Math.max(maxProduct, currentProduct);
  }

  if (nums.includes(0)) maxProduct = Math.max(maxProduct, 0);

  return maxProduct;
};

function splitByZero(nums) {
  const result = [];
  let current = [];

  for (const num of nums) {
    if (num === 0) {
      result.push(current);
      current = [];
    } else {
      current.push(num);
    }
  }

  result.push(current);
  return result.filter((array) => array.length > 0);
}

function maxProductOfSegment(nums) {
  let maxProduct = Number.NEGATIVE_INFINITY;

  let currentProduct = 1;
  for (let i = 0; i < nums.length; i++) {
    currentProduct *= nums[i];
    maxProduct = Math.max(maxProduct, currentProduct);

    if (currentProduct === 0) currentProduct = 1;
  }

  currentProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    currentProduct *= nums[i];
    maxProduct = Math.max(maxProduct, currentProduct);

    if (currentProduct === 0) currentProduct = 1;
  }

  return maxProduct;
}

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let ltr = 0,
    rtr = height.length - 1;
  let waters = getWaters(height, ltr, rtr);

  while (ltr < rtr) {
    if (height[ltr] > height[rtr]) rtr--;
    else ltr++;

    waters = Math.max(waters, getWaters(height, ltr, rtr));
  }

  return waters;
};

function getWaters(height, ltr, rtr) {
  return (rtr - ltr) * Math.min(height[ltr], height[rtr]);
}

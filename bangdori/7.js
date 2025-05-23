const MAX = 2 ** 31 - 1;
const MIN = -(2 ** 31);

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const reversed = x.toString().split("").reverse().join("");
  const n = parseInt(reversed);

  if (n > MAX || n < MIN) return 0;

  return x < 0 ? -n : n;
};

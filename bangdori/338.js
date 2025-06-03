/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const dp = Array(10 ** 5 + 1).fill(0);

  dp[1] = 1;

  let exp = 1;
  for (let i = 2; i < dp.length; i++) {
    if (exp * 2 === i) {
      exp *= 2;
    }

    dp[i] = dp[i - exp] + 1;
  }

  return dp.slice(0, n + 1);
};

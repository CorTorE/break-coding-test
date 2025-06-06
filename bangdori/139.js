/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const n = s.length;
  const wordSet = new Set(wordDict);

  let maxLength = 0;
  for (const word of wordSet) {
    maxLength = Math.max(maxLength, word.length);
  }

  const dp = Array(n + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = i - 1; j >= Math.max(i - maxLength, 0); j--) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
      }
    }
  }

  return dp[n];
};

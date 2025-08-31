/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let answer = 0;

  const set = new Set();
  let ltr = 0,
    rtr = 0;

  while (rtr < s.length) {
    if (!set.has(s[rtr])) {
      set.add(s[rtr++]);
      answer = Math.max(answer, rtr - ltr);
    } else {
      set.delete(s[ltr++]);
    }
  }

  return answer;
};

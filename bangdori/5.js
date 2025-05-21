/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let answer = "";

  for (let i = 0; i < s.length; i++) {
    const sub1 = expand(s, i, i);
    const sub2 = expand(s, i, i + 1);
    const max_sub = sub1.length > sub2.length ? sub1 : sub2;

    if (max_sub.length > answer.length) {
      answer = max_sub;
    }
  }

  return answer;
};

function expand(s, l, r) {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }

  return s.substring(l + 1, r);
}

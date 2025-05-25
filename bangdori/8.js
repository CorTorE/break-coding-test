/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const trimmedString = s.trim();
  const isNegative = trimmedString[0] === "-";

  let i = isNegative || trimmedString[0] === "+" ? 1 : 0;
  let curr = "";
  for (i; i < trimmedString.length; i++) {
    if (curr.length === 0 && trimmedString[i] === "0") continue;
    if (trimmedString[i] === " ") break;

    if (Number.isInteger(Number(trimmedString[i]))) {
      curr += trimmedString[i];
    } else break;
  }

  if (!curr) curr = 0;

  const answer = Number(curr);
  if (isNegative) {
    if (-answer < -(2 ** 31)) return -(2 ** 31);
    else return -answer;
  } else {
    if (answer > 2 ** 31 - 1) return 2 ** 31 - 1;
    else return answer;
  }
};

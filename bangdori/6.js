/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1) return s;

  const maxCycle = 2 * (numRows - 1);
  let answer = "";

  for (let row = 0; row < numRows; row++) {
    let cycle = maxCycle - row * 2 || maxCycle;
    let curr = row;

    while (curr < s.length) {
      answer += s[curr];
      curr += cycle;

      if (row !== 0 && row !== numRows - 1) {
        cycle = maxCycle - cycle;
      }
    }
  }

  return answer;
};

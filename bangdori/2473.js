const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */

    const n = +input[0];
    const array = input[1].split(" ").map(Number);
    console.log(solution(n, array));

    process.exit();
  });

function solution(n, array) {
  let answer = [Infinity, Infinity, Infinity];
  array.sort((a, b) => a - b);

  for (let i = 0; i < n - 2; i++) {
    let ltr = i + 1;
    let rtr = n - 1;

    while (ltr < rtr) {
      const result = array[i] + array[ltr] + array[rtr];
      const prevSum = getSum(answer);

      if (Math.abs(prevSum) > Math.abs(result)) {
        answer[0] = array[i];
        answer[1] = array[ltr];
        answer[2] = array[rtr];
      }

      if (result > 0) {
        rtr--;
      } else if (result < 0) {
        ltr++;
      } else {
        return answer.join(" ");
      }
    }
  }

  return answer.join(" ");
}

function getSum(array) {
  return array.reduce((acc, curr) => acc + curr, 0);
}

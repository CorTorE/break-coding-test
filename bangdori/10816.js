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
    const targets = input[3].split(" ").map(Number);
    console.log(solution(n, array, targets));

    process.exit();
  });

function solution(n, array, targets) {
  const answer = [];
  const countMap = new Map();

  for (const num of array) {
    const count = countMap.get(num) ?? 0;
    countMap.set(num, count + 1);
  }

  for (const target of targets) {
    const findCount = countMap.get(target) ?? 0;
    answer.push(findCount);
  }

  return answer.join(" ");
}

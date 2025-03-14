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
    const [_, m] = input[0].split(" ").map(Number);
    const trees = input[1].split(" ").map(Number);
    console.log(solution(m, trees));

    process.exit();
  });

function solution(m, trees) {
  let answer = 0;
  let left = 0;
  let right = Math.max(...trees) - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let cuttingLength = 0;

    for (const tree of trees) {
      if (tree > mid) {
        cuttingLength += tree - mid;
      }
    }

    if (cuttingLength >= m) {
      left = mid + 1;
      answer = Math.max(answer, mid);
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

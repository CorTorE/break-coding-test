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
    const [n, target] = input[0].split(" ").map(Number);
    const numbers = input[1].split(" ").map(Number);
    console.log(solution(n, target, numbers));

    process.exit();
  });

function solution(n, target, numbers) {
  let answer = Infinity;

  let partial = 0;
  let start = 0;

  for (let end = 0; end < n; end++) {
    partial += numbers[end];

    while (partial >= target) {
      answer = Math.min(answer, end - start + 1);
      partial -= numbers[start];
      start++;
    }
  }

  return answer === Infinity ? 0 : answer;
}

// 1. 모든 수열을 더해도 target을 넘지 못하는 경우
// input:
// 3 10
// 1 2 3
// output:
// 0

// 2. 수열의 모든 수가 target 이상인 경우
// input:
// 5 5
// 7 5 9 12 55
// 1

// 3. 수열의 특정 수가 target 이상인 경우
// input:
// 5 5
// 1 4 5 4 1
// 1

// 4. 수열의 총합이 target 이상인 경우
// input:
// 5 5
// 1 1 1 1 1
// 5

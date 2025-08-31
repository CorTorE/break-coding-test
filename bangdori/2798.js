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
    const [N, M] = input[0].split(" ").map(Number);
    const cards = input[1].split(" ").map(Number);
    console.log(solution(N, M, cards));

    process.exit();
  });

function solution(N, M, cards) {
  let answer = 0;

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      for (let k = j + 1; k < N; k++) {
        const cardSum = cards[i] + cards[j] + cards[k];
        if (cardSum > M || cardSum < answer) continue;

        answer = cardSum;
      }
    }
  }

  return answer;
}

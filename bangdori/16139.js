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
    const s = input[0];
    const quiz = input
      .slice(2)
      .map((el) => el.split(" ").map((k) => (isNaN(k) ? k : Number(k))));
    console.log(solution(s, quiz));

    process.exit();
  });

// 200,000
// 20,400,000
// a->z 104 *
// 4

function solution(s, quiz) {
  const answer = [];
  const prefixSum = Array.from({ length: s.length + 1 }, () =>
    new Array(26).fill(0)
  );

  for (let i = 1; i <= s.length; i++) {
    const pos = s[i - 1].charCodeAt() - 97;

    for (let j = 0; j < 26; j++) {
      prefixSum[i][j] = prefixSum[i - 1][j];
    }
    prefixSum[i][pos]++;
  }

  for (const [c, start, end] of quiz) {
    const pos = c.charCodeAt() - 97;

    const count = prefixSum[end + 1][pos] - prefixSum[start][pos];
    answer.push(count);
  }

  return answer.join("\n");
}

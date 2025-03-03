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
    const count = +input[0];
    const numbers = input[1];

    console.log(solution(count, numbers));

    process.exit();
  });

function solution(count, numbers) {
  return [...numbers].reduce((prev, curr) => prev + +curr, 0);
}

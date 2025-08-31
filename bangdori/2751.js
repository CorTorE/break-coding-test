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
    const numbers = input.slice(1).map(Number);
    console.log(solution(n, numbers));

    process.exit();
  });

function solution(n, numbers) {
  let i, j;

  for (i = 1; i < n; i++) {
    const key = numbers[i];

    for (j = i - 1; j >= 0 && numbers[j] > key; j--) {
      numbers[j + 1] = numbers[j];
    }

    numbers[j + 1] = key;
  }

  return numbers.join("\n");
}

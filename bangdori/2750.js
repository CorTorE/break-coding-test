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
    const numbers = input.slice(1).map(Number);
    console.log(solution(numbers));

    process.exit();
  });

function solution(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    let currIdx = i;

    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[j] < numbers[currIdx]) {
        currIdx = j;
      }
    }

    if (currIdx === i) continue;
    const temp = numbers[i];
    numbers[i] = numbers[currIdx];
    numbers[currIdx] = temp;
  }

  return numbers.join("\n");
}

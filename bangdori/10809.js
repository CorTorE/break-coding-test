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
    const word = input[0];
    console.log(solution(word));

    process.exit();
  });

function solution(word) {
  const array = new Array(26).fill(-1);

  for (let i = 0; i < word.length; i++) {
    const pos = word[i].charCodeAt() - "a".charCodeAt();
    if (array[pos] === -1) {
      array[pos] = i;
    }
  }

  return array.join(" ");
}

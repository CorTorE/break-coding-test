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
    let i = 0;

    while (true) {
      const array = input[i].split(" ").map(Number);
      if (array[0] === 0) break;

      console.log(solution(array[0], array.slice(1)));
      console.log();

      i++;
    }

    process.exit();
  });

function solution(n, array) {
  const result = [];

  const combination = (start, selectedNumber, selected = []) => {
    if (selectedNumber === selected.length) {
      return result.push([...selected]);
    }

    for (let i = start; i < n; i++) {
      selected.push(array[i]);
      combination(i + 1, selectedNumber, selected);
      selected.pop();
    }
  };

  combination(0, 6, []);
  result.sort((a, b) => a - b);

  return result.map((el) => el.join(" ")).join("\n");
}

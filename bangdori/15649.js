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
    const [n, m] = input[0].split(" ").map(Number);
    console.log(solution(n, m));

    process.exit();
  });

function solution(n, m) {
  const answer = [];
  const array = Array.from({ length: n }, (_, index) => index + 1);

  const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const permutation = (i, arr, selectedNumber, selected = []) => {
    if (selectedNumber === selected.length) {
      return answer.push([...selected]);
    }

    for (let j = i; j < arr.length; j++) {
      swap(arr, i, j);
      selected.push(arr[i]);
      permutation(i + 1, arr, selectedNumber, selected);
      selected.pop();
      swap(arr, i, j);
    }
  };

  permutation(0, array, m, []);
  answer.sort();

  return answer.map((el) => el.join(" ")).join("\n");
}

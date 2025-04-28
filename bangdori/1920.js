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
    const array = input[1].split(" ").map(Number);
    const findNumbers = input[3].split(" ").map(Number);
    console.log(solution(n, array, findNumbers));

    process.exit();
  });

function solution(n, array, findNumbers) {
  const answer = [];
  const sortedArray = array.sort((a, b) => a - b);

  const binarySearch = (target) => {
    let left = 0;
    let right = n;

    while (left <= right) {
      const mid = parseInt((left + right) / 2, 10);

      if (sortedArray[mid] === target) {
        return 1;
      }

      if (sortedArray[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return 0;
  };

  for (const find of findNumbers) {
    answer.push(binarySearch(find));
  }

  return answer.join("\n");
}

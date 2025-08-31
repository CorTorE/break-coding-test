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
  const swap = (array, a, b) => {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  };

  const partition = (array, p, right) => {
    const pivot = array[p];
    let low, high;

    low = p + 1;
    high = right;

    while (low < high) {
      while (array[low] < pivot) low++;
      while (array[high] > pivot) high--;

      if (low < high) {
        swap(array, low, high);
      }
    }

    swap(array, p, high);

    return high;
  };

  const quickSort = (array, left, right) => {
    if (left >= right) return;

    const pivot = partition(array, left, right);

    quickSort(array, left, pivot - 1);
    quickSort(array, pivot + 1, right);
  };

  quickSort(numbers, 0, n - 1);

  return numbers;
}

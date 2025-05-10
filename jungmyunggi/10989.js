const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().split("\n").map(Number);
const N = input[0];
const numArr = input.slice(1);

function swap(numArr, i, j) {
  let temp = numArr[i];
  numArr[i] = numArr[j];
  numArr[j] = temp;
}
function f(numArr, low, high) {
  const pivot = numArr[low];
  let left = low + 1;
  let right = high;

  while (left <= right) {
    while (numArr[left] < pivot) {
      left++;
    }
    while (numArr[right] > pivot) {
      right--;
    }
    if (left < right) {
      swap(numArr, left, right);
    }
  }
  swap(numArr, low, right);
  return right;
}

function quickSort(numArr, low, high) {
  if (low < high) {
    const index = f(numArr, low, high);
    quickSort(numArr, low, index - 1);
    quickSort(numArr, index + 1, high);
  }
}

quickSort(numArr, 0, N - 1);

console.log(numArr);

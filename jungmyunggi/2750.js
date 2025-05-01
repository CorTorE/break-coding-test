const fs = require("fs");
const input = fs
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const numArr = input.slice(1);

function swap(numArr, i, j) {
  let temp = numArr[i];
  numArr[i] = numArr[j];
  numArr[j] = temp;
}

function selectionSort(numArr) {
  const N = numArr.length;
  for (let i = 0; i < N - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < N; j++) {
      if (numArr[minIndex] > numArr[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) swap(numArr, i, minIndex);
  }
  console.log(numArr.join("\n"));
}
selectionSort(numArr);

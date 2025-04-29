const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().split("\n").map(Number);

const numArr = input.slice(1);

function insertSort(numArr) {
  const N = numArr.length;
  for (let i = 1; i < N; i++) {
    const currentNum = numArr[i];
    let j = i - 1;
    while (j >= 0 && currentNum < numArr[j]) {
      numArr[j + 1] = numArr[j];
      j--;
    }
    numArr[j + 1] = currentNum;
  }
  console.log(numArr.join("\n"));
}
insertSort(numArr);

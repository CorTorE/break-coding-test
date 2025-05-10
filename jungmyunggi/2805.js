const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const trees = input[1].split(" ").map(Number);

function solution(N, M, trees) {
  let low = 1;
  let high = Math.max(...trees);
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let sum = 0;
    for (const tree of trees) {
      if (tree > mid) {
        sum += tree - mid;
      }
    }
    if (sum >= M) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  console.log(high);
}

solution(N, M, trees);

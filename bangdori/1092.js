const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const crains = input[1].split(" ").map(Number);
const m = +input[2];
const boxes = input[3].split(" ").map(Number);

crains.sort((a, b) => b - a);
boxes.sort((a, b) => b - a);

if (crains[0] < boxes[0]) {
  console.log(-1);
  return;
}

let count = 0;
let day = 0;
const visited = Array(m).fill(false);

while (count < m) {
  let idx = 0; // 박스 인덱스

  for (let i = 0; i < n; i++) {
    while (idx < m) {
      if (!visited[idx] && crains[i] >= boxes[idx]) {
        visited[idx] = true;
        idx++;
        count++;
        break;
      }

      idx++;
    }
  }

  day++;
}

console.log(day);

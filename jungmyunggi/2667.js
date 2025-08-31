const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let map = [];

rl.on("line", (line) => {
  if (!N) {
    N = Number(line);
  } else {
    map.push(line.split("").map(Number));
    if (map.length === N) {
      solution(N, map);
      rl.close();
    }
  }
});
const d = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// 방문여부는 -1로 표시
// 각 단지는 map에 저장
function solution(N, map) {
  const obj = new Map();
  let complex = 1;

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const place = map[row][col];
      if (place === 0) continue;
      const queue = [];
      let queueIndex = 0;
      queue.push([row, col]);
      while (queue.length !== queueIndex) {
        const [currentRow, currentCol] = queue[queueIndex++];
        if (map[currentRow][currentCol] === -1) continue;
        map[currentRow][currentCol] = -1; // 방문처리
        if (obj.has(complex)) {
          obj.set(complex, [...obj.get(complex), [currentRow, currentCol]]);
        } else {
          obj.set(complex, [[currentRow, currentCol]]);
        }
        for (const [dr, dc] of d) {
          if (dr + currentRow < 0 || dr + currentRow >= N) continue;
          if (dc + currentCol < 0 || dc + currentCol >= N) continue;
          const nextPlace = map[dr + currentRow][dc + currentCol];
          if (nextPlace === 1) {
            queue.push([dr + currentRow, dc + currentCol]);
          }
        }
      }
      complex++;
    }
  }
  const output = [];
  console.log(obj.size);
  for (const o of obj) {
    output.push(o[1].length);
  }
  output.sort((a, b) => a - b);
  console.log(output.join("\n"));
}

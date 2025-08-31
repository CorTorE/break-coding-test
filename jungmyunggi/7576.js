const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let tomato = [];

rl.on("line", (line) => {
  if (!N && !M) {
    [M, N] = line.split(" ").map(Number);
  } else {
    tomato.push(line.split(" ").map(Number));
    if (tomato.length === N) {
      solution(N, M, tomato);
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

function bfs(N, M, tomato) {
  const queue = [];
  let queueIndex = 0;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (tomato[row][col] === 1) {
        queue.push([row, col, 1]);
      }
    }
  }

  while (queue.length !== queueIndex) {
    const [currentRow, currentCol, currentDist] = queue[queueIndex++];
    for (const [dr, dc] of d) {
      const nr = currentRow + dr;
      const nc = currentCol + dc;
      if (nr < 0 || nr >= N) continue;
      if (nc < 0 || nc >= M) continue;
      const next = tomato[nr][nc];
      if (next === 0) {
        tomato[nr][nc] = currentDist + 1;
        queue.push([nr, nc, currentDist + 1]);
      }
    }
  }
}

function solution(N, M, tomato) {
  bfs(N, M, tomato);
  const answer = [];
  for (let i = 0; i < N; i++) {
    answer.push(...tomato[i]);
  }
  answer.sort((a, b) => a - b);

  if (answer.includes(0)) {
    console.log(-1);
  } else {
    console.log(answer.pop() - 1);
  }
}

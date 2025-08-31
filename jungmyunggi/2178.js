// 미로찾기
// 미로의 1은 이동가능 0은 이동 불가
// 1,1에서 출발, N,M에서 도착
// 이동해야하는 최소 칸 수를 구하는 프로그램
// 시작, 도착위치도 이동횟수에 포함

// 4 6
// 1 0 1 1 1 1
// 1 0 1 0 1 0
// 1 0 1 0 1 0
// 1 1 1 0 0 1

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.output,
});

let N, M;
let maze = [];

rl.on("line", (line) => {
  if (!N && !M) {
    [N, M] = line.split(" ").map(Number);
  } else {
    maze.push(line.split("").map(Number));
    if (maze.length === N) {
      const answer = solution(N, M, maze);
      console.log(answer);
      rl.close();
    }
  }
});

function solution(N, M, maze) {
  const d = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [[0, 0, 1]];
  let queueIndex = 0;

  while (queue.length !== queueIndex) {
    const [cRow, cCol, cDist] = queue[queueIndex++];
    if (cRow === N - 1 && cCol === M - 1) {
      return cDist;
    }
    for (const [dr, dc] of d) {
      const nr = cRow + dr;
      const nc = cCol + dc;
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr <= N - 1 &&
        nc <= M - 1 &&
        maze[nr][nc] === 1
      ) {
        maze[nr][nc] = 0;
        queue.push([nr, nc, cDist + 1]);
      }
    }
  }
  return -1;
}

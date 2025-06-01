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

    const [col, row] = input[0].split(" ").map(Number);
    const tomatoBox = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(row, col, tomatoBox));

    process.exit();
  });

// 토마토 익히기
// 상자의 가로(M), 세로(N) / 2 <= M, N <= 1,000
// 토마토는 반드시 하나 이상 존재
// -1은 토마토가 들어있지 않은 칸 -> 모든 토마토가 익지 않는 경우가 발생

// O(3 * N * M)

const IN_TOMATO = 1;
const TOMATO = 0;
const DIRS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function solution(rowSize, colSize, tomatoBox) {
  let answer = -1; // 날짜

  // O(N * M)
  let queue = getInitQueue(rowSize, colSize, tomatoBox);

  // O(N * M)
  while (queue.length > 0) {
    answer++;
    const nextQueue = [];

    for (const [row, col] of queue) {
      for (const [dr, dc] of DIRS) {
        const nr = row + dr;
        const nc = col + dc;

        if (nr < 0 || nr >= rowSize) continue;
        if (nc < 0 || nc >= colSize) continue;

        if (tomatoBox[nr][nc] === TOMATO) {
          nextQueue.push([nr, nc]);
          tomatoBox[nr][nc] = IN_TOMATO;
        }
      }
    }

    queue = nextQueue;
  }

  // O(N * M)
  if (!isFullInTomato(rowSize, colSize, tomatoBox)) {
    return -1;
  }

  return answer;
}

function isFullInTomato(rowSize, colSize, tomatoBox) {
  for (let r = 0; r < rowSize; r++) {
    for (let c = 0; c < colSize; c++) {
      if (tomatoBox[r][c] === TOMATO) return false;
    }
  }

  return true;
}

function getInitQueue(rowSize, colSize, tomatoBox) {
  const queue = [];

  for (let row = 0; row < rowSize; row++) {
    for (let col = 0; col < colSize; col++) {
      if (tomatoBox[row][col] === IN_TOMATO) {
        queue.push([row, col]);
      }
    }
  }

  return queue;
}

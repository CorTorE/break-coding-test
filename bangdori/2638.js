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

    const [ySize, xSize] = input[0].split(" ").map(Number);
    const matrix = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(ySize, xSize, matrix));

    process.exit();
  });

const CHEESE = 1;
const OUTDOOR = -1;

const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function solution(ySize, xSize, matrix) {
  const visited = Array.from({ length: ySize }, () => Array(xSize).fill(false));

  let cheeses = getCheeses(ySize, xSize, matrix);
  exploreOutsideAir(matrix, visited, 0, 0);

  let time = 0;

  while (cheeses.length > 0) {
    time++;
    const holds = [];
    const melts = [];

    for (const [currY, currX] of cheeses) {
      let count = 0;

      for (const [dy, dx] of dirs) {
        const ny = currY + dy;
        const nx = currX + dx;

        if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) continue;
        if (matrix[ny][nx] === CHEESE) continue;
        if (visited[ny][nx]) count++;
      }

      if (count < 2) holds.push([currY, currX]);
      else melts.push([currY, currX]);
    }

    for (const [currY, currX] of melts) {
      matrix[currY][currX] = 0;
      exploreOutsideAir(matrix, visited, currY, currX);
    }

    cheeses = holds;
  }

  return time;
}

function getCheeses(ySize, xSize, matrix) {
  const cheeses = [];

  for (let y = 0; y < ySize; y++) {
    for (let x = 0; x < xSize; x++) {
      if (matrix[y][x] === CHEESE) {
        cheeses.push([y, x]);
      }
    }
  }

  return cheeses;
}

// 외부 공기 탐색
function exploreOutsideAir(matrix, visited, y, x) {
  const queue = [];

  let i = 0;
  visited[y][x] = true;
  queue.push([y, x]);

  while (i < queue.length) {
    const [currY, currX] = queue[i];

    for (const [dy, dx] of dirs) {
      const ny = currY + dy;
      const nx = currX + dx;

      if (ny < 0 || ny >= visited.length || nx < 0 || nx >= visited[0].length)
        continue;
      if (visited[ny][nx]) continue;
      if (matrix[ny][nx] === CHEESE) continue;

      visited[ny][nx] = true;
      queue.push([ny, nx]);
    }

    i++;
  }
}

// 7 7
// 0 0 0 0 0 0 0
// 0 1 1 1 1 1 0
// 0 1 0 0 0 1 0
// 0 1 0 1 0 1 0
// 0 1 0 0 0 1 0
// 0 1 1 1 1 1 0
// 0 0 0 0 0 0 0

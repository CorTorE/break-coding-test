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
    const matrix = input.slice(1).map((el) => el.split("").map(Number));
    console.log(solution(ySize, xSize, matrix));

    process.exit();
  });

const DIRS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function solution(ySize, xSize, matrix) {
  const visited = Array.from({ length: ySize }, () =>
    Array.from({ length: xSize }, () => new Array(2).fill(false))
  );

  const queue = [];
  queue.push([0, 0, 1, 0]); // y, x, isBreakWall
  visited[0][0][0] = true;

  let head = 0;

  while (queue.length > head) {
    const [y, x, dist, wall] = queue[head++];

    if (y === ySize - 1 && x === xSize - 1) {
      return dist;
    }

    for (const [cy, cx] of DIRS) {
      const ny = y + cy;
      const nx = x + cx;

      if (ny < 0 || ny >= ySize) continue;
      if (nx < 0 || nx >= xSize) continue;

      if (matrix[ny][nx] === 1 && wall === 0 && !visited[ny][nx][1]) {
        visited[ny][nx][1] = true;
        queue.push([ny, nx, dist + 1, 1]);
      } else if (matrix[ny][nx] === 0 && !visited[ny][nx][wall]) {
        visited[ny][nx][wall] = true;
        queue.push([ny, nx, dist + 1, wall]);
      }
    }
  }

  return -1;
}

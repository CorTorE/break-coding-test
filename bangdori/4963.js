const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */
    let n = 0;
    const maxLength = input.length;
    while (maxLength > n) {
      const [width, height] = input.splice(0, 1)[0].split(" ").map(Number);

      if (width === 0 && height === 0) return;

      const matrix = input
        .splice(0, height)
        .map((el) => el.split(" ").map(Number));

      console.log(solution(width, height, matrix));
      n += height + 1;
    }

    process.exit();
  });

const DIRS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

function solution(width, height, matrix) {
  let answer = 0;

  const bfs = (row, col) => {
    const queue = [];
    let ptr = 0;

    queue.push([row, col]);
    matrix[row][col] = 0;

    while (queue.length > ptr) {
      const [row, col] = queue[ptr];

      for (const [dr, dc] of DIRS) {
        const nr = row + dr;
        const nc = col + dc;

        if (nr < 0 || nr >= height) continue;
        if (nc < 0 || nc >= width) continue;
        if (matrix[nr][nc] === 0) continue;

        queue.push([nr, nc]);
        matrix[nr][nc] = 0;
      }

      ptr++;
    }
  };

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (matrix[row][col] === 0) continue;

      bfs(row, col);
      answer++;
    }
  }

  return answer;
}

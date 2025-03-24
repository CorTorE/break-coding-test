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
    const n = +input[0];
    const matrix = input.slice(1).map((el) => el.split("").map(Number));
    console.log(solution(n, matrix));

    process.exit();
  });

const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function solution(n, matrix) {
  const answer = [];

  const getArea = (row, col) => {
    let count = 0;
    const queue = [];
    queue.push([row, col]);
    matrix[row][col] = 0;

    let ptr = 0;

    while (queue.length > ptr) {
      const [currentRow, currentCol] = queue[ptr];
      count++;

      for (const [dr, dc] of DIRS) {
        const nr = currentRow + dr;
        const nc = currentCol + dc;

        if (nr < 0 || nr >= n) continue;
        if (nc < 0 || nc >= n) continue;
        if (matrix[nr][nc] === 0) continue;
        queue.push([nr, nc]);
        matrix[nr][nc] = 0;
      }

      ptr++;
    }

    return count;
  };

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (matrix[row][col] === 0) continue;

      const area = getArea(row, col);
      answer.push(area);
    }
  }

  answer.sort((a, b) => a - b);
  return [answer.length, ...answer].join("\n");
}

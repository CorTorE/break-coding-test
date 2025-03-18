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
    const [rows, cols] = input[0].split(" ").map(Number);
    const matrix = input.slice(1).map((line) => line.split("").map(Number));
    console.log(solution(rows, cols, matrix));

    process.exit();
  });

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function solution(rows, cols, matrix) {
  let answer = 0;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(-1));

  const dfs = (row, col, count) => {
    // 미방문이 아니면서, count보다 크다면 return
    if (visited[row][col] !== -1 && visited[row][col] <= count) return;

    visited[row][col] = count;
    if (row === rows - 1 && col === cols - 1) {
      answer = count;
      return;
    }

    for (const [xr, xc] of dirs) {
      const nr = row + xr;
      const nc = col + xc;

      if (nr < 0 || nr >= rows) continue;
      if (nc < 0 || nc >= cols) continue;
      if (visited[nr][nc] !== -1 && visited[nr][nc] < count + 1) continue;

      if (matrix[nr][nc] === 1) {
        dfs(nr, nc, count + 1);
      }
    }
  };

  dfs(0, 0, 1);

  return answer;
}

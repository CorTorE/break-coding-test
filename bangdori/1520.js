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

function solution(ySize, xSize, matrix) {
  const dp = Array.from({ length: ySize }, () => Array(xSize).fill(-1));
  const dirs = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  const dfs = (y, x) => {
    if (y === ySize - 1 && x === xSize - 1) return 1;
    if (dp[y][x] !== -1) return dp[y][x];

    dp[y][x] = 0;

    for (const [dy, dx] of dirs) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) continue;
      if (matrix[ny][nx] >= matrix[y][x]) continue;

      dp[y][x] += dfs(ny, nx);
    }

    return dp[y][x];
  };

  return dfs(0, 0);
}

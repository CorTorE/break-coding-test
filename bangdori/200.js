const LAND = "1";
const WATER = "0";

const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const ySize = grid.length;
  const xSize = grid[0].length;

  const visited = Array.from({ length: ySize }, () => Array(xSize).fill(false));
  let answer = 0;

  const dfs = (y, x) => {
    if (visited[y][x]) return;

    visited[y][x] = true;

    for (let [dy, dx] of dirs) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) continue;
      if (visited[ny][nx] || grid[ny][nx] === WATER) continue;

      dfs(ny, nx);
    }
  };

  for (let y = 0; y < ySize; y++) {
    for (let x = 0; x < xSize; x++) {
      if (visited[y][x] || grid[y][x] === WATER) continue;

      answer++;
      dfs(y, x);
    }
  }

  return answer;
};

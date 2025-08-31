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
    const office = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(ySize, xSize, office));

    process.exit();
  });

const EMPTY = 0;
const WALL = 6;

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

// 카메라 범위와 반봇 횟수
const zone = [
  [],
  [[0], [1], [2], [3]],
  [
    [0, 2],
    [1, 3],
  ],
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 3],
  ],
  [
    [0, 1, 2],
    [0, 1, 3],
    [1, 2, 3],
    [0, 2, 3],
  ],
  [[0, 1, 2, 3]],
];

class Camera {
  constructor(y, x, range) {
    this.y = y;
    this.x = x;
    this.range = range;
  }
}

function solution(ySize, xSize, office) {
  const cameras = getCameraPos(office);
  let answer = Infinity;

  const fill = (newOffice, mode, y, x) => {
    for (const dir of mode) {
      let ny = y;
      let nx = x;

      while (1) {
        ny += dirs[dir][0];
        nx += dirs[dir][1];

        if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) break;
        if (newOffice[ny][nx] === WALL) break;
        if (newOffice[ny][nx] === EMPTY) newOffice[ny][nx] = -1;
      }
    }
  };

  const dfs = (depth, newOffice) => {
    if (depth === cameras.length) {
      answer = Math.min(answer, getSpotOnOffice(newOffice));
      return;
    }

    const currentCamera = cameras[depth];
    for (const mode of zone[currentCamera.range]) {
      const temp = [...newOffice.map((line) => [...line])]; // 매 loop마다 복사
      fill(temp, mode, currentCamera.y, currentCamera.x);
      dfs(depth + 1, temp);
    }
  };

  dfs(0, office);

  return answer;
}

function getCameraPos(office) {
  const cameras = [];

  for (let y = 0; y < office.length; y++) {
    for (let x = 0; x < office[0].length; x++) {
      if (office[y][x] === EMPTY || office[y][x] === WALL) continue;

      const camera = new Camera(y, x, office[y][x]);
      cameras.push(camera);
    }
  }

  return cameras;
}

const getSpotOnOffice = (newOffice) => {
  let count = 0;

  for (let y = 0; y < newOffice.length; y++) {
    for (let x = 0; x < newOffice[0].length; x++) {
      if (newOffice[y][x] === EMPTY) {
        count++;
      }
    }
  }

  return count;
};

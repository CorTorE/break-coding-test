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

    const fishList = input.map((el) => el.split(" ").map(Number));
    const fishes = [];
    const fishDirs = [];

    for (let r = 0; r < fishList.length; r++) {
      const fishLine = [];
      const dirLine = [];

      for (let c = 0; c < fishList[0].length; c += 2) {
        fishLine.push(fishList[r][c]);
        dirLine.push(fishList[r][c + 1] - 1);
      }

      fishes.push(fishLine);
      fishDirs.push(dirLine);
    }

    console.log(solution(fishes, fishDirs));

    process.exit();
  });

const dirs = [
  [-1, 0], // 상
  [-1, -1],
  [0, -1], // 좌
  [1, -1],
  [1, 0], // 하
  [1, 1],
  [0, 1], // 우
  [-1, 1],
];

const SIZE = 4;
const MAX_ROTATION_COUNT = 8;

const EMPTY = 0;
const SHARK = -1;

function solution(fishes, fishDirs) {
  let answer = 0;

  const rearrangementFishes = (fishesCopy, fishDirsCopy) => {
    // 키: 물고기 번호
    // 값: [y, x, 방향]
    const fishMap = new Map();

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (fishesCopy[r][c] === SHARK || fishesCopy[r][c] === EMPTY) continue;

        fishMap.set(fishesCopy[r][c], [r, c]);
      }
    }

    // 2. 물고기 위치 이동하기 (위치 배열을 갱신하면서)
    const keys = [...fishMap.keys()];
    keys.sort((a, b) => a - b);

    for (const key of keys) {
      const [currY, currX] = fishMap.get(key);
      let currentDir = fishDirsCopy[currY][currX];
      let rotationCount = 0;

      while (rotationCount < MAX_ROTATION_COUNT) {
        const [dy, dx] = dirs[currentDir];
        const ny = currY + dy;
        const nx = currX + dx;

        // 물고기가 있는 위치라면 교체
        if (isValid(ny, nx) && fishesCopy[ny][nx] !== SHARK) {
          // 이동할 위치의 물고기 번호
          const fid = fishesCopy[ny][nx];
          const fishDir = fishDirsCopy[ny][nx];

          // 물고기 번호 교체
          fishesCopy[ny][nx] = key;
          fishesCopy[currY][currX] = fid;

          // 물고기 방향 교체
          fishDirsCopy[ny][nx] = currentDir;
          fishDirsCopy[currY][currX] = fishDir;

          // 물고기 위치 교체
          fishMap.set(key, [ny, nx]);
          if (fid !== EMPTY) {
            fishMap.set(fid, [currY, currX]);
          }

          break;
        }

        currentDir = (currentDir + 1) % 8;
        rotationCount++;
      }
    }
  };

  const eatFish = (y, x, fishesCopy, prevShark) => {
    // 물고기 먹기
    const score = fishesCopy[y][x];
    const [prevY, prevX] = prevShark;
    fishesCopy[y][x] = SHARK;

    // 최초 시작이 아닌 경우, 이전 상어의 위치를 빈 공간으로 설정
    if (prevY !== SHARK) {
      fishesCopy[prevY][prevX] = EMPTY;
    }

    // 상어 위치 갱신
    prevShark[0] = y;
    prevShark[1] = x;

    return score;
  };

  const moveShark = (y, x, currFishes, currFishDirs, score, prevShark) => {
    // 깊은 복사
    const fishesCopy = deepCopy(currFishes);
    const fishDirsCopy = deepCopy(currFishDirs);

    // 물고기 먹기 & 최대 점수 갱신
    const sharkDir = fishDirsCopy[y][x]; // 물고기 방향 기억
    const addScore = eatFish(y, x, fishesCopy, prevShark);
    const newScore = score + addScore;

    // 물고기 위치 재배열
    rearrangementFishes(fishesCopy, fishDirsCopy);

    // 상어 방향 이동
    let hasNextMove = false;
    const [dy, dx] = dirs[sharkDir];
    let ny = y + dy;
    let nx = x + dx;

    while (isValid(ny, nx)) {
      // 물고기가 있는 경우에만 이동
      if (fishesCopy[ny][nx] >= 1 && fishesCopy[ny][nx] <= 16) {
        hasNextMove = true;
        moveShark(ny, nx, fishesCopy, fishDirsCopy, newScore, [y, x]);
      }

      // 다른 위치로 이동
      ny += dy;
      nx += dx;
    }

    if (!hasNextMove) {
      answer = Math.max(answer, newScore);
    }
  };

  moveShark(0, 0, fishes, fishDirs, 0, [-1, -1]);

  return answer;
}

const isValid = (y, x) => y >= 0 && y < SIZE && x >= 0 && x < SIZE;
const deepCopy = (arr) => JSON.parse(JSON.stringify(arr));

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
    const matrix = input.slice(1).map((el) => el.split(""));
    console.log(solution(ySize, xSize, matrix));

    process.exit();
  });

class Node {
  constructor(y, x, cost, key) {
    this.y = y;
    this.x = x;
    this.cost = cost;
    this.key = key;
  }
}

const POINT = {
  START: "0",
  END: "1",
  WALL: "#",
};

const DIRS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function solution(ySize, xSize, matrix) {
  const visited = Array.from({ length: ySize }, () =>
    Array.from({ length: xSize }, () => Array(64).fill(false))
  );
  let queue = [];

  const start = getStartPoint(matrix);
  queue.push(start);
  visited[start.y][start.x][start.key] = true;

  while (queue.length > 0) {
    const nextQueue = [];

    for (const current of queue) {
      if (matrix[current.y][current.x] === POINT.END) {
        return current.cost;
      }

      for (const [cy, cx] of DIRS) {
        const ny = current.y + cy;
        const nx = current.x + cx;

        if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) continue;
        if (visited[ny][nx][current.key] || matrix[ny][nx] === POINT.WALL)
          continue;

        const nextVal = matrix[ny][nx];

        if (nextVal >= "a" && nextVal <= "f") {
          let nextKey = 1 << (nextVal.charCodeAt() - "a".charCodeAt());
          nextKey = current.key | nextKey;

          visited[ny][nx][nextKey] = true;
          nextQueue.push(new Node(ny, nx, current.cost + 1, nextKey));
        } else if (nextVal >= "A" && nextVal <= "F") {
          if (
            (current.key & (1 << (nextVal.charCodeAt() - "A".charCodeAt()))) ==
            Math.pow(2, nextVal.charCodeAt() - "A".charCodeAt())
          ) {
            visited[ny][nx][current.key] = true;
            nextQueue.push(new Node(ny, nx, current.cost + 1, current.key));
          }
        } else {
          visited[ny][nx][current.key] = true;
          nextQueue.push(new Node(ny, nx, current.cost + 1, current.key));
        }
      }
    }

    queue = nextQueue;
  }

  return -1;
}

function getStartPoint(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === POINT.START) {
        return new Node(y, x, 0, 0);
      }
    }
  }
}

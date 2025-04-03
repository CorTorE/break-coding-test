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
    const students = input.map((el) => el.split(""));
    console.log(solution(students));

    process.exit();
  });

class Student {
  constructor(y, x) {
    this.y = y;
    this.x = x;
  }
}

const SIZE = 5;
const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function solution(students) {
  let answer = 0;

  function bfs(arr) {
    const visited = Array.from({ length: SIZE }, () => Array(SIZE).fill(true));
    const queue = [];
    let count = 1;

    queue.push(arr.pop());

    for (const student of arr) {
      visited[student.y][student.x] = false;
    }

    while (queue.length > 0) {
      const student = queue.pop();

      for (const [cy, cx] of DIRS) {
        const ny = student.y + cy;
        const nx = student.x + cx;

        if (ny < 0 || ny >= SIZE || nx < 0 || nx >= SIZE) continue;
        if (visited[ny][nx]) continue;

        queue.push(new Student(ny, nx));
        visited[ny][nx] = true;
        count++;
      }
    }

    return count === 7;
  }

  function dfs(depth, start, yCount, arr = []) {
    // 임도연파 학생의 수가 4 이상인 경우
    if (yCount === 4) return;

    if (depth === 7) {
      if (bfs(arr)) answer++;
      return;
    }

    for (let i = start; i < 25; i++) {
      const y = Math.floor(i / 5);
      const x = i % 5;
      const student = new Student(y, x);
      const nextArr = [...arr, student];
      const nextYCount = students[y][x] === "Y" ? yCount + 1 : yCount;

      dfs(depth + 1, i + 1, nextYCount, nextArr);
    }
  }

  dfs(0, 0, 0);

  return answer;
}

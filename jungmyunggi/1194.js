// 미로탈출
// 빈칸(.) 이동가능
// 벽(#) 이동 불가
// 열쇠(소문자 a~f)
// 문 열쇠가 있을때만 이동가능(대문자 A~F)
// 현재위치 0
// 출구 1

// 움직임은 상하좌우

// 미로탈출하는데 걸리는 최소값

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let N, M;
let map = [];
rl.on("line", (line) => {
  if (!N && !M) {
    [N, M] = line.split(" ").map(Number);
  } else {
    map.push(line.split(""));
    if (map.length === N) {
      const answer = solution(N, M, map);
      console.log(answer);
      rl.close();
    }
  }
});

const d = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(N, M, map) {
  let sr, sc;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (map[row][col] === "0") {
        sr = row;
        sc = col;
      }
    }
  }

  const queue = [];
  let queueIndex = 0;
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array.from({ length: 64 }, () => false))
  );

  queue.push([sr, sc, 0b000000, 0]);
  visited[sr][sc][0b000000] = true;

  while (queue.length !== queueIndex) {
    let [cr, cc, key, dist] = queue[queueIndex++];
    for (const [dr, dc] of d) {
      const newRow = cr + dr;
      const newCol = cc + dc;
      if (newRow < 0 || newRow >= N) continue;
      if (newCol < 0 || newCol >= M) continue;
      if (map[newRow][newCol] === "#") continue;

      // 도착지인 경우
      if (map[newRow][newCol] === "1") return dist + 1;
      // 키인 경우
      if (map[newRow][newCol] >= "a" && map[newRow][newCol] <= "f") {
        const keybits =
          1 << (map[newRow][newCol].charCodeAt(0) - "a".charCodeAt(0));
        const newKey = key | keybits;

        if (visited[newRow][newCol][newKey] === false) {
          //해당 키를 가지고 온적이 없는 경우
          visited[newRow][newCol][newKey] = true;
          queue.push([newRow, newCol, newKey, dist + 1]);
        }
        continue;
      }
      // 문인 경우
      if (map[newRow][newCol] >= "A" && map[newRow][newCol] <= "F") {
        const door =
          1 << (map[newRow][newCol].charCodeAt(0) - "A".charCodeAt(0));
        if ((key & door) === 0) continue;
        if (visited[newRow][newCol][key] === false) {
          visited[newRow][newCol][key] = true;
          queue.push([newRow, newCol, key, dist + 1]);
        }
        continue;
      }
      // 길인 경우
      if (map[newRow][newCol] === "." || map[newRow][newCol] === "0") {
        if (visited[newRow][newCol][key] === false) {
          visited[newRow][newCol][key] = true;
          queue.push([newRow, newCol, key, dist + 1]);
        }
        continue;
      }
    }
  }
  return -1;
}

// 1. 비어있는 칸중 좋아하는 학생이 인접한 칸에 가장 많은 칸
// 2. 인접한 칸중 비어있는 칸이 가장 많은 칸
// 3. 행의 번호가 가장 작은 칸
// 4. 열의 번호가 가장 작은 칸

// 만족도 검사
// 인접한 칸에 좋아하는 학생수를 확인해야함
// 0이면 0
// 1이면 1
// 2이면 10
// 3이면 100
// 4이면 1000
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let preference = new Map();

rl.on("line", (line) => {
  if (!N) {
    N = Number(line);
  } else {
    const temp = line.split(" ").map(Number);
    preference.set(temp[0], temp.slice(1));
    if (preference.size === N * N) {
      solution(N, preference);
      rl.close();
    }
  }
});

const d = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function placement(N, map, preference) {
  for (const [student, preferenceArr] of preference) {
    // 1번 조건, 좋아하는 학생이 주변에 가장 많은 칸 고르기
    // 2번 조건, 인접한 칸에 빈 자리가 많은 칸 고르기
    let tempPlaces = [];
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (map[row][col] !== 0) continue;
        let emptyCount = 0;
        let tempCount = 0;
        for (const [dr, dc] of d) {
          if (dr + row >= N || dr + row < 0) continue;
          if (dc + col >= N || dc + col < 0) continue;
          const nextPlace = map[dr + row][dc + col];
          if (nextPlace === 0) {
            emptyCount++;
          }
          if (preferenceArr.includes(nextPlace)) {
            tempCount++;
          }
        }
        tempPlaces.push([row, col, tempCount, emptyCount]);
      }
    }
    tempPlaces.sort((a, b) => {
      return (
        b[2] - a[2] || // 1순위 선호도
        b[3] - a[3] || // 2순위 빈자리
        a[0] - b[0] || // 3순위 Row
        a[1] - b[1] // 4순위 Col
      );
    });
    const pickPlace = tempPlaces[0];
    map[pickPlace[0]][pickPlace[1]] = student;
  }
}

function calcPreference(N, map, preference) {
  let preferenceCount = 0;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const student = map[row][col];
      const preferenceArr = preference.get(student);

      let c = 0;
      for (const [dr, dc] of d) {
        if (dr + row >= N || dr + row < 0) continue;
        if (dc + col >= N || dc + col < 0) continue;
        const nextPlace = map[dr + row][dc + col];
        if (preferenceArr.includes(nextPlace)) {
          c++;
        }
      }
      if (c === 0) {
        continue;
      } else if (c === 1) {
        preferenceCount += 1;
      } else if (c === 2) {
        preferenceCount += 10;
      } else if (c === 3) {
        preferenceCount += 100;
      } else if (c === 4) {
        preferenceCount += 1000;
      }
    }
  }
  return preferenceCount;
}

function solution(N, preference) {
  const map = [];
  for (let i = 0; i < N; i++) {
    map.push(Array(N).fill(0));
  }
  placement(N, map, preference);
  const answer = calcPreference(N, map, preference);
  console.log(answer);
}

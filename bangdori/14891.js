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
    const wheels = input.slice(0, 4).map((el) => el.split("").map(Number));
    const dirs = input.slice(5).map((el) => el.split(" ").map(Number));

    console.log(solution(wheels, dirs));

    process.exit();
  });

const SIZE = 4;
const FORWARD = 1; // 시계 방향
const REVERSE = -1; // 반시계 방향

function solution(wheels, dirs) {
  for (const [wheelId, dir] of dirs) {
    const rotations = determineIsRotations(wheels, wheelId - 1, dir); // 회전 여부 판별

    for (let i = 0; i < SIZE; i++) {
      if (rotations[i] === FORWARD) {
        // 시계 방향 회전
        const num = wheels[i].pop();
        wheels[i].splice(0, 0, num);
      } else if (rotations[i] === REVERSE) {
        // 반시계 방향 회전
        const num = wheels[i].shift();
        wheels[i].push(num);
      }
    }
  }

  let answer = 0;

  for (let i = 0; i < SIZE; i++) {
    const weight = 2 ** i;

    if (wheels[i][0] === 1) {
      answer += weight;
    }
  }

  return answer;
}

function determineIsRotations(wheels, wheelId, dir) {
  const rotations = [0, 0, 0, 0];

  rotations[wheelId] = dir;

  for (let ltr = wheelId - 1; ltr >= 0; ltr--) {
    if (wheels[ltr][2] !== wheels[ltr + 1][6]) {
      rotations[ltr] = rotations[ltr + 1] * -1;
    } else {
      break;
    }
  }

  for (let rtr = wheelId + 1; rtr < SIZE; rtr++) {
    if (wheels[rtr][6] !== wheels[rtr - 1][2]) {
      rotations[rtr] = rotations[rtr - 1] * -1;
    } else {
      break;
    }
  }

  return rotations;
}

// 회전 여부를 먼저 판별하고,
// 모든 톱니바퀴의 회전 여부가 판별 완료되는 경우 회전을 진행

// 톱니바퀴가 회전하지 않는다면? 다른 톱니바퀴도 회전하지 않음
// 회전 시, 맞닿은 부분이 서로 같다면 회전하지 않음
// 회전 시, 맞닿은 부분이 서로 다르다면 이전 톱니바퀴 회전과 반대로 회전한다.

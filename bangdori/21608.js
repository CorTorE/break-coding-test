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
    const n = +input[0];
    const relationships = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, relationships));

    process.exit();
  });

const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function solution(n, relationships) {
  let answer = 0;

  const seats = Array.from({ length: n }, () => new Array(n).fill(0)); // 학생들이 앉을 좌석
  const friendsMap = new Map(); // 친구 관계
  const array = relationships.map(([sid]) => sid).reverse(); // 학생 배치 순서 설정

  // 친구 관계 연결
  for (let i = 0; i < relationships.length; i++) {
    const friends = relationships[i];

    const sid = friends[0];
    friendsMap.set(sid, friends.slice(1));
  }

  while (array.length > 0) {
    const sid = array.pop();
    let friendsCount = 0;
    let emptyCount = 0;
    let currentRow = n,
      currentCol = n;

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (seats[row][col] !== 0) continue;
        if (currentRow === n && currentCol === n) {
          currentRow = row;
          currentCol = col;
        }

        const [newFriendsCount, newEmptyCount] = getNearbySeatInfo(
          seats,
          friendsMap,
          row,
          col,
          sid
        );

        /**
         * @description 좌석 갱신 조건 체크
         * @case 가장 좋아하는 친구 수가 현재 좌석에 더 많은 경우
         * @case 가장 좋아하는 친구 수가 현재 좌석과 동일하며, 빈 좌석 수가 더 많은 경우
         *
         */
        // 가장 좋아하는 친구 수가
        if (
          newFriendsCount > friendsCount ||
          (newFriendsCount === friendsCount && newEmptyCount > emptyCount)
        ) {
          friendsCount = newFriendsCount;
          emptyCount = newEmptyCount;
          currentRow = row;
          currentCol = col;
        }
      }
    }

    seats[currentRow][currentCol] = sid;
  }

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const sid = seats[r][c];
      const [friendsCount] = getNearbySeatInfo(seats, friendsMap, r, c, sid);

      if (friendsCount >= 1) {
        answer += 10 ** (friendsCount - 1);
      }
    }
  }

  return answer;
}

function getNearbySeatInfo(seats, friendsMap, row, col, sid) {
  const friends = friendsMap.get(sid);
  let friendsCount = 0;
  let emptyCount = 0;

  for (const [dr, dc] of DIRS) {
    const nr = row + dr;
    const nc = col + dc;

    if (nr < 0 || nr >= seats.length) continue;
    if (nc < 0 || nc >= seats[0].length) continue;

    const nsid = seats[nr][nc];

    if (nsid === 0) {
      emptyCount++;
      continue;
    }

    if (friends.includes(nsid)) friendsCount++;
  }

  return [friendsCount, emptyCount];
}

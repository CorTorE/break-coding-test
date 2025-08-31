const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */

    const n = +input[0];
    console.log(solution(n));

    process.exit();
  });

function isPossible(chessboard, x, y) {
  for (let i = 0; i < x; i++) {
    if (chessboard[i] === y) return false;
    if (Math.abs(x - i) === Math.abs(y - chessboard[i])) return false;
  }

  return true;
}

function solution(n) {
  let answer = 0;

  // index = x, chessboard[index] = y
  const chessboard = new Array(n).fill(-1);

  const nQueen = (chessboard, x) => {
    if (x === chessboard.length) {
      answer++;
      return;
    }

    for (let y = 0; y < chessboard.length; y++) {
      if (isPossible(chessboard, x, y)) {
        chessboard[x] = y;
        nQueen(chessboard, x + 1);
        chessboard[x] = -1; // 초기화
      }
    }
  };

  nQueen(chessboard, 0);

  return answer;
}

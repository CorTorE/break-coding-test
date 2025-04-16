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
    const size = +input[0];
    const array = input[1].split(" ").map(Number);

    console.log(solution(size, array));

    process.exit();
  });

function binarySearch(array, target) {
  let left = 0,
    right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid;
    }

    if (array[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

function solution(size, array) {
  const answer = [];

  answer.push(array[0]);

  for (let i = 1; i < size; i++) {
    if (array[i] > answer[answer.length - 1]) {
      answer.push(array[i]);
    } else {
      // binary Search로 탐색

      const idx = binarySearch(answer, array[i]);
      answer[idx] = array[i];
    }
  }

  return answer.length;
}

// 정렬된 경우
// input:
// 6
// 10 20 30 40 50 60
// output: 6

// 역정렬된 경우
// input:
// 6
// 60 50 40 30 20 10
// output: 6

// 테스트케이스
// input:
// 6
// 10 20 10 30 20 50
// output: 4

// 테스트케이스
// input:
// 6
// 50 10 40 30 60 80
// output: 4

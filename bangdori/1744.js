// 수열의 위치는 중요하지 않다.
// 특정 수를 임의로 묶을 수 있다.
// 묶는다 = 2개의 수를 선택한 후 곱셈을 한다
// 단 한번 만 묶을 수 있다.

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
    const array = input.slice(1).map(Number);
    console.log(solution(n, array));

    process.exit();
  });

function solution(n, array) {
  let answer = 0;

  const negative = [];
  const positive = [];

  for (const num of array) {
    if (num <= 0) negative.push(num);
    else if (num === 1) answer += 1;
    else positive.push(num);
  }

  negative.sort((a, b) => a - b);
  positive.sort((a, b) => b - a);

  answer += calculatorList(negative);
  answer += calculatorList(positive);

  return answer;
}

function calculatorList(list) {
  let result = 0;

  for (let i = 0; i < list.length; i += 2) {
    if (i + 1 < list.length) {
      result += list[i] * list[i + 1];
    } else {
      result += list[i];
    }
  }

  return result;
}

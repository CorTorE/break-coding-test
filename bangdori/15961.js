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
    const [n, d, k, c] = input[0].split(" ").map(Number);
    const conveyorBelt = input.slice(1).map(Number);

    console.log(solution(k, c, conveyorBelt));

    process.exit();
  });

function solution(continoues, coupon, conveyorBelt) {
  const sushiMap = new Map();
  const circle = conveyorBelt.concat(conveyorBelt.slice(0, continoues - 1));

  // 스시 초기 설정
  for (let i = 0; i < continoues; i++) {
    addSushi(sushiMap, circle[i]);
  }

  let answer = sushiMap.has(coupon) ? sushiMap.size : sushiMap.size + 1;
  let deleteIdx = 0;

  for (let i = continoues; i < circle.length; i++) {
    // 기존에 먹은 스시 제거
    removeSushi(sushiMap, circle[deleteIdx++]);

    // 스시 추가
    addSushi(sushiMap, circle[i]);

    // 최대값 갱신
    answer = Math.max(
      answer,
      sushiMap.has(coupon) ? sushiMap.size : sushiMap.size + 1
    );
  }

  return answer;
}

function addSushi(sushiMap, sushi) {
  const count = sushiMap.get(sushi);

  if (sushiMap.has(sushi)) sushiMap.set(sushi, count + 1);
  else sushiMap.set(sushi, 1);
}

function removeSushi(sushiMap, sushi) {
  const count = sushiMap.get(sushi);

  if (count === 1) sushiMap.delete(sushi);
  else sushiMap.set(sushi, count - 1);
}

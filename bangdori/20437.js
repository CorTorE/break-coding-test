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
    const TC = +input[0];
    for (let i = 0; i < TC; i++) {
      const w = input[i * 2 + 1];
      const k = +input[i * 2 + 2];

      console.log(solution(w, k));
    }

    process.exit();
  });

function solution(w, k) {
  // 어떤 문자를 정확히 K개 포함하는 가장 짧은 연속 문자열의 길이를 구한다.
  // 어떤 문자를 정확히 K개를 포함하고, 문자열의 첫 번째와 마지막 글자가 해당 문자로 가장 긴 연속 문자열의 길이를 구한다.

  const posMap = new Map(); // 위치를 저장하기 위한 Map
  const countMap = new Map(); // 개수를 저장하기 위한 Map
  const len = [];

  for (let i = 0; i < w.length; i++) {
    setPos(posMap, w, i);
    setCount(countMap, w, i);

    const currentCount = countMap.get(w[i]);
    // 만약 k개 이상이 저장되었다면?
    if (currentCount >= k) {
      const pos = posMap.get(w[i]).slice(currentCount - k);

      len.push(pos[pos.length - 1] - pos[0] + 1);
    }
  }

  if (len.length === 0) {
    return -1;
  }

  len.sort((a, b) => a - b);
  const answer = [len[0], len[len.length - 1]];

  return answer.join(" ");
}

function setPos(posMap, w, i) {
  if (!posMap.has(w[i])) {
    posMap.set(w[i], [i]);
    return;
  }

  const newPos = [...posMap.get(w[i]), i];
  posMap.set(w[i], newPos);
}

function setCount(countMap, w, i) {
  if (!countMap.has(w[i])) {
    countMap.set(w[i], 1);
    return;
  }

  const newCount = countMap.get(w[i]) + 1;
  countMap.set(w[i], newCount);
}

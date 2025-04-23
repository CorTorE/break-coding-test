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

    const [n, m] = input[0].split(" ").map(Number);
    const roads = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, m, roads));

    process.exit();
  });

function getParent(parents, x) {
  if (parents[x] === x) return x;
  return (parents[x] = getParent(parents, parents[x]));
}

function compareParent(parents, x, y) {
  const px = getParent(parents, x);
  const py = getParent(parents, y);

  return px === py;
}

function unionParent(parents, x, y) {
  const px = getParent(parents, x);
  const py = getParent(parents, y);

  if (px < py) return (parents[py] = px);
  else parents[px] = py;
}

function solution(n, m, roads) {
  if (n === 2) return 0;

  let answer = 0;
  let conns = 0;
  const parents = Array.from({ length: n + 1 }, (_, index) => index);

  roads.sort((a, b) => a[2] - b[2]);

  // 연결
  for (let i = 0; i < m; i++) {
    const [src, dest, cost] = roads[i];

    if (!compareParent(parents, src, dest)) {
      unionParent(parents, src, dest);
      answer += cost;
      conns++;
    }

    if (conns === n - 2) break;
  }

  return answer;
}

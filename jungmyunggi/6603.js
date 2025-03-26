const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let arr = [];

rl.on("line", (line) => {
  if (Number(line) === 0) {
    solution(arr);
    rl.close();
  } else {
    arr.push(line.split(" ").map(Number));
  }
});

function getCombination(arr) {
  const result = [];
  function combinate(current, start) {
    if (current.length === 6) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      combinate(current, i + 1);
      current.pop();
    }
  }
  combinate([], 0);
  return result;
}

function solution(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(getCombination(arr[i].slice(1)));
  }

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      console.log(result[i][j].join(" "));
    }
    console.log("");
  }
}

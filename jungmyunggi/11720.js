const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");

function solution() {
  const num = input[1].split("");
  let result = 0;
  num.forEach((n, i) => {
    result += parseInt(n);
  });
  return result;
}

console.log(solution());

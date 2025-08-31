const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;

rl.on("line", (line) => {
  n = Number(line);
  solution(n);
  rl.close();
});

function solution(n) {
  if (n === 0) {
    console.log(1);
    return;
  }
  function helper(n) {
    if (n === 1) {
      return 1;
    }
    return n * helper(n - 1);
  }
  const answer = helper(n);
  console.log(answer);
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const num = input;

function solution(num) {
  const numArr = [];
  const aIndex = "a".charCodeAt();
  for (let i = 0; i < 26; i++) {
    numArr.push(-1);
  }
  for (let i = 0; i < num.length; i++) {
    const char = num[i];
    const charIndex = char.charCodeAt() - aIndex;
    if (numArr[charIndex] === -1) {
      numArr[charIndex] = i;
    }
  }
  return numArr.join(" ");
}

console.log(solution(num));

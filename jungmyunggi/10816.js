const fs = require("fs");
const input = fs
  .readFileSync("dev/stdin")
  .toString()
  .split("\n")
  .map((s) => s.trim());

const N = parseInt(input[0]);
const firstCards = input[1].split(" ").map(Number);
const M = parseInt(input[2]);
const secondCards = input[3].split(" ").map(Number);

function solution(firstCards, secondCards) {
  const docs = {};
  const output = [];
  for (const card of firstCards) {
    if (docs[card]) {
      docs[card]++;
    } else {
      docs[card] = 1;
    }
  }

  for (const find of secondCards) {
    if (docs[find]) {
      output.push(docs[find]);
    } else {
      output.push(0);
    }
  }
  return output.join(" ");
}
console.log(solution(firstCards, secondCards));

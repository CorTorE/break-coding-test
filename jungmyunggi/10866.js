const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().split("\n");

function solution() {
  const N = input[0];
  let deque = [];
  const output = [];
  for (let i = 1; i <= N; i++) {
    const instruction = input[i].trim();
    if (instruction.startsWith("push")) {
      const [, num] = instruction.split(" ");
      instruction.indexOf("front") !== -1
        ? (deque = [num, ...deque])
        : deque.push(num);
      continue;
    }
    switch (instruction) {
      case "pop_front":
        if (deque.length === 0) {
          output.push(-1);
          continue;
        }
        output.push(deque.shift());
        continue;
      case "pop_back":
        if (deque.length === 0) {
          output.push(-1);
          continue;
        }
        output.push(deque.pop());
        continue;
      case "size":
        output.push(deque.length);
        continue;
      case "empty":
        deque.length !== 0 ? output.push(0) : output.push(1);
        continue;
      case "front":
        if (deque.length === 0) {
          output.push(-1);
          continue;
        }
        output.push(deque[0]);
        continue;

      case "back":
        if (deque.length === 0) {
          output.push(-1);
          continue;
        }
        output.push(deque[deque.length - 1]);
    }
  }
  console.log(output.join("\n"));
}

solution();

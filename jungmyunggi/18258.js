const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().split("\n");

function solution() {
  const N = input[0];
  const queue = [];
  const output = [];
  let index = 0;
  for (let i = 1; i <= N; i++) {
    const instruction = input[i].trim();
    if (instruction.startsWith("push")) {
      const [, n] = instruction.split(" ");
      queue.push(n);
      continue;
    }

    switch (instruction) {
      case "pop":
        output.push(queue.length === index ? -1 : queue[index++]);
        break;
      case "size":
        output.push(queue.length - index);
        break;
      case "empty":
        output.push(queue.length === index ? 1 : 0);
        break;
      case "front":
        output.push(queue.length === index ? -1 : queue[index]);
        break;
      case "back":
        output.push(queue.length === index ? -1 : queue[queue.length - 1]);
        break;
    }
  }
  console.log(output.join(" "));
}

solution();

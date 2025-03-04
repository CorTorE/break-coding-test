const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().split("\n");

function solution() {
  const N = input[0];
  const stack = [];
  const output = [];
  for (let i = 1; i <= N; i++) {
    const temp = input[i].trim();
    if (temp.startsWith("push")) {
      const [_, n] = temp.split(" ");
      stack.push(n);
      continue;
    }
    switch (temp) {
      case "pop":
        if (stack.length === 0) {
          output.push(-1);
          break;
        }
        output.push(stack.pop());
        break;
      case "size":
        output.push(stack.length);
        break;

      case "empty":
        output.push(stack.length === 0 ? 1 : 0);
        break;
      case "top":
        if (stack.length === 0) {
          output.push(-1);
          break;
        }
        output.push(stack[stack.length - 1]);
        break;
    }
  }
  console.log(output.join("\n"));
}

solution();

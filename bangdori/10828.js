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
    const N = +input[0];
    const commands = input.splice(1);
    console.log(solution(N, commands));

    process.exit();
  });

function solution(N, commands) {
  const stack = [];
  const answer = [];

  for (let i = 0; i < N; i++) {
    switch (commands[i]) {
      case "pop":
        answer.push(stack.pop() || -1);
        break;

      case "size":
        answer.push(stack.length);
        break;

      case "empty":
        answer.push(stack.length === 0 ? 1 : 0);
        break;

      case "top":
        answer.push(stack[stack.length - 1] || -1);
        break;

      default:
        stack.push(commands[i].split(" ")[1]);
        break;
    }
  }

  return answer.join("\n");
}

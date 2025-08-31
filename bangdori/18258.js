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
    const lines = input.splice(1);
    console.log(solution(N, lines));

    process.exit();
  });

class Queue {
  constructor() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }

  push(element) {
    this.storage[this.tail] = element;
    this.tail++;
  }

  pop() {
    if (this.tail === 0) return -1;

    const removed = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;

    // Object Reset
    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
    }

    return removed;
  }

  size() {
    return this.tail - this.head;
  }

  empty() {
    return this.tail === 0 ? 1 : 0;
  }

  front() {
    return this.empty() ? -1 : this.storage[this.head];
  }

  back() {
    return this.empty() ? -1 : this.storage[this.tail - 1];
  }
}

function solution(N, lines) {
  const queue = new Queue();
  const answer = [];

  for (const line of lines) {
    const command = line.split(" ")[0];

    switch (command) {
      case "pop":
        answer.push(queue.pop());
        break;
      case "size":
        answer.push(queue.size());
        break;
      case "empty":
        answer.push(queue.empty());
        break;
      case "front":
        answer.push(queue.front());
        break;
      case "back":
        answer.push(queue.back());
        break;
      default:
        queue.push(line.split(" ")[1]);
    }
  }

  return answer.join("\n");
}

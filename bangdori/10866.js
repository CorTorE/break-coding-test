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
    const lines = input.slice(1);
    console.log(solution(N, lines));

    process.exit();
  });

class Node {
  constructor(num) {
    this.val = num;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.count = 0;
    this.head = null;
    this.rear = null;
  }

  push_front(num) {
    const node = new Node(num);

    if (this.count !== 0) {
      node.next = this.head;
      this.head.prev = node;
    } else {
      this.rear = node;
    }

    this.head = node;
    this.count++;
  }

  push_back(num) {
    const node = new Node(num);

    if (this.count !== 0) {
      node.prev = this.rear;
      this.rear.next = node;
    } else {
      this.head = node;
    }

    this.rear = node;
    this.count++;
  }

  pop_front() {
    if (this.count === 0) return -1;

    const removed = this.head;
    this.head = this.head.next;
    this.count--;

    if (this.head) this.head.prev = null;
    else this.rear = null;

    return removed.val;
  }

  pop_back() {
    if (this.count === 0) return -1;

    const removed = this.rear;
    this.rear = this.rear.prev;
    this.count--;

    if (this.rear) this.rear.next = null;
    else this.head = null;

    return removed.val;
  }

  size() {
    return this.count;
  }

  empty() {
    return this.count === 0 ? 1 : 0;
  }

  front() {
    return this.count !== 0 ? this.head.val : -1;
  }

  back() {
    return this.count !== 0 ? this.rear.val : -1;
  }
}

function solution(n, lines) {
  const deque = new Deque();
  const answer = [];

  for (const line of lines) {
    const command = line.split(" ")[0];

    if (command === "push_front") {
      deque.push_front(line.split(" ")[1]);
    } else if (command === "push_back") {
      deque.push_back(line.split(" ")[1]);
    } else if (command === "pop_front") {
      answer.push(deque.pop_front());
    } else if (command === "pop_back") {
      answer.push(deque.pop_back());
    } else if (command === "size") {
      answer.push(deque.size());
    } else if (command === "empty") {
      answer.push(deque.empty());
    } else if (command === "front") {
      answer.push(deque.front());
    } else if (command === "back") {
      answer.push(deque.back());
    }
  }

  return answer.join("\n");
}

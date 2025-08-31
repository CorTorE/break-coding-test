const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr = [];

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else {
        arr.push(line.split(" ").map(Number));
        if (arr.length === N) {
            solution(N, arr);
            rl.close();
        }
    }
});

class Heap {
    constructor() {
        this.heap = [null];
    }
    getParentIndex(index) {
        return Math.floor(index / 2);
    }
    getLeftIndex(index) {
        return index * 2;
    }
    getRightIndex(index) {
        return index * 2 + 1;
    }
    getSize() {
        return this.heap.length - 1;
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    peek() {
        return this.heap[1];
    }
    push(value) {
        this.heap.push(value);
        this.up();
    }
    up() {
        let index = this.getSize();
        while (index > 1) {
            let parent = this.getParentIndex(index);
            if (this.heap[index] < this.heap[parent]) {
                this.swap(index, parent);
                index = parent;
            } else {
                break;
            }
        }
    }
    pop() {
        if (this.getSize() === 0) return null;
        if (this.getSize() === 1) return this.heap.pop();
        const node = this.heap[1];
        const last = this.heap.pop();
        this.heap[1] = last;
        this.down();
        return node;
    }
    down() {
        let index = 1;
        while (index < this.getSize()) {
            let left = this.getLeftIndex(index);
            let right = this.getRightIndex(index);
            let min = index;

            if (left <= this.getSize() && this.heap[min] > this.heap[left]) {
                min = left;
            }
            if (right <= this.getSize() && this.heap[min] > this.heap[right]) {
                min = right;
            }
            if (min !== index) {
                this.swap(min, index);
                index = min;
            } else {
                break;
            }
        }
    }
}

function solution(N, arr) {
    arr.sort((a, b) => a[0] - b[0]);

    const reslut = new Heap();
    for (const [start, end] of arr) {
        if (reslut.getSize() > 0 && reslut.peek() <= start) {
            reslut.pop();
        }
        reslut.push(end);
    }
    console.log(reslut.getSize());
}

// 100
// 27 56
// 45 80
// 26 54
// 26 69
// 2 54
// 21 51
// 3 76
// 23 53
// 22 42
// 3 41
// 36 59
// 4 89
// 31 32
// 67 97
// 18 96
// 10 18
// 93 98
// 2 58
// 47 78
// 8 15
// 4 55
// 51 76
// 24 31
// 35 50
// 29 70
// 12 89
// 38 56
// 42 53
// 77 80
// 38 48
// 76 78
// 40 99
// 47 59
// 31 50
// 48 63
// 45 90
// 0 17
// 46 62
// 18 46
// 1 82
// 22 60
// 37 77
// 6 10
// 23 98
// 6 67
// 6 20
// 1 63
// 51 92
// 21 37
// 1 28
// 20 58
// 14 16
// 47 68
// 10 47
// 55 78
// 44 98
// 10 46
// 39 58
// 2 7
// 10 74
// 38 68
// 40 50
// 12 64
// 15 70
// 46 49
// 50 70
// 17 74
// 17 69
// 38 51
// 26 52
// 47 53
// 47 81
// 41 87
// 8 99
// 94 95
// 10 35
// 32 42
// 13 39
// 40 41
// 60 98
// 24 51
// 36 88
// 41 65
// 30 79
// 9 49
// 22 54
// 9 95
// 45 64
// 24 35
// 39 72
// 1 3
// 57 91
// 6 12
// 31 47
// 33 51
// 41 47
// 11 72
// 11 50
// 4 8
// 45 93

// 4
// 1 3
// 2 4
// 3 5
// 4 6

// 3
// 10 15
// 15 25
// 10 15

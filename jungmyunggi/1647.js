const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, M;
let arr = [];

rl.on("line", (line) => {
    if (!N && !M) {
        [N, M] = line.split(" ").map(Number);
    } else {
        arr.push(line.split(" ").map(Number));
        if (arr.length === M) {
            solution(N, M, arr);
            rl.close();
        }
    }
});

class UnionFind {
    constructor(size) {
        this.parent = Array(size + 1).fill(0);
        for (let i = 1; i <= N; i++) {
            this.parent[i] = i;
        }
    }
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    union(x, y) {
        const parentX = this.find(x);
        const parentY = this.find(y);

        if (parentX !== parentY) {
            this.parent[parentY] = parentX;
        }
    }
}

function solution(N, M, arr) {
    arr.sort((a, b) => a[2] - b[2]);
    const uf = new UnionFind(N);

    const result = [];

    for (const [start, end, cost] of arr) {
        const sParent = uf.find(start);
        const eParent = uf.find(end);

        if (sParent === eParent) {
            continue;
        }

        uf.union(start, end);
        result.push(cost);
        if (result.length === N - 1) {
            break;
        }
    }
    result.pop();

    let answer = result.reduce((acc, cur) => (acc += cur), 0);
    console.log(answer);
}

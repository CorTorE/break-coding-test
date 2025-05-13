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

function solution(N, arr) {
    arr.sort((a, b) => a[0] - b[0]);
    const temp = [];
    for (const a of arr) {
        temp.push(a[1]);
    }
    const result = Array(N).fill(1);
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < i; j++) {
            if (temp[i] > temp[j]) {
                result[i] = Math.max(result[i], result[j] + 1);
            }
        }
    }
    console.log(N - Math.max(...result));
}

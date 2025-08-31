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
        arr.push(Number(line));
        if (arr.length === N) {
            solution(N, arr);
            rl.close();
        }
    }
});

function solution(N, arr) {
    arr.sort((a, b) => a - b);
    let maxWeight = arr[0] * N;
    for (let i = 1; i < N; i++) {
        maxWeight = Math.max(arr[i] * (N - i), maxWeight);
    }
    console.log(maxWeight);
}

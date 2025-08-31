const { copyFileSync } = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr = [];

rl.on("line", (line) => {
    if (!N) {
        N = Number(line);
    } else {
        arr.push(line.split(" ").map(Number));
        if (arr.length === N) {
            solution(N, arr);
            rl.close();
        }
    }
});

function solution(N, arr) {
    if (N === 1) {
        console.log(arr[0][0]);
        return;
    }
    dp = [];
    for (let i = 0; i < N; i++) {
        const temp = [];
        for (let j = 1; j <= i + 1; j++) {
            temp.push(-Infinity);
        }
        dp.push(temp);
    }

    dp[0][0] = arr[0][0];
    dp[1][0] = arr[0][0] + arr[1][0];
    dp[1][1] = arr[0][0] + arr[1][1];

    for (let i = 2; i < N; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (j === 0) {
                dp[i][j] = dp[i - 1][j] + arr[i][j];
            } else if (j === arr[i].length - 1) {
                dp[i][j] = dp[i - 1][j - 1] + arr[i][j];
            } else {
                dp[i][j] = Math.max(
                    dp[i - 1][j] + arr[i][j],
                    dp[i - 1][j - 1] + arr[i][j]
                );
            }
        }
    }
    console.log(Math.max(...dp[N - 1]));
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;

rl.on("line", (line) => {
    N = Number(line);
    solution(N);
    rl.close();
});

function solution(N) {
    const dp = Array(N + 1).fill(0);
    dp[1] = 1;

    for (let i = 2; i < N + 1; i++) {
        let minNum = Infinity;
        let j = 1;
        while (j * j <= i) {
            minNum = Math.min(dp[i - j * j] + 1, minNum);
            j++;
        }
        dp[i] = minNum;
    }
    console.log(dp[N]);
}

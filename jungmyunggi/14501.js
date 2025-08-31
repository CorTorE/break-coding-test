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
    const dp = Array(N + 2).fill(0);

    for (let i = 1; i <= N; i++) {
        const [time, pay] = arr[i - 1];
        dp[i] = Math.max(dp[i - 1], dp[i]);

        const endDate = i + time - 1;
        if (endDate > N) continue;
        dp[endDate + 1] = Math.max(dp[endDate + 1], dp[i] + pay);
    }

    console.log(Math.max(...dp));
}

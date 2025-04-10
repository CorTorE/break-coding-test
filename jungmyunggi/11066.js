const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let T;
let N = [];
let files = [];
let TC = 0;
rl.on("line", (line) => {
    if (!T) {
        T = Number(line);
    } else if (!N[TC]) {
        N.push(Number(line));
    } else if (!files[TC]) {
        files.push(line.split(" ").map(Number));
        TC++;
    }
    if (TC === T) {
        const answer = [];
        for (let i = 0; i < T; i++) {
            const temp = solution(N[i], files[i]);
            answer.push(temp);
        }
        console.log(answer.join("\n"));
        rl.close();
    }
});

function solution(N, files) {
    const sum = [0];
    for (let i = 1; i <= N; i++) {
        sum.push(sum[i - 1] + files[i - 1]);
    }

    const dp = [];
    for (let i = 0; i < N; i++) {
        dp.push(Array(N).fill(0));
    }

    for (let len = 2; len <= N; len++) {
        for (let i = 0; i <= N - len; i++) {
            let j = i + len - 1;
            dp[i][j] = Infinity;

            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + (sum[j + 1] - sum[i]);
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    return dp[0][N - 1];
}

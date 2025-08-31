const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    const N = Number(line);
    solution(N);
    rl.close();
});

// 1. dp 배열은 이차원 배열로 구성
// 2. dp[i][0~9]자리값을 넣음
// 3. 끝자리가 0이라면 다음 가능한 수는 1 한개
// 4. 끝자리가 9라면 다음 가능한 수는 8 한개
// 5. 나머지는 2개씩가짐
// 6. dp[i-1][각 자리]를 확인 후 0이면 dp[i][1]에 1증가
// 7. `` 9면 dp[i][8]에 1증가
// 8. `` 나머지는 dp[i][j-1], j+1에 1씩증가
function solution(N) {
    const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

    for (let i = 1; i < 10; i++) {
        dp[1][i] = 1;
    }

    for (let i = 2; i <= N; i++) {
        for (let j = 0; j <= 9; j++) {
            if (j === 0) {
                dp[i][j] += dp[i - 1][1];
                continue;
            }
            if (j === 9) {
                dp[i][j] += dp[i - 1][8];
                continue;
            }
            dp[i][j] += dp[i - 1][j - 1] % 1_000_000_000;
            dp[i][j] += dp[i - 1][j + 1] % 1_000_000_000;
        }
    }
    const answer = dp[N].reduce((a, b) => (a + b) % 1_000_000_000, 0);
    console.log(answer);
}

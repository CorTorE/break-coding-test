const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, M;
let map = [];

rl.on("line", (line) => {
    if (!N && !M) {
        [N, M] = line.split(" ").map(Number);
    } else {
        map.push(line.split("").map(Number));
        if (map.length === N) {
            const answer = solution(N, M, map);
            console.log(answer);
            rl.close();
        }
    }
});
const d = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

function solution(N, M, map) {
    const queue = [];
    let queueIndex = 0;
    const visited = [];
    // 중복방지, [부수고온적 있음, 안부수고 온적 있음]
    for (let i = 0; i < N; i++) {
        const row = [];
        for (let j = 0; j < M; j++) {
            row.push([false, false]);
        }
        visited.push(row);
    }
    queue.push([0, 0, 1, false]); // row, col, dist, canBreak => false면 부술 수 있다. true면 부술 수 없다
    visited[0][0][1] = true;
    while (queue.length !== queueIndex) {
        const [currentRow, currentCol, currentDist, canBreak] =
            queue[queueIndex++];
        // 현재 위치가 도착지라면
        if (currentRow === N - 1 && currentCol === M - 1) {
            return currentDist;
        }
        for (const [dr, dc] of d) {
            const newRow = dr + currentRow;
            const newCol = dc + currentCol;
            if (newRow < 0 || newRow >= N) continue;
            if (newCol < 0 || newCol >= M) continue;
            // 벽이라면
            if (map[newRow][newCol] === 1) {
                if (!canBreak && !visited[newRow][newCol][1]) {
                    visited[newRow][newCol][1] = true;
                    queue.push([newRow, newCol, currentDist + 1, true]);
                }

                // // 벽인데 부술수없다면 넘기기
                // if (canBreak === true) continue;
                // // 벽인데 부술수 있고 안부순상태로 온적이 있다면 넘기기
                // if (visited[newRow][newCol][1] === true) continue;
                // // 벽인데 부술수 있고 안부순 상태로 온적이 없다면 부수고 가기
                // // 부수고 넘어간적 있다고 방문처리
            }
            // 길이라면
            else if (map[newRow][newCol] === 0) {
                // 부술수있고 , 부수고온적이 있다면(이건 말이안댐)
                // 못부수고 안부수고온적이 있다면 (이거도 말이안댐)
                // 부술수있고, 안부수고온적이 있다면
                const flag = canBreak === false ? 1 : 0;
                if (!visited[newRow][newCol][flag]) {
                    visited[newRow][newCol][flag] = true;
                    queue.push([newRow, newCol, currentDist + 1, canBreak]);
                }
            }
        }
    }
    return -1;
}

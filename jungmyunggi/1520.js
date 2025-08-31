const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let M, N;
let map = [];

rl.on("line", (line) => {
    if (!M && !N) {
        [M, N] = line.split(" ").map(Number);
    } else {
        map.push(line.split(" ").map(Number));
        if (map.length === M) {
            solution(M, N, map);
            rl.close();
        }
    }
});

const d = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

function solution(M, N, map) {
    const cMap = [];
    for (let i = 0; i < M; i++) {
        cMap.push(Array(N).fill(-1));
    }

    function dfs(x, y) {
        if (x === M - 1 && y === N - 1) return 1;
        if (cMap[x][y] !== -1) return cMap[x][y];

        cMap[x][y] = 0;

        for (const [dr, dc] of d) {
            const nr = x + dr;
            const nc = y + dc;

            if (nr >= 0 && nr < M && nc >= 0 && nc < N) {
                if (map[nr][nc] < map[x][y]) {
                    cMap[x][y] += dfs(nr, nc);
                }
            }
        }
        return cMap[x][y];
    }
    console.log(dfs(0, 0));
}

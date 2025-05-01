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
        map.push(line.split(" ").map(Number));
        if (map.length === N) {
            solution(N, M, map);
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
// map에서 하나씩 읽어가면서 2변이 0인 치즈 인덱스 저장
// 저장된 인덱스의 치즈 0으로 바꾸기
// 몇번하는지 확인
// 테두리가 무조건 0이므로 안녹고 계속 있는 경우는 없음

// 외부공기 / 내부공기 나눠야함
// 외부공기의 경우 무조건 0,0과 연결되어있음
// 0,0에서 출발해서 도달할수있는 모든 경로 2로 바꿈 -> 2가 외부공기
function solution(N, M, map) {
    let answer = 0;
    while (true) {
        map[0][0] = 2;
        const queue = [[0, 0]];
        let queueIndex = 0;
        while (queue.length !== queueIndex) {
            const [cr, cc] = queue[queueIndex++];
            for (const [dr, dc] of d) {
                const newRow = cr + dr;
                const newCol = cc + dc;
                if (
                    newRow < N &&
                    newCol < M &&
                    newRow >= 0 &&
                    newCol >= 0 &&
                    map[newRow][newCol] === 0
                ) {
                    map[newRow][newCol] = 2;
                    queue.push([newRow, newCol]);
                }
            }
        }
        const temp = [];
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < M; col++) {
                if (map[row][col] === 1) {
                    let count = 0;
                    for (const [dr, dc] of d) {
                        if (map[row + dr][col + dc] === 2) {
                            count++;
                            if (count === 2) {
                                break;
                            }
                        }
                    }
                    if (count === 2) {
                        temp.push([row, col]);
                    }
                }
            }
        }
        if (temp.length === 0) break;
        for (const [r, c] of temp) {
            map[r][c] = 0;
        }
        answer++;
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < M; col++) {
                if (map[row][col] === 2) {
                    map[row][col] = 0;
                }
            }
        }
    }
    console.log(answer);
}

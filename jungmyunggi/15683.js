// 1 -> 상/하/좌/우 바라봄
// 2 -> 좌우 / 상하만 바라봄
// 3 -> 상좌/ 상우/ 하좌/ 하우 바라봄
// 4 -> 상좌우/ 하좌우 바라봄
// 5 -> 상하좌우 바라봄
// -------------------------------------
// 1 -> 상만봄, 7 -> 하만봄, 8 -> 우만봄, 9 -> 좌만봄
// 2 -> 좌우만봄, 10 -> 상하만봄
// 3 -> 상우만 봄, 11 -> 상좌만 봄, 12 -> 하우만 봄, 13 -> 하좌만 봄
// 4 -> 상좌우만 봄, 14 -> 하좌우만 봄, 15 상하우만 봄, 16 상하좌만봄
// 5 -> 상하좌우 봄
// -------------------------------------
// 1번을 다 모아서 1,7,8,9로 바꿔서 모든 경우의 수,
// 2번을 다 모아서 2,10로 바꿔서 모든 경우의 수,
// 3번을 다 모아서 3,11,12,13로 바꿔서 모든 경우의 수,
// 4번을 다 모아서 4,14,15,16로 바꿔서 모든 경우의 수
// 5번은 그대로
// -------------------------------------

// 경우의수 대략 400만 가지
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
const dict = {
    1: [1, 7, 8, 9],
    2: [2, 10],
    3: [3, 11, 12, 13],
    4: [4, 14, 15, 16],
    5: [5],
};

// 여기서 모든 경우의 수를 다 구한다음
function getCases(arr) {
    if (arr.length === 0) {
        return [];
    }
    let result = [];
    const [firstRow, firstCol, firstKind] = arr[0];
    for (const f of dict[firstKind]) {
        result.push([[firstRow, firstCol, f]]);
    }
    // [[1],[7],[8],[9]]가 있을 때, 다음 들어오는 cctv의 종류를 보고 길이만큼 복사, 뒤에 하나씩 껴주기
    for (let i = 1; i < arr.length; i++) {
        const [row, col, kind] = arr[i];
        const dictOfKind = dict[kind];
        const temp = [];
        for (const newKind of dictOfKind) {
            for (const res of result) {
                temp.push([...res, [row, col, newKind]]);
            }
        }
        result = [...temp];
    }
    return result;
}
// 여기서 받아와서 경우의 수에 대한 사각지대 검사
function changeMap(map, N, M) {
    for (let row = 0; row < N; row++)
        for (let col = 0; col < M; col++) {
            switch (map[row][col]) {
                case 1:
                    for (let i = row; i >= 0; i--) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    break;
                case 7:
                    for (let i = row; i < N; i++) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    break;
                case 8:
                    for (let i = col; i < M; i++) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 9:
                    for (let i = col; i >= 0; i--) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 2:
                    for (let i = col; i >= 0; i--) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    for (let i = col; i < M; i++) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 10:
                    for (let i = row; i >= 0; i--) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = row; i < N; i++) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    break;
                case 3:
                    for (let i = row; i >= 0; i--) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i < M; i++) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 11:
                    for (let i = row; i >= 0; i--) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i >= 0; i--) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 12:
                    for (let i = row; i < N; i++) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i < M; i++) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 13:
                    for (let i = row; i < N; i++) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i >= 0; i--) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 4:
                    for (let i = row; i >= 0; i--) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i >= 0; i--) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    for (let i = col; i < M; i++) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 14:
                    for (let i = row; i < N; i++) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i >= 0; i--) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    for (let i = col; i < M; i++) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;

                case 15:
                    for (let i = row; i < N; i++) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = row; i >= 0; i--) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i < M; i++) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                case 16:
                    for (let i = row; i < N; i++) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = row; i >= 0; i--) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i >= 0; i--) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;

                case 5:
                    for (let i = row; i >= 0; i--) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = row; i < N; i++) {
                        if (map[i][col] === 6) break;
                        if (map[i][col] === 0) map[i][col] = "#";
                    }
                    for (let i = col; i >= 0; i--) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    for (let i = col; i < M; i++) {
                        if (map[row][i] === 6) break;
                        if (map[row][i] === 0) map[row][i] = "#";
                    }
                    break;
                default:
                    break;
            }
        }

    return map;
}

function getSafeZone(map) {
    let count = 0;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (map[i][j] === 0) {
                count++;
            }
        }
    }
    return count;
}
// 최소값을 구하면 됨
function solution(N, M, map) {
    // row, col, cctv종류
    const cctvs = [];
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < M; col++) {
            if (map[row][col] !== 0 && map[row][col] !== 6) {
                cctvs.push([row, col, map[row][col]]);
            }
        }
    }
    const cases = getCases(cctvs);
    if (cases.length === 0) {
        console.log(getSafeZone(map));
        return;
    }
    let answer = Infinity;
    for (const cas of cases) {
        const cMap = map.map((row) => [...row]);
        for (const cctv of cas) {
            const [row, col, kind] = cctv;
            cMap[row][col] = kind;
        }
        const newMap = changeMap(cMap, N, M);
        const count = getSafeZone(newMap);
        if (count < answer) {
            answer = count;
        }
    }
    console.log(answer);
}

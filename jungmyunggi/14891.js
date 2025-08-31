const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let arr = [];
let K;
let rotate = [];

rl.on("line", (line) => {
    if (arr.length !== 4) {
        arr.push(line.split("").map(Number));
    } else if (!K) {
        K = Number(line);
    } else {
        rotate.push(line.split(" ").map(Number));
        if (rotate.length === K) {
            solution(arr, K, rotate);
            rl.close();
        }
    }
});

// rotate에서 몇번째, 무슨방향 확인
// 양 옆에 톱니 회전
//  맞닿는 곳은 2번, 6번 인덱스들임
// 그 옆에 톱니 회전
// 반복

function rotateSawtooth(sawtooth, d) {
    if (d === 1) {
        const temp = sawtooth.pop();
        const newSawtooth = [temp, ...sawtooth];
        return newSawtooth;
    }
    const temp = sawtooth.shift();
    const newSawtooth = [...sawtooth, temp];
    return newSawtooth;
}

function solution(arr, K, rotate) {
    for (const r of rotate) {
        const [order, direction] = r;

        // 0-> 회전x, 1-> 시계, -1->반시계
        const directions = [0, 0, 0, 0];

        directions[order - 1] = direction;

        // 왼쪽
        for (let i = order - 1; i > 0; i--) {
            if (arr[i][6] !== arr[i - 1][2]) {
                directions[i - 1] = -directions[i];
            } else {
                break;
            }
        }
        // 오른쪽
        for (let i = order - 1; i < 3; i++) {
            if (arr[i][2] !== arr[i + 1][6]) {
                directions[i + 1] = -directions[i];
            } else {
                break;
            }
        }

        // 회전
        for (let i = 0; i < 4; i++) {
            if (directions[i] !== 0) {
                arr[i] = rotateSawtooth(arr[i], directions[i]);
            }
        }
    }
    let answer = 0;

    for (let i = 0; i < 4; i++) {
        const temp = arr[i][0];
        answer += temp * Math.pow(2, i);
    }
    console.log(answer);
}

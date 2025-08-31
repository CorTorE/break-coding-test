const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 크레인 N대가 있음
// 1분에 상자 1개씩 실을수있음
// 모든 크레인은 동시에 움직임
// 크레인에는 무게제한이 있음
// 모든 상자를 실을때 걸리는 최소시간 구하기

let N;
let cranes;
let M;
let boxes;

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else if (!cranes) cranes = line.split(" ").map(Number);
    else if (!M) M = Number(line);
    else {
        boxes = line.split(" ").map(Number);
        solution(N, cranes, M, boxes);
        rl.close();
    }
});

function solution(N, cranes, M, boxes) {
    cranes.sort((a, b) => b - a);
    boxes.sort((a, b) => b - a);

    if (cranes[0] < boxes[0]) {
        console.log(-1);
        return;
    }

    let time = 0;
    let visited = Array(M).fill(false);
    let count = 0;

    while (count < M) {
        let boxIndex = 0;

        for (let i = 0; i < N; i++) {
            while (boxIndex < M) {
                if (!visited[boxIndex] && cranes[i] >= boxes[boxIndex]) {
                    visited[boxIndex] = true;
                    count++;
                    boxIndex++;
                    break;
                }
                boxIndex++;
            }
        }
        time++;
    }
    console.log(time);
}

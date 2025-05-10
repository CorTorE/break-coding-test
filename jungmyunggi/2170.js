const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr = [];

rl.on("line", (line) => {
    if (!N) {
        N = Number(line);
    } else {
        arr.push(line.split(" ").map(Number));
        if (arr.length === N) {
            solution(N, arr);
            rl.close();
        }
    }
});

// 처음 선을 긋는다
// 1. 다음 들어오는선의 시작지점이 그여진 선안에 있고 종료지점이 선 밖에 있으면 종료지점을 바꿔서 긋는다.
// 2. 다음 들어오는선의 시작지점이 그여진 선 밖에 있고 종료지점이 선 안에 있으면 시작지점을 바꿔 다시 긋는다.
// 3. 다음 들어오는 선의 시작지점이 그여진 선 밖에 있고 종료지점이 선 밖에 있으면 이전의 선은 폐기하고 다시 긋는다.
// 4. 다음 들어오는 선의 시작지점, 종료지점이 모두 선안에 있으면 무시한다.

// 5. 다음 들어오는 선과 현재 그어진 선이 접점이 없다면 (그여진선의 종료지점보다 시작지점이 크거나, 시작지점보다 종료지점이 작다면) 새로운선을 추가한다.
// => 시작지점 기준, 종료지점 기준 정렬이 필요함
function solution(N, arr) {
    arr.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    });
    let start = arr[0][0];
    let end = arr[0][1];
    let lineLength = end - start;
    let lengthArr = [];
    let lineCount = 1;
    for (let i = 1; i < N; i++) {
        const [ts, te] = arr[i];
        // 1
        if (ts >= start && ts <= end && te >= end) {
            end = te;
            lineLength = end - start;
        }
        // 2
        else if (ts <= start && te <= end && ts >= start) {
            start = ts;
            lineLength = end - start;
        }
        // 3
        else if (ts <= start && te >= end) {
            start = ts;
            end = te;
            lineLength = end - start;
        }
        // 4
        else if (ts >= start && te <= end) {
            continue;
        }
        // 완전 다른 선이 나온다면?
        else {
            lengthArr.push(lineLength);
            lineCount++;
            start = ts;
            end = te;
            lineLength = end - start;
        }
    }
    if (lineCount === lengthArr.length + 1) {
        lengthArr.push(lineLength);
    }

    const answer = lengthArr.reduce((ans, cur) => ans + cur, 0);
    console.log(answer);
}

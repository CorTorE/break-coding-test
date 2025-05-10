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
        arr.push(Number(line));
        if (arr.length === N) {
            solution(N, arr);
            rl.close();
        }
    }
});

// 1. arr 정렬
// 2. 양수중 큰수끼리 묶기 -> 1보다 큰경우
// 3. 0은 무시
// 4. 음수중 작은수끼리 묶기
// 5. 묶은거 다 곱하고 나머지 다 더하기
function solution(N, arr) {
    const plusArr = arr.filter((num) => {
        return num > 0;
    });
    plusArr.sort((a, b) => a - b);
    const minusArr = arr.filter((num) => {
        return num <= 0;
    });
    minusArr.sort((a, b) => b - a);

    const result = [];
    while (true) {
        if (plusArr.length === 0) {
            break;
        }
        const temp1 = plusArr.pop();
        if (plusArr.length === 0) {
            result.push(temp1);
            break;
        }
        const temp2 = plusArr.pop();
        if (temp1 * temp2 >= temp1 + temp2) result.push(temp1 * temp2);
        else {
            result.push(temp1);
            result.push(temp2);
        }
    }

    while (true) {
        if (minusArr.length === 0) {
            break;
        }
        const temp1 = minusArr.pop();
        if (minusArr.length === 0) {
            result.push(temp1);
            break;
        }
        const temp2 = minusArr.pop();
        result.push(temp1 * temp2);
    }
    let answer = 0;
    for (const n of result) {
        answer += n;
    }
    console.log(answer);
}

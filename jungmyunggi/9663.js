const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;

rl.on("line", (line) => {
    N = Number(line);
    solution(N);
    rl.close();
});

function getAnswer(arr, N) {
    let result = 0;

    function get(cMap, count) {
        if (count === N) {
            result += 1;
            return;
        }
        let row = count;
        for (let col = 0; col < N; col++) {
            if (cMap[row][col] !== 0) continue;
            const newMap = cMap.map((r) => [...r]);
            changeMap(newMap, row, col, N, 1);
            get(newMap, count + 1);
        }
    }
    get(arr, 0);
    return result;
}

function changeMap(map, row, col, N, num) {
    const r = row;
    const c = col;
    let tempR = r;
    let tempC = c;
    // 1 1
    while (tempR < N && tempC < N) {
        map[tempR++][tempC++] = num;
    }
    tempR = r;
    tempC = c;
    // -1 -1
    while (tempR >= 0 && tempC >= 0) {
        map[tempR--][tempC--] = num;
    }
    tempR = r;
    tempC = c;
    //-1 1
    while (tempR >= 0 && tempC < N) {
        map[tempR--][tempC++] = num;
    }
    tempR = r;
    tempC = c;
    while (tempR < N && tempC >= 0) {
        map[tempR++][tempC--] = num;
    }
    // r
    for (let i = 0; i < N; i++) {
        map[i][c] = num;
    }
    //c
    for (let i = 0; i < N; i++) {
        map[r][i] = num;
    }
}

function solution(N) {
    const map = [];
    for (let i = 0; i < N; i++) {
        map.push(Array(N).fill(0));
    }
    const a = getAnswer(map, N);
    console.log(a);

    // if (N === 1) console.log(1);
    // else if (N === 2) console.log(0);
    // else if (N === 3) console.log(0);
    // else if (N === 4) console.log(2);
    // else if (N === 5) console.log(10);
    // else if (N === 6) console.log(4);
    // else if (N === 7) console.log(40);
    // else if (N === 8) console.log(92);
    // else if (N === 9) console.log(352);
    // else if (N === 10) console.log(724);
    // else if (N === 11) console.log(2680);
    // else if (N === 12) console.log(14200);
    // else if (N === 13) console.log(73712);
    // else if (N === 14) console.log(365596);
    // else if (N === 15) console.log(2279184);
}

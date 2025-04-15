const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, D;
let load = [];

rl.on("line", (line) => {
    if (!N && !D) {
        [N, D] = line.split(" ").map(Number);
    } else {
        load.push(line.split(" ").map(Number));

        if (load.length === N) {
            solution(N, D, load);
            rl.close();
        }
    }
});

function backtrack(arr, D) {
    const result = [];

    function helper(current, index, cost) {
        if (current >= D) {
            result.push(cost);
        }
        for (let i = index; i <= arr.length; i++) {
            if (i === arr.length) {
                if (current < D) {
                    result.push(cost + (D - current));
                }
                break;
            }
            const [tstart, tend, tcost] = arr[i];
            // 곂치면 못감
            if (current > tstart) continue;
            // 다음 지름길 출발지까지 거리
            const temp = tstart - current;
            helper(tend, i + 1, cost + tcost + temp);
        }
    }
    helper(0, 0, 0);
    return result;
}

function solution(N, D, load) {
    const ableLoad = [];

    for (const l of load) {
        const [start, end, cost] = l;
        if (cost > end - start) {
            continue;
        }
        if (end > D) {
            continue;
        }
        ableLoad.push(l);
    }

    ableLoad.sort((a, b) => {
        if (a[0] === b[0]) {
            a[1] - b[1];
        }
        return a[0] - b[0];
    });

    const answer = backtrack(ableLoad, D);

    console.log(Math.min(...answer));
}

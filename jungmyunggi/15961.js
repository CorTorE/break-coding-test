const { copyFileSync } = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, d, k, c;
let sushi = [];

rl.on("line", (line) => {
    if (!N && !d && !k && !c) {
        [N, d, k, c] = line.split(" ").map(Number);
    } else {
        sushi.push(Number(line));
        if (sushi.length === N) {
            solution(N, d, k, c, sushi);
            rl.close();
        }
    }
});

// 초밥 연속으로 k개 선택
// k개중 중복 제외해서 저장
// 젤 긴거 선택
function solution(N, d, k, c, sushi) {
    const result = [];
    const map = new Map();
    let left = 0;
    for (let i = 0; i < k; i++) {
        const s = sushi[i];
        if (map.has(s)) {
            map.set(s, map.get(s) + 1);
        } else {
            map.set(s, 1);
        }
    }
    result.push([map.size, map.has(c)]);
    for (let i = k; i < N + k - 1; i++) {
        const out = sushi[left++ % N];
        const enter = sushi[i % N];
        const outVlaue = map.get(out);
        if (outVlaue === 1) {
            map.delete(out);
        } else {
            map.set(out, map.get(out) - 1);
        }
        if (map.has(enter)) {
            map.set(enter, map.get(enter) + 1);
        } else {
            map.set(enter, 1);
        }

        result.push([map.size, map.has(c)]);
    }

    result.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return b[0] - a[0];
    });

    console.log(result[0][1] === false ? result[0][0] + 1 : result[0][0]);
}

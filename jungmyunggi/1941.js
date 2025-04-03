// 7명의 학생들로 구성되어야함
// 자리는 가로 세로로 인접해있어야함
// 최소 4명 이상이 S여야함

// 전체 row, col의 7개 조합을 찾고
// dfs를 이용해서 인접한 조합만 놔두고
// 남은 조합에서 S개수가 4이상인 조합의개수를 출력
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let map = [];

rl.on("line", (line) => {
    map.push(line.split(""));
    if (map.length === 5) {
        solution(map);
        rl.close();
    }
});

const d = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

function getCombination(arr) {
    const result = [];

    function combinate(current, start) {
        if (current.length === 7) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < 25; i++) {
            current.push(arr[i]);
            combinate(current, i + 1);
            current.pop();
        }
    }
    combinate([], 0);
    return result;
}

// 연결된 arr인지 확인해야함
// 5*5 map을 만들고
// arr에 표시된부분 1로 바꾸고
// 시작 위치부터 종료위치까지 2로 바꾸고나서
// 1이 존재한다면 연결된게 아님
function bfs(arr) {
    arr.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    });
    const map = [];
    for (let i = 0; i < 5; i++) {
        map.push(Array(5).fill(0));
    }
    for (const a of arr) {
        map[a[0]][a[1]] = 1;
    }
    const [sr, sc] = arr[0];
    const queue = [];
    let queueIndex = 0;

    queue.push([sr, sc]);
    map[sr][sc] = 2;
    while (queue.length !== queueIndex) {
        const [cr, cc] = queue[queueIndex++];
        for (const [dr, dc] of d) {
            const newRow = dr + cr;
            const newCol = dc + cc;
            if (newRow < 0 || newRow >= 5) continue;
            if (newCol < 0 || newCol >= 5) continue;
            if (map[newRow][newCol] === 1) {
                map[newRow][newCol] = 2;
                queue.push([newRow, newCol]);
            }
        }
    }
    const set = new Set();
    for (const row of map) {
        for (const cell of row) {
            set.add(cell);
        }
    }
    if (set.has(1)) {
        return false;
    } else {
        return true;
    }
}

function solution(map) {
    const arr = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            arr.push([i, j]);
        }
    }
    // 7개 자리 골라서 가능한 모든 경우 = coms
    const coms = getCombination(arr);

    // coms에서 서로 연결된 자리만 가져옴 = able
    const able = [];
    for (const c of coms) {
        if (bfs(c)) {
            able.push(c);
        }
    }

    let count = 0;

    // able에서 S가 4이상인거만 저장 = count
    for (const a of able) {
        const realAble = a.reduce(
            (acc, [r, c]) => acc + (map[r][c] === "S" ? 1 : 0),
            0
        );
        if (realAble >= 4) count++;
    }
    console.log(count);
}

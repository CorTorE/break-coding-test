const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr;
let K;

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else if (!arr) arr = line.split(" ").map(Number);
    else {
        K = Number(line);
        solution(N, arr, K);
        rl.close();
    }
});

function solution(N, arr, K) {
    let root = -1;
    const tree = [];
    for (let i = 0; i < N; i++) {
        tree.push([]);
    }
    for (let i = 0; i < N; i++) {
        if (arr[i] === -1) root = i;
        else {
            const parent = arr[i];
            tree[parent].push(i);
        }
    }
    function deleteNode(K) {
        arr[K] = -2;
        for (const k of tree[K]) {
            deleteNode(k);
        }
    }

    if (K === root) {
        console.log(0);
        return;
    }

    deleteNode(K);

    let count = 0;
    for (let i = 0; i < N; i++) {
        if (arr[i] === -2) continue;

        let flag = false;
        for (const c of tree[i]) {
            if (arr[c] !== -2) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            count++;
        }
    }
    console.log(count);
}

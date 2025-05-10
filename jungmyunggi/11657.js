const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, M;
let from, to, cost;
const graph = [];
rl.on("line", (line) => {
    if (!N && !M) {
        [N, M] = line.split(" ").map(Number);
    } else {
        [from, to, cost] = line.split(" ").map(Number);
        graph.push([from, to, cost]);
        if (graph.length === M) {
            solution(N, M, graph);
            rl.close();
        }
    }
});

function solution(N, M, graph) {
    if (N === 1) {
        console.log(-1);
        return;
    }
    const dist = Array(N + 1).fill(Infinity);
    dist[0] = -1;
    dist[1] = 0;
    // 벨만포드로 최단거리 갱신
    for (let i = 1; i <= N; i++) {
        for (const [f, t, c] of graph) {
            if (dist[t] > dist[f] + c) dist[t] = dist[f] + c;
        }
    }
    // 음수사이클 있나 확인
    for (const [f, t, c] of graph) {
        if (dist[f] !== Infinity && dist[t] > dist[f] + c) {
            console.log(-1);
            return;
        }
    }

    dist.sort((a, b) => a - b);
}

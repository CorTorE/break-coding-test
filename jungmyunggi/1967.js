// 리프노드부터 다른 리프노드까지 최대 거리를 구하는 문제
// 리프노드가 뭔지 뽑고 그거끼리의 거리를 알아보면 댐

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n;
let edges = [];

rl.on("line", (line) => {
    if (!n) n = Number(line);
    else edges.push(line.split(" ").map(Number));
}).on("close", () => {
    solution(n, edges);
    process.exit();
});

function getDist(n, start, graph) {
    const stack = [];
    const visited = [];
    for (let i = 0; i <= n; i++) {
        visited.push(false);
    }
    stack.push([start, 0]);
    visited[start] = true;

    let farNode = start;
    let maxDist = 0;

    while (stack.length !== 0) {
        const [node, dist] = stack.pop();
        if (dist > maxDist) {
            farNode = node;
            maxDist = dist;
        }
        for (const [next, nextDist] of graph[node]) {
            if (visited[next]) continue;
            visited[next] = true;
            stack.push([next, nextDist + dist]);
        }
    }

    return [farNode, maxDist];
}

function solution(n, edges) {
    const graph = [];
    for (let i = 0; i <= n; i++) {
        graph.push([]);
    }
    for (const [from, to, dist] of edges) {
        graph[from].push([to, dist]);
        graph[to].push([from, dist]);
    }

    const [fNode, fDist] = getDist(n, 1, graph);
    const [sNode, sDist] = getDist(n, fNode, graph);

    console.log(sDist);
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N, S;
let nums;

rl.on("line", (line) => {
    if (!N && !S) {
        [N, S] = line.split(" ").map(Number);
    } else {
        nums = line.split(" ").map(Number);
        solution(N, S, nums);
        rl.close();
    }
});

function solution(N, S, nums) {
    const prefixSum = [0];

    for (let i = 0; i < N; i++) {
        prefixSum[i + 1] = prefixSum[i] + nums[i];
    }
    let left = 0;
    let right = 1;
    let temp = Infinity;

    while (right <= N) {
        if (prefixSum[right] - prefixSum[left] < S) {
            right++;
        }
        if (prefixSum[right] - prefixSum[left] >= S) {
            temp = Math.min(temp, right - left);
            left++;
        }
    }

    console.log(temp === Infinity ? 0 : temp);
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr;

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else {
        arr = line.split(" ").map(Number);
        solution(N, arr);
        rl.close();
    }
});

// N은 3개이상 5000개 이하
// 포인터 3개를 만듬
// 각각 left, right, i
// i를 0부터 끝까지
// left는 i+1부터 right를 만날때 까지
// right n-1부터 left를 만날때 까지
function solution(N, arr) {
    arr.sort((a, b) => a - b);
    let temp = Infinity;
    let answer = [0, 1, 2];
    for (let i = 0; i < arr.length - 2; i++) {
        let left = i + 1;
        let right = arr.length - 1;

        while (left < right) {
            const c = arr[i];
            const l = arr[left];
            const r = arr[right];
            const tempSum = c + l + r;
            if (tempSum === 0) {
                console.log(arr[i], arr[left], arr[right]);
                return;
            }
            if (temp > Math.abs(tempSum)) {
                temp = Math.abs(tempSum);
                answer = [arr[i], arr[left], arr[right]];
            }

            if (tempSum > 0) {
                right--;
            } else if (tempSum < 0) {
                left++;
            }
        }
    }
    console.log(answer.join(" "));
}

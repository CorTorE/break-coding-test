const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let nums;

rl.on("line", (line) => {
    if (!N) {
        N = Number(line);
    } else {
        nums = line.split(" ").map(Number);
        solution(N, nums);
        rl.close();
    }
});

function bst(arr, n) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] < n) {
            low = mid + 1;
        } else if (arr[mid] > n) {
            high = mid - 1;
        } else if (arr[mid] === n) {
            return mid;
        }
    }
    return low;
}

function solution(N, nums) {
    const arr = [nums.shift()];
    for (const n of nums) {
        const arrNum = arr[arr.length - 1];
        if (arrNum < n) {
            arr.push(n);
        } else {
            const index = bst(arr, n);
            arr[index] = n;
        }
    }
    console.log(arr.length);
}

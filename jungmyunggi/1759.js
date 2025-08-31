const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let L, C;
let arr;
rl.on("line", (line) => {
    if (!L && !C) [L, C] = line.split(" ").map(Number);
    else {
        arr = line.split(" ");
        solution(L, C, arr);
        rl.close();
    }
});

const vowel = ["a", "e", "i", "o", "u"];
function getCombination(arr, k) {
    const result = [];
    function combinate(current, start) {
        if (current.length === k) {
            let v = 0; // 모음
            let c = 0; // 자음
            for (const char of current) {
                if (vowel.includes(char)) {
                    v++;
                } else {
                    c++;
                }
            }
            if (v > 0 && c > 1) result.push([...current]);
            return;
        }
        for (let s = start; s < arr.length; s++) {
            current.push(arr[s]);
            combinate(current, s + 1);
            current.pop();
        }
    }
    combinate([], 0);
    return result;
}

function solution(L, C, arr) {
    arr.sort();
    const temp = getCombination(arr, L);
    const answer = [];
    for (let s of temp) {
        answer.push(s.join(""));
    }
    answer.sort();
    console.log(answer.join("\n"));
}

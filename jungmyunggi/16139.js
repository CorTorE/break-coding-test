const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");

const S = input[0];
const N = Number(input[1]);
const arr = input.slice(2);

function solution(S, N, arr) {
    const prefix = Array(S.length)
        .fill(null)
        .map(() => Array(26).fill(0));

    for (let i = 0; i < S.length; i++) {
        const c = S.charCodeAt(i) - 97;
        if (i === 0) prefix[i][c] = 1;
        else {
            for (let j = 0; j < 26; j++) {
                prefix[i][j] = prefix[i - 1][j];
            }
            prefix[i][c] += 1;
        }
    }

    const result = [];

    for (const line of arr) {
        const [c, lStr, rStr] = line.split(" ");
        const l = Number(lStr);
        const r = Number(rStr);
        const index = c.charCodeAt(0) - 97;

        if (l === 0) result.push(prefix[r][index]);
        else result.push(prefix[r][index] - prefix[l - 1][index]);
    }

    console.log(result.join("\n"));
}

solution(S, N, arr);

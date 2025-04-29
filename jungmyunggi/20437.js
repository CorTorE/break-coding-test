const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let T;
let wArr = [];
let kArr = [];
let c = 0;
rl.on("line", (line) => {
    if (!T) T = Number(line);
    else if (!wArr[c]) wArr.push(line.trim());
    else if (!kArr[c]) {
        kArr.push(Number(line));
        c++;
        if (c === T) {
            solution(T, wArr, kArr);
            rl.close();
        }
    }
});
// superaquatornado
// 2

// abaaaba
// 3

// a = [0 2,3,4,6]
// b = [1,5]
// 1. map 생성
// 1-1 map안에는 문자:[인덱스, 최소길이, 최대길이]로 저장
// 2. 문자열을 하나씩 따라감
// 3. 문자열을 따라가면서 각 문자열이 처음 나온 지점을 기억
// 4. 또 그 문자가 나오면 인덱스에 하나 더 저장
// 5. 만약 인덱스의 크기가 K가되면 그 안에서 최대값-최소값 해서 최대/최소길이 갱신
// 6. 마지막에 map을 다 돌면서 map전체의 최소길이, map전체의 최대길이 탐색
// 7. 무한대 값이 있을 경우 -1 출력
function solution(T, wArr, kArr) {
    for (let test = 0; test < T; test++) {
        const W = wArr[test];
        const K = kArr[test];

        const docs = new Map();
        for (let i = 0; i < W.length; i++) {
            const c = W[i];
            if (docs.get(c)) {
                const [prevIndex, prevMax, prevMin] = docs.get(c);
                let currentIndex = [...prevIndex, i];
                let currentMax = prevMax;
                let currentMin = prevMin;
                if (currentIndex.length >= K) {
                    const temp =
                        currentIndex[currentIndex.length - 1] -
                        currentIndex[currentIndex.length - K] +
                        1;
                    currentMax = Math.max(currentMax, temp);
                    currentMin = Math.min(currentMin, temp);
                }
                docs.set(c, [currentIndex, currentMax, currentMin]);
            } else {
                if (K === 1) {
                    docs.set(c, [[i], 1, 1]);
                } else {
                    docs.set(c, [[i], -Infinity, Infinity]);
                }
            }
        }
        const tempArr = docs.values();
        let tempMin = Infinity;
        let tempMax = -Infinity;
        for (const [_, maxValue, minValue] of tempArr) {
            tempMin = Math.min(tempMin, minValue);
            tempMax = Math.max(tempMax, maxValue);
        }

        if (tempMin === Infinity) {
            console.log(-1);
        } else {
            console.log(tempMin, tempMax);
        }
    }
}

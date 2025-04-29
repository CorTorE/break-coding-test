const readline = require("readline")
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let N;
let arr = [];

rl.on("line", (line) => {
    if(!N){N = Number(line)}
    else{
        arr.push(Number(line))
        if(arr.length === N){
            solution(N,arr)
            rl.close()
        }
    }
})
// 6 10 13 9 8 1
// 경우의 수
// 1. 이번잔을 안마시는 경우 -> i-1의 최대
// 2. 이번잔을 마시고 이전잔은 안마신 경우 -> i-2의 최대 +  i
// 3. 이번잔, 이전잔 둘다 마신경우 -> i-1의 최대 + i
// 점화식 -> dp[i] = Math.max(dp[i-1], dp[i-2]+arr[i], dp[i-3]+arr[i-1]+arr[i])



function solution(N,arr){
    if(N === 1) {
        console.log(arr[0]);
        return;
    }
    if(N === 2){
        console.log(arr[0]+ arr[1]);
        return;
    }
    if(N === 3){
        console.log(Math.max(arr[0]+arr[2], arr[1]+arr[2], arr[0]+ arr[1]));
        return;
    }
    const dp = Array(N).fill(0);  
    dp[0] = arr[0]
    dp[1] = arr[0] + arr[1]
    dp[2] = Math.max(dp[1], arr[0]+arr[2], arr[1]+arr[2])    

    for(let i=3; i<N;i++){
        dp[i] = Math.max(dp[i-1], dp[i-2]+arr[i], dp[i-3]+arr[i-1]+arr[i])
    }
    console.log(dp[N-1])
}
const fs = require("fs");
const input = fs.readFileSync('dev/stdin').toString().split("\n");

const N = parseInt(input[0]);
const nNum = input[1].split(" ").map(Number);
const M = parseInt(input[2]);
const mNum = input[3].split(" ").map(Number);

function find(arr,left,right,key){
    while(left <= right){
        const middleIndex = Math.floor((left + right)/2);
        const middle = arr[middleIndex];
        if(key === middle) return 1;
        else if(key > middle){
            left = middleIndex + 1;
        }
        else{
            right = middleIndex - 1;
        }
    }
    return 0
}
function solution(n,nNum,m,mNum){
    nNum.sort((a,b) =>(a-b) )
    const output = [];
    for(let i=0;i<m;i++){
        const key = mNum[i];
        output.push(find(nNum,0,n-1,key))
    }
    return output.join("\n")
}

console.log(solution(N,nNum, M,mNum))

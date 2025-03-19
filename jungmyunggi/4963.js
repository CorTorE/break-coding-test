const { dir } = require("console");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let w, h;
let map = [];
let c = 0;
let answer = [];
rl.on("line", (line) => {
    if (w === undefined && h === undefined) {
        [w, h] = line.split(" ").map(Number);
        
        
        if (w === 0 && h === 0) {
            console.log(answer.join("\n"))
            rl.close();
            return;
        }

        c = 0; 
        map = []; 
        } else {
        map.push(line.split(" ").map(Number));
        c++;

        if (c === h) {
           answer.push(solution(w, h, map));
            w = undefined;
            h = undefined;
        }
    }
});

function solution(w, h, map) {
    let count = 0;
    let queue = [];
    let queueIndex = 0;
    let direction = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,1],[1,-1],[-1,-1]]
    for(let i=0;i<h;i++){
        for(let j=0;j<w;j++){
            if(map[i][j] === 1){
                queue.push([i,j]);
                while(queue.length !== queueIndex){
                    const [ci, cj] = queue[queueIndex++];
                    for(const [di,dj] of direction){
                        if(ci + di >= 0 && cj+dj >= 0 && ci + di < h && cj + dj < w && map[ci + di][cj + dj] === 1){
                            map[ci + di][cj + dj] = 2;
                            queue.push([ci + di,cj + dj]);
                        }
                    }
                }
                count++;
                
            }
        }
    }
    return (count)
}


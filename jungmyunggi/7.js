/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let flag = false;
    if (x < 0) {
        flag = true;
        x *= -1;
    }
    let temp = x.toString().split("");
    while (temp[temp.length - 1] === "0") {
        temp.pop();
    }
    temp = temp.reverse().join("");

    let answer = Number(temp);
    if (flag) answer *= -1;

    if (answer < -(2 ** 31) || answer > 2 ** 31 - 1) {
        return 0;
    }

    return answer;
};

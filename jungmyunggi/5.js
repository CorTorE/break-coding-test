/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    function helper(s, left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return [left, right];
    }
    let answer = [0, 0];
    for (let i = 0; i < s.length; i++) {
        const temp1 = helper(s, i, i);
        const temp2 = helper(s, i, i + 1);
        let result = [];
        if (temp1[1] - temp1[0] > temp2[1] - temp2[0]) {
            result = temp1;
        } else {
            result = temp2;
        }

        if (result[1] - result[0] > answer[1] - answer[0]) answer = result;
    }

    return s.slice(answer[0] + 1, answer[1]);
};

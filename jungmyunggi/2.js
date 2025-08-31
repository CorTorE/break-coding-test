/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let left = 0;
    let right = 0;
    const set = new Set();
    let result = 0;
    while (right < s.length) {
        const char = s[right];
        if (set.has(char)) {
            while (s[left] !== char) {
                set.delete(s[left]);
                left++;
            }
            set.delete(s[left]);
            left++;
        }
        set.add(char);
        result = Math.max(result, right - left + 1);
        right++;
    }

    return result;
};

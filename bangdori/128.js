/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const set = new Set(nums);
  const visited = new Set();
  let answer = 0;
  let count = 0;

  const dfs = (num) => {
    count++;
    visited.add(num);

    if (set.has(num + 1) && !visited.has(num + 1)) {
      dfs(num + 1);
    }

    if (set.has(num - 1) && !visited.has(num - 1)) {
      dfs(num - 1);
    }
  };

  for (const num of set) {
    if (visited.has(num)) continue;
    count = 0;
    dfs(num);
    answer = Math.max(answer, count);
  }

  return answer;
};

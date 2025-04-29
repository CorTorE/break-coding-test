const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */
    const [l, c] = input[0].split(" ").map(Number);
    const alphabets = input[1].split(" ");
    console.log(solution(l, alphabets));

    process.exit();
  });

function solution(l, alphabets) {
  const answer = [];

  const { gathers, consonants } = devideAlphabets(alphabets);
  const result = [];

  const data = [1, 2, 3, 4];
  combination(data, 0, 4, 2);

  for (let i = l - 2; i >= 1; i--) {
    const combGathers = combination(gathers, [], 0, gathers.length, i);
    const combConsonants = combination(
      consonants,
      [],
      0,
      consonants.length,
      l - i
    );

    for (const gather of combGathers) {
      for (const consonant of combConsonants) {
        const result = [...gather, ...consonant];
        result.sort();

        answer.push(result.join(""));
      }
    }
  }

  answer.sort();

  return answer.join("\n");
}

function combination(array, result, start, n, selectedNumber, selected = []) {
  if (selectedNumber === selected.length) {
    return result.push([...selected]); // 복사본 저장
  }

  for (let i = start; i < n; i++) {
    selected.push(array[i]);
    combination(array, result, i + 1, n, selectedNumber, selected);
    selected.pop();
  }

  return result;
}

function devideAlphabets(alphabets) {
  const gathers = []; // 모음
  const consonants = []; // 자음

  for (const alphabet of alphabets) {
    if (isGather(alphabet)) {
      gathers.push(alphabet);
    } else {
      consonants.push(alphabet);
    }
  }

  return { gathers, consonants };
}

function isGather(alphabet) {
  if (alphabet === "a") return true;
  if (alphabet === "e") return true;
  if (alphabet === "i") return true;
  if (alphabet === "o") return true;
  if (alphabet === "u") return true;

  return false;
}

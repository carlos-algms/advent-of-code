import assert from 'assert';

const numbersSpelled: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

interface Tree {
  [char: string]: number | Tree;
}

const tree: Tree = Object.keys(numbersSpelled).reduce<Tree>((acc, key) => {
  const chars = key.split('');
  let branch: Tree = acc;

  for (let i = 0, last = false; i < chars.length; i++, last = i === chars.length - 1) {
    const char = chars[i];

    if (last) {
      branch[char] = numbersSpelled[key];
      break;
    }

    if (!branch[char]) {
      branch[char] = {};
    }

    branch = branch[char] as Tree;
  }
  return acc;
}, {});

export function day01Part2(input: string[]) {
  const calibrationNumbers = input.map((line, lineX) => {
    const digits: number[] = [];

    for (let i = 0; i < line.length; i++) {
      let node: Tree = tree;

      for (let j = i; j < line.length; j++) {
        const char = line[j];

        if (char.match(/[0-9]/)) {
          digits.push(parseInt(char));
          i = j;
          break;
        }

        const nextNode = node[char];
        if (typeof nextNode === 'number') {
          digits.push(nextNode);
          i = j - 1;
          break;
        }

        if (!nextNode) {
          break;
        }

        node = nextNode;
      }
    }

    const first = digits[0];
    const last = digits[digits.length - 1] ?? first;
    const number = parseInt(`${first}${last}`);

    assert(number >= 10, `Number ${number} is not greater than 10`);

    return number;
  });

  return {
    calibrationNumbers,
    sum: calibrationNumbers.reduce((acc, curr) => acc + curr, 0),
  };
}

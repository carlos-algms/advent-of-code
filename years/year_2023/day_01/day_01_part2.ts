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

type Leaf = number | Record<string, number>;

interface Tree {
  [char: string]: Leaf | Tree;
}

// type Tree = Record<string, Leaf | Branch>;

const tree: Tree = Object.keys(numbersSpelled).reduce<Tree>((acc, key) => {
  const chars = key.split('');
  let branch: Leaf | Tree = acc;

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
    const chars = line.split('');

    let branch: Leaf | Tree = tree;
    const digits: string[] = [];

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      if (char.match(/[0-9]/)) {
        digits.push(char);
        branch = tree;
      } else if (Number.isInteger(branch[char])) {
        digits.push(String(branch[char]));
        if (tree[char]) {
          branch = tree[char] as Tree;
        } else {
          branch = tree;
        }
      } else if (branch[char]) {
        branch = branch[char] as Tree;
      } else if (tree[char]) {
        branch = tree[char] as Tree;
      } else {
        branch = tree;
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

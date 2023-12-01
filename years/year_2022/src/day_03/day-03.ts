import assert from 'assert';
import { fileReader } from '../shared/fileReader';

async function app() {
  // const input = [
  //   'vJrwpWtwJgWrhcsFMMfFFhFp',
  //   'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  //   'PmmdzqPrVvPwwTWBwg',
  //   'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  //   'ttgJtRGJQctTZtZT',
  //   'CrZsJsPPZsGzwwsLwLmpwMDw',
  // ];
  const input = await fileReader(__dirname + '/input.txt');

  let sum = 0;
  let sumGroups = 0;
  let groupOf3: string[] = [];

  input.forEach((line) => {
    sum += getIndividualPriorityValue(line);
    groupOf3.push(line);

    if (groupOf3.length === 3) {
      sumGroups += getGroupOf3PriorityValue(groupOf3);
      groupOf3 = [];
    }
  });

  console.log(`
# Solution part 1:
  What is the sum of the priorities of those repeated item types?
  ${sum}
`);

  console.log(`
# Solution part 2:
  What is the sum of the priorities of those repeated item types from the three-Elf groups?
  ${sumGroups}
`);
}

function getIndividualPriorityValue(line: string): number {
  const [a, b] = getLettersByCompartment(line);
  const repeatedLetter = a.find((l) => b.includes(l));
  return getLetterValue(repeatedLetter);
}

function getGroupOf3PriorityValue(group: string[]): number {
  const [a, b, c] = group;
  const repeatedLetter = a.split('').find((l) => b.includes(l) && c.includes(l));
  return getLetterValue(repeatedLetter);
}

function getLetterValue(l?: string): number {
  assert.ok(l);
  const value = priorities[l];
  assert.ok(value);
  return value;
}

/**
 * Split the string into 2 even arrays
 */
function getLettersByCompartment(all: string): [string[], string[]] {
  const letters = all.split('');
  const size = letters.length / 2;
  const groups: [string[], string[]] = [letters.slice(0, size), letters.slice(size)];
  assert.equal(groups[0].length, groups[1].length);

  return groups;
}

/**
 * a through z have priorities 1 through 26.
 * A through Z have priorities 27 through 52.
 */
const priorities = 'abcdefghijklmnopqrstuvwxyz'
  .split('')
  .reduce<Record<string, number>>((acc, letter, i) => {
    const x = i + 1;
    const z = 26 + x;
    acc[letter] = x;
    acc[letter.toUpperCase()] = z;
    return acc;
  }, {});

////////////////////////////////////////////////////////////////////////////////////////////////

app();

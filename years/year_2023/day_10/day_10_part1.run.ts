import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution from './day_10_part1';

const day = '10';

async function test1Input() {
  const input = [
    '.....', //
    '.S-7.',
    '.|.|.',
    '.L-J.',
    '.....',
  ];

  const response = solution(input);
  assert.equal(response, 4);

  console.log(`✅ Day ${day} - part 1 - test 1 passed!`);
}

async function test2Input() {
  const input = [
    '..F7.', //
    '.FJ|.',
    'SJ.L7',
    '|F--J',
    'LJ...',
  ];

  const response = solution(input);
  assert.equal(response, 8);

  console.log(`✅ Day ${day} - part 1 - test 2 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input);

  assert.equal(response, 0);
  console.log(`✅ Day ${day} - part 1 - real input passed!`);
}

(async () => {
  await test1Input();
  await test2Input();
  // await realInput();
})();

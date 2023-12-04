import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day04Part1 } from './day_04_part1';

async function part1TestInput() {
  const input = await fileReader(__dirname + '/day_04_input_1_test.txt');

  const response = day04Part1(input);

  const expectedSum = 13;
  const expectedMatches = [
    ['83', '86', '17', '48'], //
    ['61', '32'],
    ['21', '1'],
    ['84'],
  ];

  assert.strictEqual(response.sum, expectedSum);
  assert.deepEqual(response.matches, expectedMatches);

  console.log('✅ Day 04 Test input passed!');
}

async function part1Input() {
  const input = await fileReader(__dirname + '/day_04_input.txt');

  const response = day04Part1(input);
  const expectedSum = 25571;

  // pass1 was too hig
  const pass1 = 25708;
  assert(response.sum < pass1, `Expected ${response.sum} to be less than ${pass1}`);

  assert.equal(response.sum, expectedSum);

  console.log('✅ Day 04 Part 1 input passed!');
}

(async () => {
  await part1TestInput();
  await part1Input();
})();

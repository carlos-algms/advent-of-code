import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day04Part1 } from './day_04_part1';

async function part1TestInput() {
  const input = await fileReader(__dirname + '/day_04_input_1_test.txt');

  const response = day04Part1(input);

  assert.strictEqual(response, null);

  console.log('✅ Day 04 Test input passed!');
}

async function part1Input() {
  const input = await fileReader(__dirname + '/day_04_input.txt');

  const response = day04Part1(input);

  assert.equal(response, null);

  console.log('✅ Day 04 Part 1 input passed!');
}

(async () => {
  await part1TestInput();
  await part1Input();
})();

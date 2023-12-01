import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day01Part1 } from './day_01_part1';

async function part1TestInput() {
  const testInput = await fileReader(__dirname + '/day_01_input_1_test.txt');
  const testExpectedSum = 142;

  const { calibrationNumbers, sum } = day01Part1(testInput);
  assert.deepEqual(calibrationNumbers, [12, 38, 15, 77]);
  assert.equal(sum, testExpectedSum);
  console.log('✅ Test input passed!');
}

async function part1Input() {
  const input = await fileReader(__dirname + '/day_01_input.txt');
  const expectedSum = 54390;

  const { sum } = day01Part1(input);
  console.log(`ℹ️ Part 1 answer: ${sum}`);

  assert.equal(sum, expectedSum);
  console.log('✅ Part 1 input passed!');
}

(async () => {
  await part1TestInput();
  await part1Input();
})();

import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day03Part1 } from './day_03_part1';

async function part1TestInput() {
  const input = await fileReader(__dirname + '/day_03_input_1_test.txt');

  const { sum, numbers } = day03Part1(input);

  const expectedSum = 4361;
  const expectedNumbers = [467, 35, 633, 617, 592, 664, 755, 598];

  assert.strictEqual(sum, expectedSum);
  assert.deepStrictEqual(numbers, expectedNumbers);

  console.log('✅ Day 03 Test input passed!');
}

async function part1Input() {
  const input = await fileReader(__dirname + '/day_03_input.txt');

  const { sum } = day03Part1(input);

  const expectedSum = 532428;

  assert.equal(sum, expectedSum);

  console.log('✅ Day 03 Part 1 input passed!');
}

(async () => {
  await part1TestInput();
  await part1Input();
})();

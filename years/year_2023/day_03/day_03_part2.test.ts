import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day03Part2 } from './day_03_part2';

async function part1TestInput() {
  const input = await fileReader(__dirname + '/day_03_input_1_test.txt');

  const { sum, numbers } = day03Part2(input);

  const expectedSum = 467835;
  const expectedNumbers = [467, 35, 755, 598];

  assert.strictEqual(sum, expectedSum);
  assert.deepStrictEqual(numbers, expectedNumbers);

  console.log('✅ Day 03 part 2 Test input passed!');
}

async function part1Input() {
  const input = await fileReader(__dirname + '/day_03_input.txt');

  const { sum } = day03Part2(input);

  const expectedSum = 532428;

  assert.equal(sum, expectedSum);

  console.log('✅ Day 03 Part 2 input passed!');
}

(async () => {
  await part1TestInput();
  await part1Input();
})();

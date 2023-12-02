import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { BagContent, day02Part1 } from './day_02_part1';

const load: BagContent = {
  red: 12,
  green: 13,
  blue: 14,
};

async function part1TestInput() {
  const input = await fileReader(__dirname + '/day_02_input_1_test.txt');

  const { sum, ids } = day02Part1(input, load);

  const expectedSum = 8;
  const expectedIds = ['1', '2', '5'];

  assert.strictEqual(sum, expectedSum);
  assert.deepStrictEqual(ids, expectedIds);

  console.log('✅ Test input passed!');
}

async function part1Input() {
  const input = await fileReader(__dirname + '/day_02_input.txt');

  const { sum } = day02Part1(input, load);

  const expectedSum = 8;

  assert.equal(sum, expectedSum);

  console.log('✅ Part 1 input passed!');
}

(async () => {
  await part1TestInput();
  await part1Input();
})();
